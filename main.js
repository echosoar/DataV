const electron = require('electron')

const path = require('path')
const url = require('url')

let { app, BrowserWindow } = electron;


let d3kabWin = null;



function createWindow () {
	let screenDisplayBounds = electron.screen.getPrimaryDisplay().bounds;
	

	d3kabWin = new BrowserWindow({x: 0, y: 0, width: screenDisplayBounds.width, height: screenDisplayBounds.height, transparent: true, frame: false, resizable: false});
	
	d3kabWin.setFullScreen(true);
	
	d3kabWin.loadURL(url.format({
	pathname: path.join(__dirname, 'd3kab.html'),
	protocol: 'file:',
	slashes: true
	}))

	// Open the DevTools.
	//d3kabWin.webContents.openDevTools()

	d3kabWin.on('closed', function () {
	d3kabWin = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (d3kabWin === null) {
    createWindow()
  }
})