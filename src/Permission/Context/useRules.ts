import { useContext } from 'react';
import { RulesContext } from './RulesContext';

export const useRules = () => useContext(RulesContext);
