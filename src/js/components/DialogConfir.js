import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from './Dialog';

const DialogConfir = ({
  open = false,
  title = '',
  text = '',
  handleOnClose,
  handleOnOk,
}) => {
  return (
    <Dialog open={open} title={title}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOnOk} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfir;
