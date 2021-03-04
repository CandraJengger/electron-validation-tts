import React from 'react';
import { useWave } from '../styles';

const Wave = React.forwardRef((props, ref) => {
  const classes = useWave();
  return (
    <>
      <div ref={ref} className={classes.container}></div>
    </>
  );
});

export default Wave;
