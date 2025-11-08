import tr from "./tr";
import en from "./en";

export const dictionaries = {
  tr,
  en,
} as const;

export type Messages = typeof tr;

