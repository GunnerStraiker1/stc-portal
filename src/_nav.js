export default {
  items: [
    {
      name: 'Inicio',
      url: '/Inicio',
      icon: 'fa fa-home',
    },
    // {
    //   title: true,
    //   name: 'Indicadores',
    //   wrapper: {            // optional wrapper object
    //     element: '',        // required valid HTML5 element tag
    //     attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //   },
    //   class: ''             // optional class names space delimited list for title item ex: "text-center"
    // },
    // {
    //   name: 'Colors',
    //   url: '/theme/colors',
    //   icon: 'icon-drop',
    // },
    // {
    //   name: 'Typography',
    //   url: '/theme/typography',
    //   icon: 'icon-pencil',
    // },
    {
      name: 'Indicadores',
      url: '/indicadores',
      icon: 'fa fa-th-large',
    },
    {
      divider: true,
    },
    {
      name: 'Índices',
      url: '/indices',
      icon: 'fa fa-tags',
    },
    {
      name: 'Programas',
      url: '/programas',
      icon: 'icon-people',
      children:[
        {
          name: 'Programas Gubernamentales',
          url: '/programasGob',
          icon: 'fa fa-bank',
        },
        {
          name: 'Programas OSC',
          url: '/programasOsc',
          icon: 'fa fa-building',
        }
      ]
    }

    // {
    //   name: 'Pages',
    //   url: '/pages',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'Login',
    //       url: '/login',
    //       icon: 'icon-star',
    //     },
    //     {
    //       name: 'Register',
    //       url: '/register',
    //       icon: 'icon-star',
    //     },
    //     {
    //       name: 'Error 404',
    //       url: '/404',
    //       icon: 'icon-star',
    //     },
    //     {
    //       name: 'Error 500',
    //       url: '/500',
    //       icon: 'icon-star',
    //     },
    //   ],
    // },
    // {
    //   name: 'Disabled',
    //   url: '/dashboard',
    //   icon: 'icon-ban',
    //   attributes: { disabled: true },
    // },
    // {
    //   name: 'Download CoreUI',
    //   url: 'https://coreui.io/react/',
    //   icon: 'icon-cloud-download',
    //   class: 'mt-auto',
    //   variant: 'success',
    //   attributes: { target: '_blank', rel: "noopener" },
    // },
    // {
    //   name: 'Try CoreUI PRO',
    //   url: 'https://coreui.io/pro/react/',
    //   icon: 'icon-layers',
    //   variant: 'danger',
    //   attributes: { target: '_blank', rel: "noopener" },
    // },
  ],
};
