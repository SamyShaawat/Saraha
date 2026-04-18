type InspectValue = string | number | boolean | undefined;

export function inspectProps(
  componentName: string,
  extra: Record<string, InspectValue> = {},
): Record<string, string> {
  const base: Record<string, string> = {
    'data-component': componentName,
  };

  Object.entries(extra).forEach(([key, value]) => {
    if (value !== undefined) {
      base[`data-${key}`] = String(value);
    }
  });

  return base;
}
