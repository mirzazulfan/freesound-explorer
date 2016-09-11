import React from 'react';
import './SoundInfo.scss';
import Waveform from '../Waveform';
import { MESSAGE_STATUS } from '../../constants';
import { midiNoteNumberToMidiNoteLabel } from '../../utils/midiUtils';

const propTypes = {
  isVisible: React.PropTypes.bool,
  soundID: React.PropTypes.string,
  position: React.PropTypes.object,
  direction: React.PropTypes.string,
  isUserLoggedIn: React.PropTypes.bool,
  setSoundCurrentlyLearnt: React.PropTypes.func,
  soundCurrentlyLearnt: React.PropTypes.string,
  notesMapped: React.PropTypes.object,
  selectedPath: React.PropTypes.string,
  addSoundToPath: React.PropTypes.func,
  downloadSound: React.PropTypes.func,
  bookmarkSound: React.PropTypes.func,
};

// TODO: SoundInfo component must read isUserLoggedIn from state.login (redux)

const DEFAULT_CLASSNAME = 'sound-info-modal';

const SoundInfo = (props) => {
  return <div />;
}

// class SoundInfo extends React.Component {
//   getCurrentlyAssignedMidiNoteLabel() {
//     let noteLabel = '';
//     Object.keys(this.props.notesMapped).forEach((key) => {
//       if (this.props.notesMapped[key] === this.lastSound.id) {
//         noteLabel = midiNoteNumberToMidiNoteLabel(key);
//       }
//     });
//     return noteLabel;
//   }
//
//   getClassName() {
//     if (!this.props.sound) {
//       // hide modal: reset classname to default (not visible)
//       return DEFAULT_CLASSNAME;
//     }
//     let className = `${DEFAULT_CLASSNAME} active`;
//     if (this.props.sound.position.cy < parseInt(sassVariables.soundInfoModalHeight, 10)) {
//       className += '-down';
//     }
//     return className;
//   }
//
//   getContainerStyle() {
//     if (this.props.sound) {
//       this.lastTopPosition = this.props.sound.position.cy;
//       this.lastLeftPosition = this.props.sound.position.cx;
//     }
//     return { top: this.lastTopPosition, left: this.lastLeftPosition };
//   }
//
//   updateSoundContent() {
//     if (this.props.sound) {
//       this.lastSound = this.props.sound;
//       this.bookmarkSound = this.bookmarkSound.bind(this);
//       this.downloadSound = this.downloadSound.bind(this);
//     }
//   }
//
//   bookmarkSound() {
//     freesound.setToken(sessionStorage.getItem('access_token'), 'oauth');
//     const sound = this.lastSound;
//     sound.bookmark(
//       sound.name,  // Use sound name
//       'Freesound Explorer' // Category
//     ).then(() => {
//       this.lastSound.isBookmarked = true;
//       this.props.displaySystemMessage('Sound bookmarked!', MESSAGE_STATUS.SUCCESS);
//     },
//     () => this.props.displaySystemMessage('Error bookmarking sound', MESSAGE_STATUS.ERROR));
//   }
//
//   downloadSound() {
//     this.props.displaySystemMessage('Downloading sounds is not implemented yet',
//       MESSAGE_STATUS.INFO);
//   }
//
//   render() {
//     const className = this.getClassName();
//     const containerStyle = this.getContainerStyle();
//     this.updateSoundContent();
//     if (!this.lastSound) {
//       return null;
//     }
//     let bookmarkSoundIcon = null;
//     let dowloadSoundIcon = null;
//     if (this.props.isUserLoggedIn) {
//       bookmarkSoundIcon = (this.lastSound.isBookmarked) ? (
//         <button>
//           <i className="fa fa-star fa-lg" aria-hidden />
//         </button>
//       ) : (
//         <button onClick={this.bookmarkSound}>
//           <i className="fa fa-star-o fa-lg" aria-hidden />
//         </button>
//       );
//       dowloadSoundIcon = (
//         <button onClick={this.downloadSound}>
//           <i className="fa fa-download fa-lg" aria-hidden="true" />
//         </button>
//       );
//     }
//     const midiLearnButton = (
//       <button
//         className={(this.props.soundCurrentlyLearnt === this.lastSound.id) ? 'learning' : ''}
//         onClick={() => this.props.setSoundCurrentlyLearnt(this.lastSound.id)}
//       >
//         MIDI: {(this.props.soundCurrentlyLearnt === this.lastSound.id) ? 'learning' :
//           this.getCurrentlyAssignedMidiNoteLabel()}
//       </button>
//     );
//     let addToPathButton = null;
//     if (this.props.selectedPath !== null) {
//       addToPathButton = (
//         <button
//           onClick={() => this.props.addSoundToPath(
//             this.props.sound.id, this.props.selectedPath)}
//         >Add to path</button>
//       );
//     }
//     const userButtons = (
//       <div className="sound-info-buttons-container">
//         {addToPathButton}
//         {midiLearnButton}
//         {bookmarkSoundIcon}
//         {dowloadSoundIcon}
//       </div>
//     );
//     return (
//       <div className={className} style={containerStyle}>
//         <div>
//           <a href={this.lastSound.url}>
//             <div className="sound-info-modal-title">
//               <div>{this.lastSound.name}</div>
//               <div>by {this.lastSound.username}</div>
//             </div>
//           </a>
//           <div className="sound-info-modal-content">
//             <Waveform sound={this.props.sound} />
//             {userButtons}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

SoundInfo.propTypes = propTypes;
export default SoundInfo;
