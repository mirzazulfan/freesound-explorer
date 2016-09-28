import makeActionCreator from 'utils/makeActionCreator';
import { MESSAGE_STATUS, URLS } from 'constants';
import { loadJSON, postJSON } from 'utils/requests';
import { getDataToSave } from './utils';
import { displaySystemMessage } from '../MessagesBox/actions';
import { setSessionID, updateSessionName } from '../Session/actions';
import { addPathEventListener, removePathEventListener } from '../Paths/actions';
import { stopMetronome } from '../Metronome/actions';

export const NEW_SESSION = 'NEW_SESSION';
export const SAVE_SESSION = 'SAVE_SESSION';
export const LOAD_SESSION = 'LOAD_SESSION';
export const BACKEND_SAVE_REQUEST = 'BACKEND_SAVE_REQUEST';
export const BACKEND_SAVE_SUCCESS = 'BACKEND_SAVE_SUCCESS';
export const BACKEND_SAVE_FAILURE = 'BACKEND_SAVE_FAILURE';
export const BACKEND_LOAD_REQUEST = 'BACKEND_LOAD_REQUEST';
export const BACKEND_LOAD_SUCCESS = 'BACKEND_LOAD_SUCCESS';
export const BACKEND_LOAD_FAILURE = 'BACKEND_LOAD_FAILURE';

// no need to exports all these actions as they will be used internally in saveSession
const backendSaveRequest = makeActionCreator(BACKEND_SAVE_REQUEST, 'sessionID', 'dataToSave');
const backendSaveSuccess = makeActionCreator(BACKEND_SAVE_SUCCESS, 'sessionID');
const backendSaveFailure = makeActionCreator(BACKEND_SAVE_FAILURE, 'msg');
const backendLoadRequest = makeActionCreator(BACKEND_LOAD_REQUEST);
const backendLoadSuccess = makeActionCreator(BACKEND_LOAD_SUCCESS);
const backendLoadFailure = makeActionCreator(BACKEND_LOAD_FAILURE, 'msg');

export const newSession = makeActionCreator(NEW_SESSION);

const saveToBackend = (sessionID, dataToSave) => (dispatch) => {
  let url = URLS.SAVE_SESSION;
  if (sessionID) {
    url = `${url}?sid=${sessionID}`;
  }
  dispatch(backendSaveRequest(sessionID, dataToSave));
  postJSON(url, dataToSave).then(
    (data) => {
      dispatch(backendSaveSuccess(data.sessionID));
      dispatch(setSessionID(data.sessionID));
      dispatch(updateSessionName(data.sessionName));
      dispatch(displaySystemMessage(
        `Session successfully saved '${data.sessionName}'! (${data.sessionID})`, MESSAGE_STATUS.SUCCESS));
    },
    (data) => {
      const message = (data && data.msg) || 'Unknown error';
      dispatch(backendSaveFailure(message));
      dispatch(displaySystemMessage(
        `Could not save the session: ${message}`, MESSAGE_STATUS.ERROR));
    }
  );
};

export const saveSession = () => (dispatch, getStore) => {
  const currentState = getStore();
  const dataToSave = getDataToSave(currentState);
  if (currentState.login.isEndUserAuthSupported) {
    dispatch(saveToBackend(currentState.session.id, dataToSave));
  } else {
    // TODO: save to local storage
  }
};

export const saveSessionAs = sessionName => (dispatch, getStore) => {
  dispatch(updateSessionName(sessionName));
  const currentState = getStore();
  const dataToSave = getDataToSave(currentState);
  if (currentState.login.isEndUserAuthSupported) {
    dispatch(saveToBackend(currentState.session.id, dataToSave));
  } else {
    // TODO: save to local storage
  }
};

const preRestoreSession = () => (dispatch, getStore) => {
  dispatch(stopMetronome());
  const state = getStore();
  state.paths.paths.forEach(path => dispatch(removePathEventListener(path.id)));
};

const postRestoreSession = () => (dispatch, getStore) => {
  // Use this function to do all the stuff that is needed to
  // make a loaded session ready for playing/continue editing (e.g. setting listeners on paths)
  const state = getStore();
  state.paths.paths.forEach(path => dispatch(addPathEventListener(path.id)));
};

const loadFromBackend = sessionID => (dispatch) => {
  const url = `${URLS.LOAD_SESSION}?sid=${sessionID}`;
  dispatch(backendLoadRequest());
  loadJSON(url).then(
    (data) => {
      dispatch(preRestoreSession());
      dispatch(Object.assign({}, data.data, { type: LOAD_SESSION }));
      dispatch(postRestoreSession());
      dispatch(backendLoadSuccess());
      dispatch(displaySystemMessage(
        'Session loaded!', MESSAGE_STATUS.SUCCESS));
    },
    (data) => {
      const message = (data && data.msg) || 'Unknown error';
      dispatch(backendLoadFailure());
      dispatch(displaySystemMessage(
        `Error loading session: ${message}`, MESSAGE_STATUS.ERROR));
    }
  );
};

export const loadSession = sessionID => (dispatch, getStore) => {
  const currentState = getStore();
  if (currentState.login.isEndUserAuthSupported) {
    dispatch(loadFromBackend(sessionID));
  } else {
    // TODO: load from local storage
  }
};
