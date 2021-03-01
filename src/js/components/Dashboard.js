// path
import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import WaveSurfer from 'wavesurfer.js';

import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// components
import SideBar from './SideBar';
import DetailFile from './DetailFile';
import Navbar from './Navbar';
import WaveformContainer from './WaveformContainer';
import Wave from './Wave';
import DialogInput from './DialogInput';
import DialogConfirApply from './DialogConfir';
import DialogConfirSave from './DialogConfir';

// icons
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import PauseIcon from '@material-ui/icons/Pause';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 200,
  },
  fixedWidthButton: {
    width: 100,
  },
  paperModal: {
    // Modal
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paddingY: {
    paddingTop: 20,
    paddingBottom: 22,
  },
  paddingTop: {
    paddingTop: 20,
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default function Dashboard({ onToggleTheme }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [openDialogInput, setOpenDialogInput] = useState(false);
  const [openDialogApply, setOpenDialogApply] = useState(false);
  const [openDialogSave, setOpenDialogSave] = useState(false);

  // content
  const [filePath, setFilePath] = useState('');
  const [fileName, setFileName] = useState('');
  const [data, setData] = useState([]);
  const [position, setPosition] = useState(0);
  const [currentCount, setCurrentCount] = useState('');
  const [playing, setPlaying] = useState(false);
  const [dataContainsNotes, setDataContainsNotes] = useState([]);
  const [note, setNote] = useState('');

  let waveform = useRef();
  const containerWaveRef = useRef();

  const handleOpenDialogInput = () => {
    data.length > 1 &&
      data[position].hasOwnProperty('notewav') &&
      setNote(data[position].notewav);
    setOpenDialogInput(true);
  };

  const handleCloseDialogInput = () => {
    setOpenDialogInput(false);
  };

  const handleWriteNote = (value) => {
    setNote(value);
  };

  const handleSaveNote = () => {
    data[position].notewav = note;
    setData([...data]);
    setOpenDialogInput(false);
    setNote('');
  };

  const handleOpenDialogApply = () => {
    setOpenDialogApply(true);
  };

  const handleCloseDialogApply = () => {
    setOpenDialogApply(false);
  };

  const handleOpenDialogSave = () => {
    setOpenDialogSave(true);
  };

  const handleCloseDialogSave = () => {
    setOpenDialogSave(false);
  };

  const handleSaveExportToXlsx = () => {
    electron.filesApi.exportToCsv(data, filePath);

    setOpenDialogSave(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSelectFile = async () => {
    const result = await electron.filesApi.selectFile();

    const fullPath = await result.path;
    const dataPreload = await result.data;
    const file = await fullPath.replace(/^.*[\\\/]/, '');

    const storeIsExist = await electron.storeApi.getStore(fullPath);

    setFileName(file);
    setFilePath(fullPath);
    setData(dataPreload);

    setDataContainsNotes([]);
    setPosition(0);
    setPlaying(false);
    setNote('');
  };

  useEffect(() => {
    const listNote = data.filter(
      (item) => item.notewav !== '' && item.hasOwnProperty('notewav')
    );
    setDataContainsNotes(listNote);

    if (currentCount === '0') {
      return setCurrentCount('0');
    }
    const count = position + 1;
    setCurrentCount(count.toString());

    if (data.length > 0) {
      const dir = filePath.substring(0, filePath.lastIndexOf('/'));
      const audioDir = fileName.substring(0, fileName.lastIndexOf('.'));
      const audioPath = `${dir}/${audioDir}/${data[position].nama_audio}.wav`;
      console.log(audioPath);

      if (waveform.current !== undefined) {
        console.log((waveform.current.mediaContainer.innerHTML = ''));
      }
      waveform.current = WaveSurfer.create({
        waveColor: '#D9DCFF',
        progressColor: '#f48fb1',
        cursorColor: '#8c4f64',
        cursorWidth: 1,
        container: containerWaveRef.current,
        backend: 'WebAudio',
        barWidth: 3,
        barRadius: 3,
        barGap: 3,
        height: 160,
        responsive: true,
      });
      waveform.current.load(audioPath);
    }
  }, [position, data]);

  const handleNext = () => {
    if (currentCount === '0') {
      setPosition(0);
      return setCurrentCount('1');
    }

    if (currentCount === data.length.toString()) {
      setPosition(data.length - 1);
      return setCurrentCount(data.length.toString());
    }

    if (waveform.current !== undefined) {
      waveform.current.pause();
    }
    setPosition(position + 1);
  };

  const handlePrevious = () => {
    if (waveform.current !== undefined) {
      waveform.current.pause();
    }
    return setPosition(position - 1);
  };

  const handlePlay = () => {
    if (waveform.current !== undefined) {
      setPlaying(!playing);
      waveform.current.playPause();
    }
  };

  const handleChangePosition = (value, key = '') => {
    let count;
    if (key === 'Enter') {
      if (parseInt(value) > data.length) {
        setPosition(0);
        return setCurrentCount('0');
      }
      if (parseInt(value) < 0) {
        setPosition(0);
        return setCurrentCount('0');
      }
      if (value !== '') {
        count = parseInt(value);
        setPosition(count - 1);
      }
      if (value === '0') {
        setPosition(0);
      }

      if (waveform.current !== undefined) {
        waveform.current.pause();
      }
    }
    setCurrentCount(value);
  };

  const findIndexInNewData = (data = [], item) => {
    const foundIt = data.findIndex(
      (data) => data.nama_audio === item.nama_audio
    );
    return foundIt;
  };

  const handlePushNewData = async (newItem) => {
    const indexInNewData = findIndexInNewData(data, newItem);

    if (indexInNewData !== -1) {
      data[indexInNewData] = newItem;
    }
    electron.filesApi.modifyFileCsv(data, filePath);
    setOpenDialogApply(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleSelectFile={handleSelectFile}
      />
      {/* Drawer */}
      <SideBar
        open={open}
        handleDrawerClose={handleDrawerClose}
        count={dataContainsNotes.length > 0 ? dataContainsNotes.length : 0}
        note={dataContainsNotes.length > 0 ? dataContainsNotes : []}
        toggleTheme={onToggleTheme}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container direction="row-reverse" spacing={4}>
            <Grid item xs={12} md={4} lg={4}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper style={{ height: 'max-content', padding: 20 }}>
                  <DetailFile
                    path={filePath}
                    fileName={fileName}
                    count={data && data.length}
                    currentCount={currentCount}
                    nameWav={data.length > 1 && data[position].nama_audio}
                    handleChangePosition={handleChangePosition}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <WaveformContainer>
                    <Wave id="waveform" ref={containerWaveRef} />
                  </WaveformContainer>
                </Paper>
              </Grid>
              <Grid container justify="center" className={classes.paddingY}>
                <Grid item xs={3} md={3} lg={2} style={{ textAlign: 'center' }}>
                  <IconButton
                    aria-label="open folder"
                    color="inherit"
                    onClick={
                      position > 0 ? handlePrevious : () => setPosition(0)
                    }
                  >
                    <NavigateBeforeIcon fontSize="large" />
                  </IconButton>
                </Grid>
                <Grid item xs={3} md={3} lg={2} style={{ textAlign: 'center' }}>
                  <IconButton
                    aria-label="open folder"
                    color="inherit"
                    onClick={handlePlay}
                  >
                    <PlayArrowIcon fontSize="large" />
                    /
                    <PauseIcon fontSize="large" />
                  </IconButton>
                </Grid>
                <Grid item xs={3} md={3} lg={2} style={{ textAlign: 'center' }}>
                  <IconButton
                    aria-label="open folder"
                    color="inherit"
                    onClick={handleNext}
                  >
                    <NavigateNextIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <TextField
                    id="filled-multiline-static"
                    label="Transkrip"
                    multiline
                    rows={6}
                    placeholder="Some text"
                    color="primary"
                    variant="filled"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={
                      data.length > 1 ? data[position].teks_transcript : ''
                    }
                  />
                </Paper>
              </Grid>
              <Grid container justify="center">
                <Grid
                  item
                  xs={6}
                  sm={3}
                  md={3}
                  lg={3}
                  className={classes.paddingTop}
                >
                  <Button
                    className={classes.fixedWidthButton}
                    variant="contained"
                    onClick={handleOpenDialogInput}
                  >
                    Note
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={3}
                  md={3}
                  lg={3}
                  className={classes.paddingTop}
                >
                  <Button
                    className={classes.fixedWidthButton}
                    variant="contained"
                    onClick={handleOpenDialogApply}
                  >
                    Apply
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={3}
                  md={3}
                  lg={3}
                  className={classes.paddingTop}
                >
                  <Button
                    className={classes.fixedWidthButton}
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDialogSave}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
      <DialogInput
        title="Note"
        nameWav={data.length > 1 ? data[position].nama_audio : ''}
        open={openDialogInput}
        handleCloseDialog={handleCloseDialogInput}
        value={note}
        handleOnChange={handleWriteNote}
        handleOnSave={data.length > 1 ? handleSaveNote : handleCloseDialogInput}
      />
      <DialogConfirApply
        title="Confirmation"
        open={openDialogApply}
        handleOnClose={handleCloseDialogApply}
        handleOnOk={
          data.length > 1
            ? () => handlePushNewData(data[position])
            : handleCloseDialogApply
        }
        text="Apakah anda ingin menyimpan form validasi agar dapat dilanjutkan lain waktu ?"
      />

      <DialogConfirSave
        title="Confirmation"
        open={openDialogSave}
        handleOnClose={handleCloseDialogSave}
        handleOnOk={handleSaveExportToXlsx}
        text="Apakah anda proses validasi sudah selesai ?"
      />
    </div>
  );
}
