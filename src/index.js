import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Noty from 'noty';
import './css/theme-noty.css';
import "../node_modules/noty/lib/noty.css";
import "animate.css"

Noty.setMaxVisible(3);
// alt.on('noty', (type, layout, message, time) => {
//     let types = ['information', 'error', 'success'];
//     let layouts = ['top', 'topLeft', 'topCenter', 'topRight', 'center', 'centerLeft', 'centerRight', 'bottom', 'bottomLeft', 'bottomCenter', 'bottomRight'];
//     let icons = ['<i class="information"></i>', '<i class="exclamation"></i>', '<i class="exclamation"></i>']
//     message = `<div class="text"><div class="icon">${icons[type]}</div><div class="message">${message}</div></div>`;
//     new Noty({
//         type: types[type],
//         layout: layouts[layout],
//         theme: 'dednet',
//         text: message,
//         timeout: time,
//         progressBar: true,
//         animation: {
//             open: 'animated fadeInLeft',
//             close: 'animated fadeOutLeft'
//         }
//     }).show();
// })

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (window.outerWidth > 1900)
    document.getElementsByTagName('body')[0].style.zoom = +(Math.sqrt(window.outerWidth**2 +window.outerHeight**2) / 2202.9071700822983).toFixed(3);
else
    document.getElementsByTagName('body')[0].style.zoom = 1;
window.onresize = () => {
    if (window.outerWidth > 1900)
        document.getElementsByTagName('body')[0].style.zoom = +(Math.sqrt(window.outerWidth**2 +window.outerHeight**2) / 2202.9071700822983).toFixed(3);
    else
        document.getElementsByTagName('body')[0].style.zoom = 1;
};
