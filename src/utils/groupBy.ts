export function groupBy<T, K extends string>(data: T[], createKey: (item: T) => K) {
  return data.reduce(
    (result: Record<K, T[]>, current) => {
      const key = createKey(current);
      const value = result[key];
      if (value == null) {
        result[key] = [current];
      } else {
        value.push(current);
      }
      return result;
    },
    {} as Record<K, T[]>,
  );
}
