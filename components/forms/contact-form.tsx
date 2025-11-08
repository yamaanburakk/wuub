"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/i18n/config";
import {
  getContactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact";

type ContactFormCopy = {
  name: string;
  email: string;
  company: string;
  message: string;
  submit: string;
  success: string;
};

type ContactFormProps = {
  locale: Locale;
  copy: ContactFormCopy;
};

export const ContactForm = ({ locale, copy }: ContactFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const schema = getContactSchema(locale);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitted(true);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 rounded-3xl border border-wuub-black/10 bg-white p-6 shadow-sm dark:border-wuub-white/15 dark:bg-wuub-black/40"
      aria-describedby={isSubmitted ? "contact-success" : undefined}
    >
      <div className="grid gap-1.5">
        <label
          htmlFor="name"
          className="text-sm font-medium text-wuub-black dark:text-wuub-white"
        >
          {copy.name}
        </label>
        <Input
          id="name"
          {...register("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "error-name" : undefined}
        placeholder={locale === "tr" ? "Jane Doe" : "Jane Doe"}
        />
        {errors.name && (
          <p id="error-name" className="text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="grid gap-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium text-wuub-black dark:text-wuub-white"
        >
          {copy.email}
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "error-email" : undefined}
          placeholder={locale === "tr" ? "adiniz@ornek.com" : "you@company.com"}
        />
        {errors.email && (
          <p id="error-email" className="text-xs text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid gap-1.5">
        <label
          htmlFor="company"
          className="text-sm font-medium text-wuub-black dark:text-wuub-white"
        >
          {copy.company}
        </label>
        <Input
          id="company"
          {...register("company")}
          placeholder={locale === "tr" ? "Wuub Labs" : "Wuub Labs"}
        />
      </div>

      <div className="grid gap-1.5">
        <label
          htmlFor="message"
          className="text-sm font-medium text-wuub-black dark:text-wuub-white"
        >
          {copy.message}
        </label>
        <Textarea
          id="message"
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "error-message" : undefined}
          placeholder={
            locale === "tr" ? "Merhaba Wuub ekibi..." : "Hello Wuub team..."
          }
        />
        {errors.message && (
          <p id="error-message" className="text-xs text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        aria-live="polite"
      >
        {isSubmitting
          ? locale === "tr"
            ? "Gönderiliyor..."
            : "Sending..."
          : copy.submit}
      </Button>

      {isSubmitted && (
        <p
          id="contact-success"
          role="status"
          className="rounded-2xl bg-wuub-orange/10 px-4 py-3 text-sm text-wuub-orange"
        >
          {copy.success}
        </p>
      )}
    </form>
  );
};

