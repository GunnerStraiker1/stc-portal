import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Indicadores = React.lazy(() => import('./views/Indicadores/Indicadores'))
const IndicadoresInfantiles = React.lazy(() => import('./views/Indicadores/IndicadoresInfantiles'))
const Indices =  React.lazy(() => import('./views/Indices/indices'))
const IndicesInfantiles =  React.lazy(() => import('./views/Indices/indicesInfantiles'))
const Gubernamentales = React.lazy(()=> import('./views/Programas/Gubernamentales'))
const OSC = React.lazy(()=> import('./views/Programas/ProgramasOSC'))
const Repositorios = React.lazy(()=> import('./views/Repositorios/Repositorios'))
const Estadisticas = React.lazy(()=> import('./views/Estadisticas/Estadisticas'))

const CoreUIIcons = React.lazy(()=> import('./views/Icons/CoreUIIcons/CoreUIIcons'))
const Flags = React.lazy(()=> import('./views/Icons/Flags/Flags'))
const FontAwesome = React.lazy(()=> import('./views/Icons/FontAwesome/FontAwesome'))
const SimpleLineIcons = React.lazy(()=> import('./views/Icons/SimpleLineIcons/SimpleLineIcons'))
const Admin = React.lazy(() => import('././views/Admin/AdminHome'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/indicadores', exact: true, name: 'Indicadores', component: Indicadores },
  { path: '/indicadoresInfantiles', exact: true, name: 'IndicadoresInfantiles', component: IndicadoresInfantiles },
  { path: '/indices', exact: true, name: 'Indices', component: Indices },
  { path: '/indicesInfantiles', exact: true, name: 'Indices', component: IndicesInfantiles },
  { path: '/programasGob', exact: true, name: 'Gubernamentales', component: Gubernamentales },
  { path: '/programasOsc', exact: true, name: 'OSC', component: OSC },
  { path: '/repositorios', exact: true, name: 'repo', component: Repositorios },
  { path: '/estadisticas', exact: true, name: 'statics', component: Estadisticas },
  { path: '/admin', exact: true, name:'Admin', component: Admin },
  // { path: '/theme/colors', name: 'Colors', component: Colors },
  // { path: '/theme/typography', name: 'Typography', component: Typography },
  // { path: '/base', exact: true, name: 'Base', component: Cards },
  // { path: '/base/cards', name: 'Cards', component: Cards },
  // { path: '/base/forms', name: 'Forms', component: Forms },
  // { path: '/base/switches', name: 'Switches', component: Switches },
  // { path: '/base/tables', name: 'Tables', component: Tables },
  // { path: '/base/tabs', name: 'Tabs', component: Tabs },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/carousels', name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', name: 'Collapse', component: Collapses },
  // { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  // { path: '/base/navbars', name: 'Navbars', component: Navbars },
  // { path: '/base/navs', name: 'Navs', component: Navs },
  // { path: '/base/paginations', name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', name: 'Popovers', component: Popovers },
  // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  // { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  // { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  // { path: '/notifications/modals', name: 'Modals', component: Modals },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
  // { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
