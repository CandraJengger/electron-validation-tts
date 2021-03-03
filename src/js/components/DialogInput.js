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
  value = '',
  handleOnChange,
  handleOnSave,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent
        style={{
          width: 500,
        }}
      >
        <DialogContentText>{nameWav}</DialogContentText>
        <TextField
          autoFocus
          multiline
          value={value}
          onChange={(e) => handleOnChange(e.target.value)}
          rows={5}
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
        <Button onClick={handleOnSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(DialogInput);
