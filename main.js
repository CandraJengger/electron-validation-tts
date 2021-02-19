const path = require('path');
const xlsx = require('xlsx');
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  dialog,
} = require('electron');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    minWidth: 700,
    height: 700,
    minHeight: 700,
    backgroundColor: 'white',
    frame: true,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

ipcMain.on('notify', (_, message) => {
  console.log(message);
  new Notification({
    title: 'Notification',
    body: message,
  }).show();
});

ipcMain.on('select-file', async (e) => {
  const readExcel = (file) => {
    return new Promise((resolve, reject) => {
      const wb = xlsx.readFile(file);

      const ws = wb.Sheets['Sheet1'];

      const data = xlsx.utils.sheet_to_json(ws);

      resolve(data);
    });
  };

  const result = await dialog.showOpenDialog((fileNames) => {
    if (fileNames === undefined) {
      return 'No file selected';
    } else {
      return fileNames;
    }
  });

  readExcel(result.filePaths[0]).then((data) => {
    e.sender.send('select-file-reply', {
      path: result.filePaths[0],
      data,
    });
  });
});

app.whenReady().then(createWindow);
