import { createReStateMethods } from '@raulpesilva/re-state';
import { BrowserRouter, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Allow, AllowRoute, AllowedRoutes, createRule } from './Permission';

const _rules = {
  xp: {
    entry: true,
    exit: true,
    variableIncome: true,
    fixedIncome: true,
    fMP: true,
  },
  clear: {
    entry: true,
    exit: true,
    variableIncome: true,
    fixedIncome: true,
    fMP: true,
  },
};

const RULES = {
  entry: true,
  exit: true,
  variableIncome: true,
  fixedIncome: true,
  fMP: true,
};

const { useRulesSelect, dispatchRules } = createReStateMethods<'rules', Record<string, boolean>>('rules', { ...RULES });

const showEntryRule = createRule(RULES).have('entry');
const showVariableIncome = createRule(RULES).have('entry').have('variableIncome');
const _showFixedIncome = createRule(RULES).have('entry').have('fixedIncome');
const _showExit = createRule(RULES).have('exit');
const notEntry = createRule(RULES).not.have('entry').not.have('fixedIncome');

const ignore = ['page2', 'public'];
const invertRules = () => {
  dispatchRules((prev) => {
    const entries = Object.entries(prev);
    const inverted = entries.map(([key, value]) => [key, ignore.includes(key) ? value : !value]);
    return Object.fromEntries(inverted);
  });
};

const routes = ['/', '/2', '/3', '/4', '/5', '/6', '/6/bla', '/7'];
const Page = ({ page }: { page: string | number }) => {
  const navigate = useNavigate();
  // console.log(page, Or('authorized', 'page0')(RULES));
  // console.log(page, And('authorized', 'page1')(RULES));
  return (
    <div>
      <h1>{page}</h1>
      {routes.map((route) => (
        <button key={route} onClick={() => navigate(route)}>
          {route}
        </button>
      ))}
      <button onClick={invertRules}>change</button>
      <Allow when={[showEntryRule, showEntryRule]}>
        <h1>AuthorizedComponent</h1>
      </Allow>
    </div>
  );
};

function App() {
  const rules = useRulesSelect();

  return (
    <BrowserRouter>
      <AllowedRoutes rules={rules}>
        <AllowRoute when={[showEntryRule]}>
          <AllowRoute when={[showEntryRule]}>
            <AllowRoute when={[showEntryRule]}>
              <AllowRoute when={[showVariableIncome]}>
                <Route path="/" element={<Page page="Home Private" />} />
              </AllowRoute>
            </AllowRoute>
          </AllowRoute>
        </AllowRoute>
        <>
          <AllowRoute when={[notEntry]}>
            <Route index element={<Page page="Home Public" />} />
            <Route path="/6">
              <Route index element={<Page page="Home 6 Public" />} />
              <Route path="bla" element={<Page page="Home 6 bla" />} />
            </Route>
            {/* <Route path="/6" element={<Page page="Home 6 Public" />} /> */}
          </AllowRoute>
        </>
        {true && (
          <AllowRoute when={[showEntryRule]}>
            <Route path="/2" element={<Page page="Page 2 private" />} />
            <Route path="/7" element={<Page page="Page 7 private" />} />
          </AllowRoute>
        )}
        <AllowRoute when={[showEntryRule]}>
          <Route path="/2" element={<Page page="Page 2 public" />} />
        </AllowRoute>
        <Route path="/3" element={<Page page="Page 3" />} />
        <AllowRoute>
          <Route path="/4" element={<Page page="Page 4" />} />
        </AllowRoute>
        <AllowRoute when={[showEntryRule]}>
          <Route path="/5" element={<Page page="Page 5" />} />
        </AllowRoute>
        <Route path="*" element={<Page page="404" />} />
      </AllowedRoutes>
    </BrowserRouter>
  );
}

const _CompRoutes = () => {
  return (
    <BrowserRouter>
      <AllowedRoutes rules={RULES}>
        <Route path="/" element={<Page page="Basic Route" />} />
        <AllowRoute when={[showEntryRule]}>
          <Route path="/2" element={<Page page="Basic Route 2" />} />
        </AllowRoute>
        <AllowRoute when={[showEntryRule]}>
          <Route path="/nested">
            <Route path="/" element={<Page page="Basic Route nested" />} />
            <Route path="/2" element={<Page page="Basic Route nested 2" />} />
          </Route>
        </AllowRoute>
      </AllowedRoutes>
    </BrowserRouter>
  );
};

export default App;
