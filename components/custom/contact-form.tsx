"use client";

import { formSchema } from "@/lib/schemas";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as React from "react";
import { toast } from "sonner";
import { send } from "@/lib/email";
import { z } from "zod";

import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const [loading, setLoading] = React.useState(false);

  const t = useTranslations('ContactSection');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await send(values);
      toast.success(t('successMessage'));
      form.reset();
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(t('errorMessage'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-8 md:py-16 lg:py-24 md:px-4 bg-background text-foreground animate-fade-in-up max-w-6xl mx-auto mb-12 md:mb-24" id="contact">
      <div className="container mx-auto">
        <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase mb-2">{t('label')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
    
          <div className="mb-10 md:mb-0 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
              <p className="mb-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('description') }} />
              <ul className="mb-4 text-sm text-muted-foreground">
                <li><strong>{t('addressEmail')}:</strong> konbinicode@gmail.com</li>
                <li><strong>{t('addressPhone')}:</strong> (45) 9 8808-5765</li>
                <li><strong>{t('addressTitle')}:</strong> Foz do Iguaçu, Paraná, Brazil</li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow border transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
              <iframe
                title="Mapa da empresa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.057260702843!2d-54.58537668448224!3d-25.51633598373521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f691d7e4f9d8e3%3A0x8e2e3a2d4b2c9d8a!2sFoz%20do%20Igua%C3%A7u%2C%20PR!5e0!3m2!1spt-BR!2sbr!4v1690000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
  
          <div>
            <Card className="mx-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <CardHeader className="text-center">
                <CardTitle className="text-xl md:text-2xl font-bold mb-2">
                  {t('formTitle')}
                </CardTitle>
                <CardDescription>
                  {t('formDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">{t('fields.firstName.label')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('fields.firstName.placeholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">
                                {t('fields.lastName.label')}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t('fields.lastName.placeholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">{t('fields.email.label')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('fields.email.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">{t('fields.message.label')}</FormLabel>
                            <FormControl>
                              <Textarea
                                id="message"
                                placeholder={t('fields.message.placeholder')}
                                className="min-h-[120px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-center pt-2">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:bg-primary/90"
                      >
                        {loading ? t('loading') : t('button')}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
