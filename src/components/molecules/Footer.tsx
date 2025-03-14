import { translate } from '@/app/i18n';
import { paths } from '@/constants/paths';
import Link from 'next/link';

const Footer = async ({ lng }: { lng: string }) => {
  const { t } = await translate(lng);

  const footerItems = [
    {
      title: t('navigation.portal'),
      items: [
        { name: t('navigation.map'), href: paths.Map },
        { name: t('navigation.addEvent'), href: paths.EventAdd },
      ],
    },
    {
      title: t('navigation.others'),
      items: [
        { name: t('navigation.contact'), href: paths.Contact },
        { name: t('navigation.cooperation'), href: paths.Cooperation },
        { name: t('privacyPolicyPage.title'), href: paths.PrivacyPolicy },
        { name: t('statutePage.title'), href: paths.Statute },
      ],
    },
  ];

  return (
    <div className='min-w-full flex justify-center bg-gray-900 gap-16 py-4'>
      {footerItems.map((item) => (
        <div key={item.title} className='flex flex-col'>
          <h3 className='text-lg text-ivory-100'>{item.title}</h3>
          <ul>
            {item.items.map((subItem) => (
              <li key={subItem.name}>
                <Link
                  href={subItem.href}
                  className='text-grass-100 text-sm block'
                >
                  {subItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Footer;
