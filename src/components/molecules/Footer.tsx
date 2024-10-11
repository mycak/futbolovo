import { paths } from "@/constants/paths";
import Link from "next/link";

const Footer = () => {
  const footerItems = [
    {
      title: "Portal",
      items: [
        { name: "Mapa", href: paths.Map },
        { name: "Dodaj Event", href: paths.EventAdd },
      ],
    },
    {
      title: "Inne",
      items: [
        { name: "Kontakt", href: paths.Contact },
        { name: "Współpraca", href: paths.Cooperation },
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
