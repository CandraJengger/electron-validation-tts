import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

// style
import { useSwitchTheme } from '../styles';

const SwitchTheme = ({ isLight, handleChangeToggle }) => {
  const classes = useSwitchTheme();
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
