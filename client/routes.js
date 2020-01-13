import Loadable from 'react-loadable';
import Loading from './components/loading';

const routes = [
  {
    path: '/',
    async: true,
    loader: Loadable({
      loader: () => import('./containers/sample'),
      loading: Loading
    })
  },
  {
    path: '/login',
    async: true,
    loader: Loadable({
      loader: () => import('./containers/login'),
      loading: Loading
    })
  }
];

export default routes;
