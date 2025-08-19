import {
  Globe,
  User,
  Palette,
  Instagram,
  Calendar,
  Building,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useTranslations } from "next-intl";

const Services = () => {
  const t = useTranslations("ServicesSection");
  const services = t.raw("items") as Array<{
    title: string;
    description: string;
  }>;
  const icons = [Globe, User, Palette, Instagram, Calendar, Building];

  return (
    <section
      className="py-8 md:py-16 lg:py-24 max-w-6xl mx-auto animate-fade-in-up mb-12 md:mb-24"
      id="services"
    >
      <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase mb-2">
        {t("label")}
      </p>
      <div className="space-y-12">
        <div className="text-start space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold">{t("title")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <Card
                key={index}
                className="h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-muted/80"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                    <Icon className="w-6 h-6 transition-transform duration-300 text-purple-500 group-hover:rotate-6" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-justify">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
