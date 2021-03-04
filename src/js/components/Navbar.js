import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

// Icon
import MenuIcon from '@material-ui/icons/Menu';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

// style
import { useNavbar } from '../styles';

const Navbar = ({ open, handleDrawerOpen, handleSelectFile }) => {
  const classes = useNavbar();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
      color="primary"
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Validation
        </Typography>
        <IconButton
          aria-label="open folder"
          color="inherit"
          onClick={handleSelectFile}
        >
          <FolderOpenIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Navbar);
