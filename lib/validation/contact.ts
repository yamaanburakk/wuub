import { z } from "zod";
import type { Locale } from "@/lib/i18n/config";

const messages = {
  tr: {
    nameRequired: "Lütfen adınızı girin.",
    emailRequired: "Lütfen geçerli bir e-posta girin.",
    messageRequired: "Mesajınızı yazın.",
  },
  en: {
    nameRequired: "Please enter your name.",
    emailRequired: "Please provide a valid email.",
    messageRequired: "Please share your message.",
  },
} as const;

export const getContactSchema = (locale: Locale) => {
  const copy = messages[locale] ?? messages.tr;
  return z.object({
    name: z.string().min(2, copy.nameRequired),
    email: z.string().email(copy.emailRequired),
    company: z.string().optional(),
    message: z.string().min(10, copy.messageRequired),
  });
};

export type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>;

