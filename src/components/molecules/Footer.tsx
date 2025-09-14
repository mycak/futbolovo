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
        { name: t('navigation.news'), href: paths.News },
        { name: t('navigation.contact'), href: paths.Contact },
        { name: t('navigation.cooperation'), href: paths.Cooperation },
        { name: t('privacyPolicyPage.title'), href: paths.PrivacyPolicy },
        { name: t('statutePage.title'), href: paths.Statute },
      ],
    },
  ];

  return (
    <div className='min-w-full flex flex-wrap md:justify-center bg-gray-900 gap-8 md:gap-16 px-8 py-4'>
      {footerItems.map((item) => (
        <div key={item.title} className='flex flex-col min-w-[220px]'>
          <h3 className='text-lg text-ivory-100 ml-2'>{item.title}</h3>
          <ul className='w-full'>
            {item.items.map((subItem) => (
              <li key={subItem.name} className='my-1'>
                <Link
                  href={subItem.href}
                  className='text-grass-100 text-sm px-2 py-1 min-w-[44px] w-full flex items-center hover:text-grass-50 transition-colors'
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
