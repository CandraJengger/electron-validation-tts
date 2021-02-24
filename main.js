const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const Store = require('electron-store');
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  dialog,
} = require('electron');

const store = new Store();
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    minWidth: 800,
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
  const readCsv = (file) => {
    const parseCsv = [];
    let results = '';
    return new Promise((resolve, reject) => {
      fs.createReadStream(file)
        .pipe(
          csv({
            separator: '\n',
            mapHeaders: () => 0,
          })
        )
        .on('data', (row) => {
          parseCsv.push(row[0]);
          results = parseCsv.map((item) => ({
            nama_audio: item.substring(0, 12),
            teks_transcript: item
              .substring(13, item.lastIndexOf('.') + 1)
              .replace('"', ''),
          }));
        })
        .on('end', () => {
          console.log(results);
          resolve(results);
        });
    });
  };

  const result = await dialog.showOpenDialog((fileNames) => {
    if (fileNames === undefined) {
      return 'No file selected';
    } else {
      return fileNames;
    }
  });

  readCsv(result.filePaths[0]).then((data) => {
    e.sender.send('select-file-reply', {
      path: result.filePaths[0],
      data,
    });
  });
});

ipcMain.on('export-file', (_, { newData, path }) => {
  const dir = path.substring(0, path.lastIndexOf('/'));
  const fileContainFormat = path.replace(/^.*[\\\/]/, '');
  const file = fileContainFormat.substring(
    0,
    fileContainFormat.lastIndexOf('.')
  );

  const ws = xlsx.utils.json_to_sheet(newData);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet 1');

  xlsx.writeFile(wb, `${dir}/${file}-VALID.xlsx`);
});

ipcMain.on('set-store', (_, { path, data }) => {
  store.set(path, data);
});

ipcMain.on('get-store', (e, key) => {
  e.sender.send('get-store-reply', store.get(key));
});

ipcMain.on('delete-store', (e, key) => {
  store.delete(key);
});

app.whenReady().then(createWindow);
