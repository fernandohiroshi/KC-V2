import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("AboutSection");
  return (
    <section
      className="py-8 md:py-16 lg:py-24 max-w-6xl mx-auto animate-fade-in-up mb-12 md:mb-24"
      id="about"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Image */}
        <div className="relative group">
          <div className="rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:shadow-3xl">
            {/* <Image
              src="https://images.pexels.com/photos/4623179/pexels-photo-4623179.jpeg"
              alt="Professional developer"
              width={600}
              height={600}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-105"
            /> */}

            <video
              src="https://videos.pexels.com/video-files/8111182/8111182-hd_1920_1080_30fps.mp4"
              autoPlay
              loop
              muted
              playsInline
              width={600}
              height={500}
              className="w-full h-[250px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-105"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-8 animate-fade-in-up delay-200 text-start">
          <div className="space-y-6">
            <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
              {t("label")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              {t("title")}
            </h2>
            <p className="text-base text-muted-foreground mt-4">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
