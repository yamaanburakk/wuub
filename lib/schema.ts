import type { Locale } from "./i18n/config";
import { defaultLocale } from "./i18n/config";
import { dictionaries } from "./i18n/messages";

type ProductSchemaOptions = {
  locale: Locale;
};

export const getProductSchema = ({ locale }: ProductSchemaOptions) => {
  const catalog = dictionaries[locale] ?? dictionaries[defaultLocale];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wuub Ergonomic Wrist Rest",
    description: catalog.schema.productDescription,
    brand: {
      "@type": "Brand",
      name: "Wuub",
    },
  };
};

