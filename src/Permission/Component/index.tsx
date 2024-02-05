import { Rule } from '..';
import { useIsAllowed } from '../hooks';

export const Allow = ({ children, when }: { children: React.ReactNode; when: Rule[] }) => {
  const isAllowed = useIsAllowed(when);
  if (!isAllowed) return null;
  return <>{children}</>;
};
