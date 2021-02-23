import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    backgroundColor: theme.palette.background.paper,
  },
}));

function renderRow(props) {
  const { index, style, data } = props;

  return (
    <Tooltip
      title={
        <Typography component="span" variant="body2">
          {`${data[index].notewav}`}
        </Typography>
      }
      style={{ maxWidth: 500 }}
      arrow
      placement="right"
      TransitionComponent={Zoom}
    >
      <ListItem
        button
        style={
          (style,
          {
            height: 30,
          })
        }
        key={index}
      >
        <Typography
          component="span"
          variant="caption"
          noWrap
          style={{
            width: 239,
          }}
          color="secondary"
        >
          {`${data[index].namewav.substring(
            8,
            data[index].namewav.lastIndexOf('v')
          )} - ${data[index].notewav}`}
        </Typography>
      </ListItem>
    </Tooltip>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const ListFixed = ({ items }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList
        height={400}
        width={230}
        itemSize={46}
        itemCount={items.length}
        itemData={items}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
};

export default ListFixed;
