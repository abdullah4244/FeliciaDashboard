import { lazy } from 'react';
const FileLayout = lazy(() => import('../pages/Dashboard/FileLayout'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/file',
    title: 'Add File',
    component: FileLayout,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
