import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Warehouses',
    icon: 'nb-home',
    link: '/pages/warehouse/list',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Catalog Names',
    icon: 'nb-compose',
    link: '/pages/catalog-name-list',
  },
  {
    title: 'Log table',
    icon: 'fas fa-clipboard-list',
    link: '/pages/log-table',
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Register',
        link: '/pages/register',
      },
      {
        title: 'User Table',
        link: '/pages/user-table',
      },
      //   {
      //     title: 'Request Password',
      //     link: '/auth/request-password',
      //   },
      //   {
      //     title: 'Reset Password',
      //     link: '/auth/reset-password',
      //   },
    ],
  },
];
