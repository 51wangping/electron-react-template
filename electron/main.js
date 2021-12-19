const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev');
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  console.log(process.env.ELECTRON_IS_DEV);
  isDev ?
  win.loadURL('http://localhost:9000')
  : win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
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

