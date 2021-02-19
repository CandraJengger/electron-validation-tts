import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from './Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const DialogInput = ({
  title = 'Title',
  nameWav = 'Name Wav',
  open,
  handleCloseDialog,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{nameWav}</DialogContentText>
        <TextField
          autoFocus
          multiline
          rows={3}
          margin="dense"
          id="note"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCloseDialog} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogInput;
