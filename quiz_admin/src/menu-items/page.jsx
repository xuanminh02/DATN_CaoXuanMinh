// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: '',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Nạp / rút',
      type: 'item',
      url: '/transaction',
      icon: icons.LoginOutlined
    },
    {
      id: 'user1',
      title: 'Quản lý người dùng',
      type: 'item',
      url: '/user'
      // icon: icons.LoginOutlined,
    },
    {
      id: 'user_bank',
      title: 'Quản lý bank',
      type: 'item',
      url: '/bank'
      // icon: icons.LoginOutlined,
    },
    {
      id: 'register1',
      title: 'Cài đặt',
      type: 'item',
      url: '/setting',
      icon: icons.ProfileOutlined
    },
    {
      id: 'register2',
      title: 'Quản lý lượt đặt cược',
      type: 'item',
      url: '/bet',
      icon: icons.ProfileOutlined
    }
  ]
};

export default pages;
