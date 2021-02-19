import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper,
  },
}));

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={(style, { height: 30 })} key={index}>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography component="span" variant="caption" color="secondary">
              {`Item ${index + 1}`}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const ListFixed = ({ count }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList height={400} width={230} itemSize={46} itemCount={count}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
};

export default ListFixed;
