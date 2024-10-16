import { useTranslation } from "@/app/i18n";
import { paths } from "@/constants/paths";
import Link from "next/link";

const Footer = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng);

  const footerItems = [
    {
      title: t("navigation.portal"),
      items: [
        { name: t("navigation.map"), href: paths.Map },
        { name: t("navigation.addEvent"), href: paths.EventAdd },
      ],
    },
    {
      title: t("navigation.others"),
      items: [
        { name: t("navigation.contact"), href: paths.Contact },
        { name: t("navigation.cooperation"), href: paths.Cooperation },
      ],
    },
  ];

  return (
    <div className="min-w-full flex justify-center bg-gray-900 gap-16 py-4">
      {footerItems.map((item) => (
        <div key={item.title} className="flex flex-col">
          <h3 className="text-lg text-ivory-100">{item.title}</h3>
          <ul>
            {item.items.map((subItem) => (
              <Link
                href={subItem.href}
                key={subItem.name}
                className="text-grass-100 text-sm block"
              >
                {subItem.name}
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Footer;
