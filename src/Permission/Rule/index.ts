export class RuleMaker<T extends Record<string, boolean>> {
  parts: { value: keyof T; isNot: boolean }[] = [];
  nextNot = false;
  defaultRules: Partial<T> = {};

  constructor(defaultRules?: Partial<T>) {
    if (defaultRules) this.defaultRules = defaultRules;
    this.execute = this.execute.bind(this);
  }

  have(value: keyof T) {
    this.parts.push({ value, isNot: this.nextNot });
    this.nextNot = false;
    return this;
  }

  get not() {
    this.nextNot = true;
    return this;
  }

  execute(rules: T) {
    const rulesToUse = { ...this.defaultRules, ...rules };
    const result = this.parts.every((part) => {
      const value = rulesToUse[part.value];
      return part.isNot ? !value : value;
    });

    return result;
  }
}

export type Rule = Pick<RuleMaker<Record<string, boolean>>, 'execute'>;

export const createRule = <T extends Record<string, boolean>>(defaultValue?: T) => {
  return new RuleMaker<T>(defaultValue);
};
