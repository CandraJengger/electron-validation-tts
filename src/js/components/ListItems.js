import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Collapse from '@material-ui/core/Collapse';
import Badge from '@material-ui/core/Badge';
import ListFixed from './ListFixed';

// style
import { useListItems } from '../styles';

const listItems = ({ count, note }) => {
  const classes = useListItems();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button className={classes.nested} onClick={handleClick}>
        <ListItemIcon>
          <Badge badgeContent={count} color="secondary">
            <AssignmentIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Note" />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListFixed items={note} />
        </List>
      </Collapse>
    </>
  );
};

export default listItems;
