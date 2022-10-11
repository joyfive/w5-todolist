// Action value
const ADD_TODO = "ADD_TODO";
const GET_TODO_ID = "GET_TODO_ID";
const DELETE_TODO = "DELETE_TODO";
const SWITCH_STATUS = "SWITCH_STATUS";

// Action Creator
// Todo를 추가하는 action creator
export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  };
};

// Todo를 지우는 action creator
export const deleteTodo = (payload) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};

// Todo를 isDone를 변경하는 action creator
export const switchStatus = (payload) => {
  return {
    type: SWITCH_STATUS,
    payload,
  };
};

// 상세 페이지에서 특정 Todo만 조회하는 action creator
export const getTodoID = (payload) => {
  return {
    type: GET_TODO_ID,
    payload,
  };
};

// initial state
const init = {
  todos: [
    {
      id: "1",
      title: "리덕스 101 강의듣기",
      body: "노마드 코더의 강의를 들어봅시다",
      isDone: true,
    },
    {
      id: "2",
      title: "리덕스로 수정해보기",
      body: "기능을 개발해보자",
      isDone: false,
    },
  ],
  todo: {
    id: "0",
    title: "",
    body: "",
    isDone: false,
  },
};

const todos = (state = init, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case SWITCH_STATUS:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          } else {
            return todo;
          }
        }),
      };

    case GET_TODO_ID:
      return {
        ...state,
        todo: state.todos.find((todo) => {
          return todo.id === action.payload;
        }),
      };
    default:
      return state;
  }
};

export default todos;
