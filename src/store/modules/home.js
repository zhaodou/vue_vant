
const state = {
    count: 0,
    collects: []
}

const mutations = {
    SET_HOME_DATA(state) {
        state.count++
    },
    pushCollects: (state, items) => {
        state.collects.push(items)
    }
}

const actions = {
    set_home_data({ commit }, item) {
        commit('SET_HOME_DATA', item)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
