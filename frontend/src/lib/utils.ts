import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { StoreApi, UseBoundStore } from "zustand";

export type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export function camelToTitleCase(input: string): string {
  return (
    input.charAt(0).toUpperCase() +
    input.slice(1).replace(/[A-Z]/g, (char) => " " + char)
  );
}

export const toDataURLAsync = (file: File): Promise<string> => {
  if (!file.type.startsWith("image/")) throw new Error("Not an image");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const isObjOfType = <T>(obj: unknown, key: keyof T): obj is T =>
  !!(obj as T)[key];

export const isShallowEqual = <T>(arg1: T, arg2: T): boolean => {
  if (arg1 === arg2) return true;
  return JSON.stringify(arg1) === JSON.stringify(arg2);
};

export const mapDate = (date: Date | string) => {
  const timeDiff = Date.now() - Date.parse(date.toString());
  if (timeDiff < 60_000) {
    return "Just now";
  } else if (timeDiff < 3_600_000) {
    return Math.ceil(timeDiff / 60_000) + "mins ago";
  } else if (timeDiff < 86_400_000) {
    return Math.ceil(timeDiff / 3_600_000) + "hours ago";
  } else if (timeDiff < 604_800_000) {
    return Math.ceil(timeDiff / 86_400_000) + "days ago";
  } else {
    return date.toString().slice(0, 10);
  }
};
