// import videos from "../apis/videos";
import { salsa } from "../apis/videos";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  SELECT_CATEGORY,
  SET_VIDEOMODE
} from "./types";

export const setVideoMode = mode => {
  return {
    type: SET_VIDEOMODE,
    payload: mode
  };
};

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const selectCategory = category => {
  return {
    type: SELECT_CATEGORY,
    payload: category
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  //  const response = await videos.post("/videos", { ...formValues, userId });
  const response = await salsa.post("", { ...formValues, userId });
  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push("/");
};

export const fetchStreams = () => async dispatch => {
  //  const response = await videos.get("/videos");
  const response = await salsa.get("");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  //  const response = await videos.get(`/videos/${id}`);
  const response = await salsa.get(`/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  //  const response = await videos.patch(`/videos/${id}`, formValues);
  const response = await salsa.put(
    `https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app1-mukhm/service/http/incoming_webhook/salsa-put?id=${id}`,
    formValues
  );

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

export const deleteStream = id => async dispatch => {
  //  await videos.delete(`/videos/${id}`);
  //await salsa.delete(`?/id=${id}`);
  await salsa.delete(
    `https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app1-mukhm/service/http/incoming_webhook/salsa-delete?id=${id}`
  );
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
