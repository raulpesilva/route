import { Rule, useIsAllowed } from '..';

export const Allow = ({ children, when }: { children: React.ReactNode; when: Rule[] }) => {
  const isAllowed = useIsAllowed(when);
  if (!isAllowed) return null;
  return <>{children}</>;
};
