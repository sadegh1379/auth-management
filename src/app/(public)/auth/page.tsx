import { NextPage } from 'next';
import Auth from '@/templates/auth';

export const metadata = {
  title: 'Login',
  description: 'Welcome to the Login page.'
};

const AuthPage: NextPage = () => {
  return <Auth />;
};

export default AuthPage;