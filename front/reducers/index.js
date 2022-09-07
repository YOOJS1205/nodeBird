import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./post";

// 이전상태와 액션을 통해서 다음 상태를 만드는 함수
// combineReducers가 각각의 initial state를 알아서 넣어줌
const rootReducer = combineReducers({
  // redux ssr을 위한 hydrate 때문에 index reducer 추가
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  },
  userReducer,
  postReducer,
});

export default rootReducer;
