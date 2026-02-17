import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ProjectsContent from "./ProjectsContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsContent />;
}
