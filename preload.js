const { ipcRenderer: ipc, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      console.log(message);
      ipc.send('notify', message);
    },
  },
  batteryApi: {},
  filesApi: {
    selectFile() {
      ipc.send('select-file');

      return new Promise((resolve, reject) => {
        ipc.on('select-file-reply', (e, res) => {
          resolve(res);
        });
      });
    },
    exportToXlsx(newData, path) {
      const data = {
        newData,
        path,
      };
      ipc.send('export-file', data);
    },
  },
});
