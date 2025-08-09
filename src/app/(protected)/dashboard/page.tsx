import { NextPage } from 'next';
import Dashboard from '@/templates/dashboard';

export const metadata = {
  title: 'Dashboard',
  description: 'Welcome to the Dashboard page.'
};

const DashboardPage: NextPage = () => {
  return <Dashboard />;
};

export default DashboardPage;