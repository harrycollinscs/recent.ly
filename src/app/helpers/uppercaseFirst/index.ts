const uppercaseFirst = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export default uppercaseFirst;
