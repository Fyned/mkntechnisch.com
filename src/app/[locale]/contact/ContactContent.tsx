"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ContactContent() {
  const t = useTranslations("contact");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "nl";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    workType: "",
    message: "",
  });

  const workTypes = [
    { value: "demolition", label: t("workTypes.demolition") },
    { value: "stripping", label: t("workTypes.stripping") },
    { value: "deconstruction", label: t("workTypes.deconstruction") },
    { value: "groundwork", label: t("workTypes.groundwork") },
    { value: "other", label: t("workTypes.other") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const workTypeLabel =
      workTypes.find((w) => w.value === formData.workType)?.label || formData.workType;

    const text = [
      `${t("name")}: ${formData.name}`,
      `${t("phone")}: ${formData.phone}`,
      `${t("email")}: ${formData.email}`,
      `${t("workType")}: ${workTypeLabel}`,
      ``,
      `${t("message")}:`,
      formData.message,
    ].join("\n");

    const whatsappUrl = `https://wa.me/32472126216?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses =
    "w-full bg-input border border-input rounded-lg px-4 py-3 text-foreground placeholder-subtle focus:outline-none focus:border-mkn-red/50 focus:ring-1 focus:ring-mkn-red/30 transition-colors text-sm";

  return (
    <div className="pt-24 sm:pt-32 min-h-screen">
      {/* Header */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="text-mkn-red text-sm uppercase tracking-[0.3em] mb-2 font-medium">
              {t("subtitle")}
            </p>
            <h1 className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl lg:text-6xl tracking-wider text-foreground">
              {t("title")}
            </h1>
            <div className="w-16 h-0.5 bg-mkn-red mx-auto mt-4 transform -skew-x-12" />
          </AnimatedSection>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* WhatsApp Form */}
            <AnimatedSection className="lg:col-span-3" direction="left">
              <div className="bg-themed-card border border-themed rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center border border-green-600/20">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-wider text-foreground">
                      {t("send")}
                    </h2>
                    <p className="text-xs text-subtle">{t("sendSubtitle")}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">
                        {t("name")} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder={t("name")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">
                        {t("phone")} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder={t("phone")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder={t("email")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">
                      {t("workType")} *
                    </label>
                    <select
                      name="workType"
                      value={formData.workType}
                      onChange={handleChange}
                      required
                      className={`${inputClasses} ${
                        !formData.workType ? "text-subtle" : ""
                      }`}
                    >
                      <option value="" disabled>
                        {t("workType")}...
                      </option>
                      {workTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">
                      {t("message")} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`${inputClasses} resize-none`}
                      placeholder={t("message")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-sm"
                  >
                    <Send className="w-4 h-4" />
                    {t("send")}
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact info */}
            <AnimatedSection className="lg:col-span-2 space-y-6" direction="right">
              {/* Phone */}
              <div className="bg-themed-card border border-themed rounded-xl p-5 hover:border-mkn-red/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mkn-red/10 rounded-lg flex items-center justify-center shrink-0 border border-mkn-red/20">
                    <Phone className="w-5 h-5 text-mkn-red" />
                  </div>
                  <div>
                    <p className="text-xs text-subtle mb-1.5 uppercase tracking-wider">
                      {t("info.phone")}
                    </p>
                    <a
                      href="tel:+32472126216"
                      className="text-foreground hover:text-mkn-red transition-colors block"
                    >
                      0472 12 62 16
                    </a>
                    <a
                      href="tel:+32484471995"
                      className="text-foreground hover:text-mkn-red transition-colors block"
                    >
                      0484 471 995
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-themed-card border border-themed rounded-xl p-5 hover:border-mkn-red/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mkn-red/10 rounded-lg flex items-center justify-center shrink-0 border border-mkn-red/20">
                    <Mail className="w-5 h-5 text-mkn-red" />
                  </div>
                  <div>
                    <p className="text-xs text-subtle mb-1.5 uppercase tracking-wider">
                      {t("info.email")}
                    </p>
                    <a
                      href="mailto:mkntechnischbv@gmail.com"
                      className="text-foreground hover:text-mkn-red transition-colors break-all text-sm"
                    >
                      mkntechnischbv@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-themed-card border border-themed rounded-xl p-5 hover:border-mkn-red/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mkn-red/10 rounded-lg flex items-center justify-center shrink-0 border border-mkn-red/20">
                    <MapPin className="w-5 h-5 text-mkn-red" />
                  </div>
                  <div>
                    <p className="text-xs text-subtle mb-1.5 uppercase tracking-wider">
                      {t("info.address")}
                    </p>
                    <p className="text-foreground">
                      Assesteenweg 65
                      <br />
                      1740 Ternat
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct */}
              <a
                href="https://wa.me/32472126216"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-themed-card border border-green-600/20 rounded-xl p-5 hover:border-green-600/40 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center shrink-0 border border-green-600/20">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-subtle mb-0.5 uppercase tracking-wider">
                    WhatsApp
                  </p>
                  <p className="text-foreground group-hover:text-green-600 transition-colors text-sm">
                    {t("info.sendMessage")}
                  </p>
                </div>
              </a>

              {/* Google Maps */}
              <div className="rounded-xl overflow-hidden border border-themed aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.123!2d4.163!3d50.876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c0000000000%3A0x0!2sAssesteenweg+65%2C+1740+Ternat!5e0!3m2!1snl!2sbe!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MKN Technisch locatie"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
