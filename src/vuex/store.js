import Vue from 'vue';
import Vuex from 'vuex';
import show from './show_store';
import spa from './spa';
Vue.use(Vuex);

export default new Vuex.Store({
        modules: {
           show:show,
           spa:spa
        }
});