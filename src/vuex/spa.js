export default{
    state:{
        selectStore:{},
        selectSpas:[],
        selectDate:'',
        selectTime:''
    },
    actions:{
        selectStore({commit},selectStore){
            commit('SELECTSTORE',selectStore);
        },
        selectSpa({commit},selectSpas){
            commit('SELECTSPAS',selectSpas);
        },
    },
    mutations:{
        SELECTSTORE(state,selectStore){
            state.selectStore = selectStore
        },
        SELECTSPAS(state,selectSpas){
            state.selectSpas = selectSpas
        }
    },
    getters:{

    }
}