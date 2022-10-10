import { createStore } from "redux";
import { combineReducers } from "redux";
import counter from "../modules/counter";


const ADD = "ADD";
const DELETE = "DELETE";


export const addTodo = (title, body) => {
    return {
        type:ADD,
        title,
        body
    }
}


export const deleteTodo = id => {
    return {
        type: DELETE,
        id
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [{ title: action.title, body: action.body, id: Date.now() }, ...state]
        case DELETE:
            return state.filter(todo => todo !== action.id);
        default:
        return state;
    
        }
};

const store = createStore(reducer);
store.subscribe()

// const rootReducer = combineReducers({
//     counter: counter,
// });

// const store = createStore(rootReducer);

export default store;