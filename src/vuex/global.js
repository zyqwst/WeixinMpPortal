export default {
    state:{
        isLoading:false,
        toast:{show:false,text:''}
    },
    actions:{
        loading({commit},isLoading){
            commit('LOADING',isLoading);
        },
        toast({commit},toast){
            commit('TOAST',toast)
        }
    },
    mutations:{
        LOADING(state,isLoading){
            state.isLoading = isLoading
        },
        TOAST(state,toast){
            state.toast = toast
        }
    }
}