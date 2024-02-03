import { useMemo } from 'react';
import { Rule, useRules } from '../..';
import { isAllowed } from '../../utils';

export const useIsAllowed = <T extends Rule[]>(when: T) => {
  const flags = useRules();
  const result = useMemo(() => isAllowed(when, flags), [when, flags]);
  return result;
};
