import universalRouter from 'universal-router';
import {createHashHistory} from 'history';
import {h, lazy, isValidElement, Context, useState, useContext} from 'dyo';

let __router;

export function Link ({onClick, children, path, ...props}) {
  const {router, history} = useContext(__router);
  return h('a', {...props, onClick: () => {
    history.push(path);
  }}, children)
}

export function createRouter (routes, options = {}) {
  const {
    basename, hashType = 'hashbang', getUserConfirmation,
    history = new createHashHistory({basename, hashType, getUserConfirmation})
  } = options;
  const router = new universalRouter(routes, {
    context: {history},
    resolveRoute (context, params) {
      const {baseUrl, keys, next, path, pathname, route, router, history} = context;
      if (typeof route.action === 'function')
        return route.action(context, params)
      if (typeof route.component === 'function')
        return h(route.component, {history, router, pathname, params}, next())
      if (isValidElement(route.component))
        return route.component
      if (typeof route.redirect === 'string')
        history.replace(route.redirect);
      return null;
    }
  })

  __router = () => {
    const [route, setRoute] = useState(router.resolve(history.location.pathname));
    history.listen((pathname) => setRoute(router.resolve(pathname)));
    // console.log(route);
    return h(Context, {value: {router, history}}, lazy(route))
  }

  return __router;
}

export default createRouter;
