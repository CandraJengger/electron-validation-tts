import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ListItems from './ListItems';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';

// Icon
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  switch: {
    paddingLeft: theme.spacing(3),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));

const SideBar = ({ open, handleDrawerClose, count, note, toggleTheme }) => {
  const keyStore = 'theme';
  const [isLight, setIsLight] = useState(true);
  const classes = useStyles();

  const handleChangeToggle = (event) => {
    setIsLight(event.target.checked);
    toggleTheme();
  };

  useEffect(async () => {
    (await electron.storeApi.getStore(keyStore)) &&
    (await electron.storeApi.getStore(keyStore)) === 'light'
      ? setIsLight(true)
      : setIsLight(false);
  }, []);

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItems count={count} note={note} />
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
      </List>
    </Drawer>
  );
};

export default SideBar;
