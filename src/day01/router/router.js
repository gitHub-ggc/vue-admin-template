import store from '../store/index'
import Router from 'vue-router'
import Vue from 'vue'
// import { from } from 'core-js/core/array'

Vue.use(Router)

let routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        name:'home',
        component:() => import('../home.vue'),
        children:[
            {
                path:'/home/a',
                name:'home_a',
                component:() => import('../AAA.vue')
            }
        ]
    },
    {
        path:'/use/:id',
        name:'use',
        component:() => import('../use.vue')
    },
    {
        path:'/login',
        name:'login',
        component:() => import('../login.vue')
    },
    // {
    //     path:'/a',
    //     name:'a',
    //     component:() => import('../addRoute/a.vue')
    // },
    // {
    //     path:'/404',
    //     name:'404',
    //     component:() => import('../404.vue')
    // },
    // {
    //     path:'/*',
    //     redirect:"/404"
    // }
]
let router = new Router({
    mode:'history',
    routes
})
let token = true;
router.beforeEach(async(to,from,next) => {
    // if(to.path == '/home'){
    //     next();
    // }else{
    //     next('/home');
    // }
    if(token){
        // setTimeout(() => {
        //     console.log('$store-------',store)
        //     router.addRoute({
        //         path:'/bbb',
        //         name:'bbb',
        //         component:() => import('../BBB.vue')
        //     }) 
        //     routes.push(
        //         {
        //             path:'/404',
        //             name:'404',
        //             component:() => import('../404.vue')
        //         },
        //         {
        //             path:'/*',
        //             redirect:"/404"
        //         }
        //     ) 
        // }, 1000);

        await store.dispatch('CC/async_routes')
        console.log(111,store.state.CC.routes)
        setTimeout(() => {
            console.log(store.state.CC.routes)
            let addRouteArr = store.state.CC.routes;
            let obj = {
                // '../addRoute/a.vue':function(){ return import('../addRoute/a.vue')}
            };
            addRouteArr.map((v,index) => {
                if(index == 0){
                    obj[v.componentUrl] = function(){ return import('../addRoute/a.vue')};
                }
            })
            console.log(obj)
            let routerObj = {
                path: "/a",
                // component: "../addRoute/a.vue",
                component:() => import('@/day01/addRoute/a.vue'),
                name:"a"
                // children: [
                //   {
                //     path: "index",
                //     component: "/node/index",
                //     meta: {
                //       icon: "host",
                //       title: "主机管理"
                //     },
                //     name: "node"
                //   }
                // ]
              }
            addRouteArr.map((v => {
                // router.addRoute({
                //     path:v.path,
                //     name:v.name,
                //     component:obj[v.componentUrl]
                // })
                router.addRoute(routerObj)
            }))
        }, 2000);
        next();
    }else{
        if(to.name == 'login'){
            next();
        }else{
            next('/login');
        }
        
    }
    // next();
})
export default router