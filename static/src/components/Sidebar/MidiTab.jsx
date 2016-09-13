import React from 'react';
import baseTab from './BaseTab';
import MidiMappingsList from '../../containers/Midi/MidiMappingsList';
import MidiInIndicator from '../../containers/Midi/MidiInIndicator';
import './MidiTab.scss';

function MidiTab() {
  return (
    <div>
      <MidiInIndicator />
      <MidiMappingsList />
    </div>
  );
}

export default baseTab('MIDI Input', MidiTab);
