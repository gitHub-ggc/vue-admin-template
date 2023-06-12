export default{
    namespaced:true,
    state:{
        routes:[]
    },
    mutations:{
        routes_fun(state,data){
            state.routes = data;
        }
    },
    actions:{
        async async_routes(text){
            await setTimeout(() => {
                let arr = [
                    {
                        path:'/a',
                        name:'a',
                        componentUrl:'../addRoute/a.vue',
                        
                    },
                    {
                        path:'/b',
                        name:'b',
                        componentUrl:'../addRoute/b.vue',
                        
                    },
                    {
                        path:'/c',
                        name:'c',
                        componentUrl:'../addRoute/c.vue',
                        
                    },
                ]
                text.commit('routes_fun',arr)
                return arr;
            }, 1000);
        }
    }
}