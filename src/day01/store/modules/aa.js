export default{
    namespaced:true,
    state:{
        name:'aaa'
    },
    actions:{
        name_async(context){
            setTimeout(() => {
                let data = 'aaa2';
                context.commit('set_name',data); 
            }, 1000);
        }
    },
    getters:{},
    mutations:{
        set_name(state,data){
            state.name = data;
        }
    }
}