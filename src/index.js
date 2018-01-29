import './promise-polyfill'
import { app } from './app'

// Enable progressive web app support (with offline-plugin)
if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}
// TODO: detect mobile
const onDeviceReady = () => {
  if(window.StatusBar) {
    // org.apache.cordova.statusbar required
    StatusBar.styleLightContent();
  }
};

document.addEventListener("deviceready", onDeviceReady, false);
app.$mount('#app');
