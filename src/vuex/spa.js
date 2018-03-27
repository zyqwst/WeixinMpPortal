export default{
    state:{
        selectStore:{},
        selectSpas:[],
        selectDate:null,
        selectTime:{},
        remark:null
    },
    actions:{
        selectStore({commit},selectStore){
            commit('SELECTSTORE',selectStore);
        },
        selectSpa({commit},selectSpas){
            commit('SELECTSPAS',selectSpas);
        },
        selectedTime({commit},playload){
            commit('SELECTTIME',playload);
        },
        selectRemark({commit},remark){
            commit('REMARK',remark)
        },
        clear({commit}){
            commit('CLEAR');
        }
    },
    mutations:{
        SELECTSTORE(state,selectStore){
            state.selectStore = selectStore
            state.selectSpas=[]
            state.selectDate=null
            state.selectTime={}
        },
        SELECTSPAS(state,selectSpas){
            state.selectSpas = selectSpas
            state.selectDate=null
            state.selectTime={}
        },
        SELECTTIME(state,playload){
            state.selectDate = playload.selectDate
            state.selectTime = playload.selectTime
        },
        REMARK(state,remark){
            state.remark = remark
        },
        CLEAR(state){
            state.selectStore={}
            state.selectSpas=[]
            state.selectDate=null
            state.selectTime={}
            state.remark=null
        }
    },
    getters:{

    }
}