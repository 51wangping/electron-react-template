const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev');
const path = require('path');
const { electron } = require('process');

function createWindow () {
  console.log('创建主窗口    ' );
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
//   if(isDev){
//     try {
//         require('electron-reloader')(module, {});
//     } catch (_) { }

// }
  isDev ?
  win.loadURL('http://localhost:9000')
  : win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

