import React from 'react';
import clsx from 'clsx';
import Gap from './Gap';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

import { useDetailFile } from '../styles';

const DetailFile = ({
  path,
  fileName,
  count,
  nameWav,
  currentCount,
  handleChangePosition,
}) => {
  const classes = useDetailFile();
  return (
    <Grid container direction="row" className={classes.widthFull}>
      <Grid item xs={6} md={12} lg={12} className={classes.widthFull}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography component="h5" variant="subtitle2">
            Path
          </Typography>
          <Typography
            component="p"
            variant="caption"
            noWrap
            className={classes.whiteSpaceWrap}
          >
            {path ? path : '-'}
          </Typography>
        </Grid>
        <Gap height={10} />
        <Grid item xs={12} md={12} lg={12}>
          <Typography component="h5" variant="subtitle2">
            File csv
          </Typography>
          <Typography component="p" variant="caption" noWrap>
            {fileName ? fileName : '-'}
          </Typography>
        </Grid>
        <Gap height={10} />
        <Grid item xs={12} md={12} lg={12}>
          <Typography component="h5" variant="subtitle2">
            File wav
          </Typography>
          <Typography
            component="p"
            variant="caption"
            noWrap
            className={classes.whiteSpaceWrap}
          >
            {nameWav ? nameWav : '-'}
          </Typography>
        </Grid>
      </Grid>
      <Gap height={10} />
      <Grid item xs={6} md={12} lg={12} style={{ textAlign: 'center' }}>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <OutlinedInput
            id="outlined-adornment-weight"
            value={currentCount}
            onChange={(e) => handleChangePosition(e.target.value)}
            onKeyDown={(e) => handleChangePosition(e.target.value, e.key)}
            endAdornment={
              <InputAdornment position="end">
                / {count ? count : 9999}
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'current',
            }}
            type="number"
            labelWidth={0}
          />
          <FormHelperText id="outlined-weight-helper-text">
            Current
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default React.memo(DetailFile);
