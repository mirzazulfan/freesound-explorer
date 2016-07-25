import React from 'react';
import '../../stylesheets/PathsList.scss';

const propTypes = {
  paths: React.PropTypes.array,
  startStopPlayingPath: React.PropTypes.func,
  updateSelectedSound: React.PropTypes.func,
  createNewPath: React.PropTypes.func,
};

function PathsList(props) {
  return (
    <ul className="paths-list">
      {props.paths.map((path, pathIndex) =>
        <li key={pathIndex}>
          <button onClick={() => props.startStopPlayingPath(pathIndex)} >
            {(path.isPlaying) ?
              <i className="fa fa-pause fa-lg" aria-hidden="true" /> :
              <i className="fa fa-play fa-lg" aria-hidden="true" />}
          </button> {path.name} ({path.sounds.length} sounds)
          {(path.isSelected) ?
            <ul className="sounds-list">
              {path.sounds.map((sound, soundIndex) => {
                // Computed vars here
                return (
                  <li
                    key={soundIndex}
                    onClick={() => props.updateSelectedSound(sound.id)}
                  >{sound.name}</li>
                );
              })}
            </ul> : ''}
        </li>
      )}
      <li>
        <button onClick={() => props.createNewPath()} >
          <i className="fa fa-plus fa-lg" aria-hidden="true" />
        </button>
      </li>
    </ul>
  );
}


PathsList.propTypes = propTypes;
export default PathsList;
