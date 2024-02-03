import { Rule } from '../Rule';

export const isAllowed = <R extends Rule[], F extends Record<string, boolean>>(when: R, flags: F) => {
  return when.some((rule) => rule.execute(flags));
};
