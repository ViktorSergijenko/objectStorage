import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Noliktavas',
    icon: 'nb-home',
    link: '/pages/warehouse/list',
  },
  {
    title: 'Navigacija',
    group: true,
  },
  {
    title: 'Katalogu tipi',
    icon: 'nb-compose',
    link: '/pages/catalog-type-list',
  },
  {
    title: 'Notikumi',
    icon: 'fas fa-clipboard-list',
    link: '/pages/log-table',
  },
  {
    title: 'Darbinieki',
    icon: 'nb-locked',
    children: [
      {
        title: 'Darbinieku reģistrācija',
        link: '/pages/register',
      },
      {
        title: 'Darbinieku tabulā',
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
