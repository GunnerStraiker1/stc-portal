export default {
  items: [
    {
      name: 'Página Principal',
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
      icon: 'fa fa-th-large',
      children:[
        {name: 'Introduccion a los Indicadores', url:'/metodologiaIndicadores', icon:'fa fa-th-large'},
        {name: 'Indicadores Adultos', url:'/indicadores', icon:'fa fa-th-large'},
        {name: 'Indicadores de Niñas y Niños', url:'/indicadoresInfantiles', icon:'fa fa-th-large'},
      ]
    },
    {
      divider: true,
    },
    {
      name: 'Índices',
      icon: 'fa fa-tags',
      children:[
        {name: 'Metodología Utilizada', url:'/metodologiaIndices', icon:'fa fa-th-large'},
        {name: 'Índices Adultos', url:'/indices', icon:'fa fa-tags'},
        {name: 'Índices de Niñas y Niños', url:'/indicesInfantiles', icon:'fa fa-tags'},
      ]
    },
    {
      name: 'Programas',
      icon: 'icon-people',
      children:[
        {name: 'Introducción a los Programas', url:'/metodologiaPrograma', icon:'fa fa-building'},
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
    },
    {
      name: 'Estadisticas',
      icon: 'fa fa-bar-chart',
      children:[
        {name: 'Introducción a las Estadísticas', url:'/metodologiaEstadistica', icon:'fa fa-bar-chart'},
        {
          name: 'Estadisticas',
          url: '/estadisticas',
          icon: 'fa fa-bar-chart'
        }
      ]
    },
    {
      name: 'Biblioteca',
      icon: 'fa fa-tags',
      children:[
        {name: 'Introducción a Biblioteca', url:'/metodologiaRepositorio', icon:'fa fa-tags'},
        {
          name: 'Biblioteca',
          url: '/repositorios',
          icon: 'fa fa-tags',
        }
      ]
    },

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
