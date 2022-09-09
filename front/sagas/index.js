import { all, fork, call, takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// 실제 서버 요청 함수
function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    yield put({
      type: "LOG_IN_REQUEST",
    });
    const result = yield call(logInAPI, action.data);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    yield put({
      type: "LOG_OUT_REQUEST",
    });
    const result = yield call(logOutAPI);
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    yield put({
      type: "ADD_POST_REQUEST",
    });
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeEvery("LOG_IN_REQUEST", logIn);
}

function* watchLogout() {
  yield takeEvery("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  yield takeEvery("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  // all은 배열을 받아 내부 요소를 한 번에 실행시켜준다.
  // fork, call은 제너레이터 함수를 실행시켜준다.
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}
