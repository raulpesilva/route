import { useMemo } from 'react';
import { Rule, useRules } from '..';
import { isAllowed } from '../utils';

export const Allow = ({ children, when }: { children: React.ReactNode; when: Rule[] }) => {
  const rules = useRules();
  const isValid = useMemo(() => isAllowed(when, rules), [when, rules]);
  if (!isValid) return null;
  return children;
};
