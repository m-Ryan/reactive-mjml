const unitRegex = /[\d.,]*(\D*)$/;

export function widthParser(width: string, options: { parseFloatToInt?: boolean } = {}) {
  const { parseFloatToInt = true } = options;

  const unitParsers = {
    default: parseInt,
    px: parseInt,
    '%': parseFloatToInt ? parseInt : parseFloat,
  };
  const widthUnit = unitRegex.exec(width.toString())![1] as keyof typeof unitParsers;

  const parser = unitParsers[widthUnit] || unitParsers.default;

  return {
    parsedWidth: parser(width),
    unit: widthUnit || 'px',
  };
}
