import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'max-content',
    width: '100%',
    background: 'transparent',
  },
}));

const WaveformContainer = (props) => {
  const classes = useStyles();

  return <div className={classes.container}>{props.children}</div>;
};

export default WaveformContainer;
