export const truncate = (str: string) => {
  if (str.length < 20) {
    return str;
  } else {
    return str.substring(0, 20);
  }
};
