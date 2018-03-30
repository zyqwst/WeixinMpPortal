export default{
    state:{
        cartgoods:[],
    },
    actions:{
        addCart({commit},list){
            commit('ADDCART',list);
        }
    },
    mutations:{
        ADDCART(state,list){
            state.cartgoods = list
        }
    },
    getters:{
        getAllGoods:(state) => ()=>{
            return state.cartgoods
        }
    }
}