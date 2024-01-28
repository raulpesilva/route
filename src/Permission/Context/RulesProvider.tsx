import { ReactNode } from 'react';
import { RulesContext } from './RulesContext';

export const RulesProvider = ({ children, rules }: { children: ReactNode; rules: Record<string, boolean> }) => {
  return <RulesContext.Provider value={rules}>{children}</RulesContext.Provider>;
};
