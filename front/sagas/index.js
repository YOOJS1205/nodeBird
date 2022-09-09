import { all, fork } from "redux-saga/effects";

import userSaga from "./user";
import postSaga from "./post";

export default function* rootSaga() {
  // all은 배열을 받아 내부 요소를 한 번에 실행시켜준다.
  // fork, call은 제너레이터 함수를 실행시켜준다.
  yield all([fork(userSaga), fork(postSaga)]);
}
