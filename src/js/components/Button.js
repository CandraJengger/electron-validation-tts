import React from 'react';
import ButtonMui from '@material-ui/core/Button';

const fixedWidthButton = {
  width: 100,
};

const Button = ({ variant, handleClick, text = '', color = 'default' }) => {
  return (
    <ButtonMui
      color={color}
      style={fixedWidthButton}
      variant={variant}
      onClick={handleClick}
    >
      {text}
    </ButtonMui>
  );
};

export default React.memo(Button);
