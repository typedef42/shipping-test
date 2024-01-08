const twMerge = (...classes: Array<string | boolean | undefined>): string => {
  return classes.filter(Boolean).join(" ");
};

export default twMerge;
