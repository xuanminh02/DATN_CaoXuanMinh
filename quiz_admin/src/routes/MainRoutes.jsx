import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ManageBank from 'pages/component-overview/ManageBank';
import ManageLottery from 'pages/dashboard/manage_lottery';
import ManageBet from 'pages/dashboard/ManageBet';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/Setting')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard/lottery',
      element: <ManageLottery />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'user',
      element: <Color />
    },
    {
      path: 'bank',
      element: <ManageBank />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'setting',
      element: <SamplePage />
    },
    {
      path: 'transaction',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'bet',
      element: <ManageBet />
    },
  ]
};

export default MainRoutes;
