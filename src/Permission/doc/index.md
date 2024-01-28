# Permission

> [!IMPORTANT]
> Documentação ainda em progresso

Essa biblioteca se propõe a adicionar a possibilidade de usar feature flag para habilitar ou desabilitar Rotas (com react-route-dom) e Componentes usando Regras compostas pelas feature flags.

## Quick start

Criando suas primeiras regras

```tsx Rules
import { createRule } from 'permission';

export const initialFlags = {
  flagA: true,
  flagB: false,
};

const myFirstRule = createRule(initialFlags).have('flagA');
const mySecondRule = createRule(initialFlags).not.have('flagB').have('flagA');
```

### Migrando Routes

import Route utils

```tsx Routes
import { AllowedRoutes, AllowRoute } from 'permission';
```

#### De

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'pages';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>home</div>} />
      </Routes>
    </BrowserRouter>
  );
};
```

#### Para

```tsx
import { BrowserRouter, Route } from 'react-router-dom';
import { AllowedRoutes, AllowRoute } from 'permission';
import { Home } from 'pages';
import { initialFlags, myFirstRule } from 'rules';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AllowedRoutes rules={initialFlags}>
        <AllowRoute when={[myFirstRule]}>
          <Route path="/" element={<div>home</div>} />
        </AllowRoute>
      </AllowedRoutes>
    </BrowserRouter>
  );
};
```

`rules` recebe as flags que estão sendo usadas

<details>
<summary>
Visualizar passo a passo
</summary>

#### Diff

```diff
- import { BrowserRouter, Routes, Route } from 'react-router-dom';
+ import { BrowserRouter, Route } from 'react-router-dom';
+ import { AllowedRoutes, AllowRoute } from 'permission'
import { Home } from 'pages';
+ import { initialFlags, myFirstRule } from 'rules';

 const AppRoutes = () => {
   return (
     <BrowserRouter>
-      <Routes>
+      <AllowedRoutes rules={initialFlags}>
+         <AllowRoute when={[myFirstRule]}>
             <Route path="/" element={<div>home</div>} />
+         </AllowRoute>
-      </Routes>
+      </AllowedRoutes>
     </BrowserRouter>
   );
};
```

</details>

### Adicionando condição em componentes

```tsx Home
import { Allow } from 'permission';
import { mySecondRule } from 'rules';

const Home = () => {
  return (
    <div>
      <Allow when={[mySecondRule]}>
        <h1>Hello, World!</h1>
      </Allow>
    </div>
  );
};
```

<details>
<summary>
Visualizar passo a passo
</summary>

```diff Home
+ import { Allow } from 'permission';
+ import { mySecondRule } from 'rules';

const Home = () => {
  return (
    <div>
+     <Allow when={[mySecondRule]}>
        <h1>Hello, World!</h1>
+     </Allow>
    </div>
  );
};
```

</details>
