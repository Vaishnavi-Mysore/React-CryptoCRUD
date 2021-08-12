export default {
  items: [
    {
      name: 'Payment',
      url: '/hello',
      icon: 'fa fa-cash-register',
    },
    {
      name: 'Activity',
      url: '/ hello',
      icon: 'fa fa-users',
    },
    {
      name: 'Rewards',
      url: '/hello',
      icon: 'nav-icon fa fa-user-friends',
    },
    {
      name: 'Services',
      // url: '/rules',
      icon: 'fa fa-pencil-ruler',
      // icon: 'icon-drop',
      children: [
        {
          name: 'Manage Cards & Devices',
          url: '/base/forms',
          icon: 'icon-puzzle',
        },
        {
          name: 'Add/ Manage users',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle',
        },
        {
          name: 'Credit line increase',
          url: '/base/list-groups',
          icon: 'icon-puzzle',
        },
        {
          name: 'Discover crypto',
          url: '/account-signin',
          icon: 'icon-puzzle',
        },
        {
          name: 'Create/ Change cash pin',
          url: '/base/paginations',
          icon: 'icon-puzzle',
        },
        {
          name: 'Balance transfer',
          url: '/base/popovers',
          icon: 'icon-puzzle',
        },
      ]
    },
  ],
};
