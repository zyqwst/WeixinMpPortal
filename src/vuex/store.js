import Vue from 'vue';
import Vuex from 'vuex';
import show from './show_store';
Vue.use(Vuex);

export default new Vuex.Store({
        ...show
});