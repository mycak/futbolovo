import { useTranslation } from "@/app/i18n";

const Loader = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng);
  return (
    <div className="mx-auto text-center pt-24">
      <i className="fa-regular fa-futbol fa-5x text-ivory-150 mx-auto animate-fallAndBounce" />
      <p className="mt-4 text-2xl text-grass-50">{t("wait")}...</p>
    </div>
  );
};

export default Loader;
