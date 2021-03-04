import React from 'react';
import { useWaveContainer } from '../styles';

const WaveformContainer = (props) => {
  const classes = useWaveContainer();

  return <div className={classes.container}>{props.children}</div>;
};

export default WaveformContainer;
