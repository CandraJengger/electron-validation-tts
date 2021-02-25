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
    exportToCsv(newData, path) {
      const obj = {
        newData,
        path,
      };
      ipc.send('export-file', obj);
    },
    modifyFileCsv(newData, path) {
      const obj = {
        newData,
        path,
      };
      ipc.send('modify-file', obj);
    },
  },
  storeApi: {
    setStore(key, data) {
      const obj = {
        path: key,
        data,
      };
      ipc.send('set-store', obj);
    },
    getStore(key) {
      ipc.send('get-store', key);

      return new Promise((resolve, reject) => {
        ipc.on('get-store-reply', (e, res) => {
          resolve(res);
        });
      });
    },
    deleteStore(key) {
      ipc.send('delete-store', key);
    },
  },
});
