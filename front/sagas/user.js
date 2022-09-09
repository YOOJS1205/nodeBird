import { all, fork, takeLatest, put, delay } from "redux-saga/effects";
import axios from "axios";

// 실제 서버 요청 함수
function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    yield delay(1000);
    // const result = yield call(logInAPI, action.data);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
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
    yield 1000;
    // const result = yield call(logOutAPI);
    yield put({
      type: "LOG_OUT_SUCCESS",
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

// action을 지켜본다. (이벤트리스너의 역할)
function* watchLogIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
