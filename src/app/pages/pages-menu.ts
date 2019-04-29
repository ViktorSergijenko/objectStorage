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
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
    ],
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
        title: 'Login',
        link: '/pages/login',
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
