import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  switch: {
    paddingLeft: theme.spacing(3),
  },
}));

const SwitchTheme = ({ isLight, handleChangeToggle }) => {
  const classes = useStyles();
  return (
    <FormGroup className={classes.switch}>
      <FormControlLabel
        control={
          <Switch
            checked={isLight}
            onChange={handleChangeToggle}
            aria-label="theme switch"
          />
        }
        label={isLight ? 'Light Mode' : 'Dark Mode'}
      />
    </FormGroup>
  );
};

export default React.memo(SwitchTheme);
