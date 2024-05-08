import Papa from "papaparse";

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

export const parseCsvFromBlob = (fileBlob :any) => {
    Papa.parse(fileBlob, {
      header: true, 
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray: any = [];
        const valuesArray: any = [];

        results.data.map((d: any) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        console.log({rowsArray},{valuesArray})
      },
    });
}