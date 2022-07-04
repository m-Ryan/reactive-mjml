export const suffixCssClasses = (classes: string, suffix: string) =>
  classes
    ? classes
        .split(' ')
        .map(c => `${c}-${suffix}`)
        .join(' ')
    : '';
