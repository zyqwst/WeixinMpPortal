export const ADD_CONTENT = 'ADD_CONTENT'
export const CLEAR_CONTENT = 'CLEAR_CONTENT'

export default {
    state: {
        showItem:{id:'',content:''},
        showItems:[]
    },
    actions: {
        addContent({commit},showItem){
            commit(ADD_CONTENT,showItem);
        },
        clearContent({commit}){
            commit(CLEAR_CONTENT)
        }
    },
    mutations: {
        [ADD_CONTENT] (state,showItem){
            state.showItem = showItem;
            state.showItems.push(showItem)
        },
        [CLEAR_CONTENT] (state){
            state.showItems=[]
        }
    },
    getters:{
        getItemById:(state) => (id) => {
            return state.showItems.find(item => item.id===id)
        }
    }
};