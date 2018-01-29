import Vue from 'vue'
// Import F7
// Import Framework7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import Framework7 Vue
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Style
import Framework7CSS from '!!style-loader!css-loader?modules=false!framework7/dist/css/framework7.css'

// Import F7 iOS Theme Styles
import Framework7Theme from '!!style-loader!css-loader?modules=false!framework7/dist/css/framework7.ios.min.css'

import '!!style-loader!css-loader?modules=false!material-design-icons/iconfont/material-icons.css'

import App from './modules/app'
import routes from "./routes"
import perms from './modules/permissions-manager'

Vue.use(Framework7Vue, Framework7);

let theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

Vue.prototype.$perms = perms;

const app = new Vue({
    framework7: {
        root: '#app',
        tapHold: true,
        disableContextMenu: true,
        touch: {
            tapHold: true,
        },
        tapHoldDelay: 500,
        /* Uncomment to enable Material theme: */
        // material: true,
        routes,
        theme: 'ios'
    },
    ...App
})

export { app, router }
