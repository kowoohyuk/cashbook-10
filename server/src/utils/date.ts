export const checkValidDate = (d: Date): boolean => {
  return d instanceof Date && !isNaN(d.getTime());
};
