import { translate } from '../i18n';
import { cookies } from 'next/headers';
import { cookieName } from '../i18n/settings';
import PageContainer from '@/components/atoms/PageContainer';
import NotFound from '@/components/molecules/NotFound';

const NotFoundPage = async () => {
  const cookieStore = await cookies();
  const lng = cookieStore.get(cookieName)?.value;
  const { i18n } = await translate(lng as string);
  return (
    <PageContainer>
      <NotFound is404 lng={i18n.language} />
    </PageContainer>
  );
};

export default NotFoundPage;
