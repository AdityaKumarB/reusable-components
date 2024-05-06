export const preventSpaces = (e: any) => {
  if (e.target?.value?.length === 0 && e.key === " ") return e.preventDefault();
};

export const isUrl = (str: string) => {
  const regex = /^(https?:\/\/)?([\w\\-]+\.)+[\w\\-]+(\/[\w\- .\\/?%&=]*)?$/;
  return regex.test(str) && !isNumberString(str);
};

export const isNumberString = (str: string) => /^-?\d+(\.\d+)?$/.test(str);

export const capitalizeFirstLetter = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);
