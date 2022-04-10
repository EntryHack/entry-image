export const useStore = <T>(initial: T) => {
  let value = initial;

  return [value, (newValue: T) => (value = newValue)];
};
