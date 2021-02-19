import React from 'react';
import DialogMui from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const Dialog = ({ open, title, children = '' }) => {
  return (
    <DialogMui open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      {children}
    </DialogMui>
  );
};

export default Dialog;
