import { useMemo } from 'react';
import { Rule, useRules } from '..';

export const Allow = ({ children, when }: { children: React.ReactNode; when: Rule[] }) => {
  const rules = useRules();
  const isValid = useMemo(() => when.some((r) => r.execute(rules)), [when, rules]);
  if (!isValid) return null;
  return children;
};
