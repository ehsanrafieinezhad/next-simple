import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="container p-8">

        <h1 className="py-4 text-2xl font-semibold">{t("title")}</h1>
        <Link href="/about">{t("about")}</Link>
    </div>
  );
}
