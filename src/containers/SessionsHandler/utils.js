import { pick, omit, mapValues } from 'lodash';
import { reducersToExport } from './storableReducer';


export const handleMapReducer = state => omit(state, 'forceMapUpdate');

export const handleMetronomeReducer = state => pick(state, 'tempo');

export const handleMidiReducer = state => pick(state, 'notesMapped');

export const handlePathsReducer = (state) => {
  const pathInitialState = require('../Paths/reducer').pathInitialState; // eslint-disable-line

  const { paths } = state;
  const filteredPaths = paths.map(path =>
    Object.assign({}, path,
      { soundCurrentlyPlaying: pathInitialState.soundCurrentlyPlaying })
  );
  return { paths: filteredPaths };
};

export const sessionsForbiddenKeys = ['hasUnsavedProgress',
  'availableUserSessions', 'availableDemoSessions'];
export const handleSessionReducer = state => omit(state, sessionsForbiddenKeys);

export const byIDForbiddenKeys = ['buffer', 'isHovered', 'isPlaying'];
export const handleSoundsReducer = (state) => {
  const { byID } = state;
  const filteredByID = mapValues(byID, sound => omit(sound, byIDForbiddenKeys));
  return { byID: filteredByID };
};

export const filterDataForReducer = (reducerState, reducerName) => {
  let handler;
  switch (reducerName) {
    case 'map': {
      handler = handleMapReducer;
      break;
    }
    case 'metronome': {
      handler = handleMetronomeReducer;
      break;
    }
    case 'midi': {
      handler = handleMidiReducer;
      break;
    }
    case 'paths': {
      handler = handlePathsReducer;
      break;
    }
    case 'session': {
      handler = handleSessionReducer;
      break;
    }
    case 'sounds': {
      handler = handleSoundsReducer;
      break;
    }
    default:
      handler = state => state;
      break;
  }
  const filteredState = handler(reducerState);
  return { [reducerName]: filteredState };
};

export const getDataToSave = globalState =>
  reducersToExport.reduce((exportedState, curReducer) =>
    Object.assign(exportedState, filterDataForReducer(globalState[curReducer], curReducer)), {});
