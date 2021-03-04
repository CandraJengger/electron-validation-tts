import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: 60,
  },
}));

const Wave = React.forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <>
      <div ref={ref} className={classes.container}></div>
    </>
  );
});

export default Wave;
