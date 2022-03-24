import {createStore} from 'vuex';
export default createStore({
  state: {
    isCollapse: false
  },
  mutations: {
    updateCollapse(state){
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {

  },
  modules: {
    
  }
})