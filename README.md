# dyo-router
dyo router

USAGE
---
```js
import { render } from 'dyo';
import createRouter from 'dyo-router';
import Login from './Login';
import Layout from './Layout';

const router = createRouter([
    {
        path: '/login', 
        component: Login,
    },
    {
        path: '/',
        component: Layout,
        childrens: [
            {
                path: '/home', 
                component: lazy(() => import('./HomePage').then(module => module.default)),
            },
            {
                path: '/post', 
                component: lazy(() => import('./PostPage').then(module => module.default)),
            },
            {
                path: '(.*)',
                redirect: '/home',
            }
        ]
    }
], /* {history} */)

render(router, document.body);
```


