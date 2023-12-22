export { calculateETA, enumToMap, mapDate, removeParams };

const mapDate = (date: Date | string) => {
  const timeDiff = Date.now() - Date.parse(date.toString());
  if (timeDiff < 60_000) {
    return "Just now";
  } else if (timeDiff < 3_600_000) {
    return Math.ceil(timeDiff / 60_000) + " mins ago";
  } else if (timeDiff < 86_400_000) {
    return Math.ceil(timeDiff / 3_600_000) + " hours ago";
  } else if (timeDiff < 604_800_000) {
    return Math.ceil(timeDiff / 86_400_000) + " days ago";
  } else {
    return date.toString().slice(0, 10);
  }
};

/**
 *
 * @param from start date
 * @param days number of days to add to start date
 * @returns date string in format: dd/mm/yyyy
 */
const calculateETA = (from: string, days: number): string => {
  return new Date(
    new Date(from).valueOf() + days * 86400000 //1 day in ms
  )
    .toLocaleString()
    .split(",")[0];
};

type EnumArray<T> = {
  keys: string[];
  values: T[];
};

type EnumMap<T> = Map<T, string>;

/**
 *
 * @param enumerate
 * @returns Map with key: Enum type and value = string key
 */
const enumToMap = <T>(enumerate: Record<string, T>): EnumMap<T> => {
  const enumKeyValue = Object.values(enumerate).reduce(
    (acc, curr): EnumArray<T> =>
      typeof curr === "string"
        ? { ...acc, keys: [...acc.keys, curr as string] }
        : { ...acc, values: [...acc.values, curr] },
    <EnumArray<T>>{ keys: [], values: [] }
  );
  const enumMap = new Map<T, string>();
  enumKeyValue.values.forEach((value, index) => {
    enumMap.set(value, enumKeyValue.keys[index]);
  });
  return Object.freeze(enumMap);
};

const removeParams = (url: string) => {
  const paramRegex = /\/:\w+/g;
  return url.replace(paramRegex, "");
};
