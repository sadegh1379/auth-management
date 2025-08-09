import { NextPage } from 'next';
import Login from '@/templates/login';

export const metadata = {
  title: 'Login',
  description: 'Welcome to the Login page.'
};

const LoginPage: NextPage = () => {
  return <Login />;
};

export default LoginPage;