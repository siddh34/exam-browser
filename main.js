const { app, BrowserWindow, ipcMain, screen } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');

let mainWindow;


function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'NoCheat',
        width: 1500,
        height: 800,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, './preload.js'),
        },
    });
    mainWindow.maximize()

    mainWindow.webContents.openDevTools();

    const startUrl = url.format({
        pathname: path.join(__dirname, './app/build/index.html'),
        protocol: 'file',
    });

    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.loadURL(startUrl);
}

ipcMain.on('open-url-fullscreen', (event, url) => {
    const fullscreenWindow = new BrowserWindow({

        alwaysOnTop: true,
        resizable: false,
        minimizable: false,
        fullscreen: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    fullscreenWindow.setContentProtection(true) // prevent screen capture
    fullscreenWindow.maximize()


    // fullscreenWindow.webContents.openDevTools();

    // Disable context menu 
    fullscreenWindow.webContents.on('context-menu', (event) => {
        event.preventDefault();
    });

    // Prevent new tabs or windows
    fullscreenWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
    });

    // Disable keyboard shortcuts
    fullscreenWindow.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'Tab' || (input.ctrl)) {
            event.preventDefault();
        }
    });



    // Remove default window controls
    fullscreenWindow.removeMenu();

    fullscreenWindow.webContents.on('did-finish-load', () => {
        fullscreenWindow.webContents.executeJavaScript(`
        const closeButton = document.createElement('div');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&#10006;'; // Unicode for '×' character
        closeButton.style.display = 'flex'; // Set display to flex
        closeButton.style.justifyContent = 'center'; // Center content horizontally
        closeButton.style.alignItems = 'center'; // Center content vertically
        closeButton.style.position = 'fixed';
        closeButton.style.height = '30px'; // Set height to 40px
        closeButton.style.width = '30px'; // Set width to 40px
        closeButton.style.top = '0px';
        closeButton.style.right = '0px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = '9999'; // Ensure the button is above other elements
        closeButton.style.backgroundColor = '#000000';
        closeButton.style.color = '#ffffff';
        closeButton.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)'; // Add shadow
        

        const handleMouseEnter = () => {
            closeButton.style.backgroundColor = '#FF0000'; // Change background color on hover
        };

        const handleMouseLeave = () => {
            closeButton.style.backgroundColor = '#000000'; // Revert back to original background color
        };

        closeButton.addEventListener('mouseenter', handleMouseEnter);
        closeButton.addEventListener('mouseleave', handleMouseLeave);
            
        closeButton.addEventListener('click', () => {
            window.close();
        });
        document.body.appendChild(closeButton);
        `);
    });


    fullscreenWindow.loadURL(url);

    // console.log("hello"+url);
});

app.whenReady().then(createMainWindow);
