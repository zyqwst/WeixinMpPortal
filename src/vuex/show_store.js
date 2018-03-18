export const ADD_CONTENT = 'ADD_CONTENT'
export const CLEAR_CONTENT = 'CLEAR_CONTENT'
export const CURRENT_USER = 'CURRENT_USER'

export default {
    state: {
        showItem:{id:'',content:''},
        showItems:[],
        currentUser:null
    },
    actions: {
        addContent({commit},showItem){
            commit(ADD_CONTENT,showItem);
        },
        clearContent({commit}){
            commit(CLEAR_CONTENT)
        },
        setCurrentUser({commit},user){
            commit(CURRENT_USER,user)
        }
    },
    mutations: {
        [ADD_CONTENT] (state,showItem){
            state.showItem = showItem;
            state.showItems.push(showItem)
        },
        [CLEAR_CONTENT] (state){
            state.showItems=[]
        },
        [CURRENT_USER](state,user){
            state.currentUser = user
        }
    },
    getters:{
        getItemById:(state) => (id) => {
            return state.showItems.find(item => item.id===id)
        },
        getCurrentUser:(state) => ()=>{
            return state.currentUser
        }
    }
};