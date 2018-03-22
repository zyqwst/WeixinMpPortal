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
        clear({commit}){
            commit('CLEAR');
        }
    },
    mutations:{
        SELECTSTORE(state,selectStore){
            state.selectStore = selectStore
        },
        SELECTSPAS(state,selectSpas){
            state.selectSpas = selectSpas
        },
        CLEAR(state){
            state.selectSpas = []
            state.selectDate = ''
            state.selectTime = ''
        }
    },
    getters:{

    }
}