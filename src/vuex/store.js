import Vue from 'vue';
import Vuex from 'vuex';
import show from './show_store';
import spa from './spa';
import global from './global';
Vue.use(Vuex);

export default new Vuex.Store({
        modules: {
           show:show,
           spa:spa,
           global:global
        }
});