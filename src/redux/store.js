import { createStore } from 'redux'

let initial_state = {
    show_only_difference: false
};

function reducer(state = initial_state, action) {
    switch (action.type) {
      case 'show_diff/changed':
        return { show_only_difference: action.value }
      default:
        return state
    }
}

let store = createStore(reducer);

export default store;