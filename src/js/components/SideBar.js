import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ListItems from './ListItems';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import SwitchTheme from './SwitchTheme';

// Icon
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// style
import { useSidebar } from '../styles';

const SideBar = ({ open, handleDrawerClose, count, note, toggleTheme }) => {
  const keyStore = 'theme';
  const [isLight, setIsLight] = useState(true);
  const classes = useSidebar();

  const handleChangeToggle = React.useCallback(
    (event) => {
      setIsLight(event.target.checked);
      toggleTheme();
    },
    [toggleTheme]
  );

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
        <SwitchTheme
          isLight={isLight}
          handleChangeToggle={handleChangeToggle}
        />
      </List>
    </Drawer>
  );
};

export default SideBar;
