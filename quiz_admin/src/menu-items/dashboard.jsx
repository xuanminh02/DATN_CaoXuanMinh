// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'user',
  title: '',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Quản lý người dùng',
      type: 'item',
      url: 'user',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
