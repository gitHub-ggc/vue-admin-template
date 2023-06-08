export default{
    namespaced:true,
    state:{
        name:'bbbb'
    },
    actions:{
        name_async(context){
            setTimeout(() => {
                let data = 'bbb2'
                context.commit('set_name',data)
            }, 1000);
        }
    },
    getters:{
       
    },
    mutations:{
        set_name(state,data){
            state.name = data
        }
    }
}