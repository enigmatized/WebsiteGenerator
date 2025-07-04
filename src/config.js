// config-loader.js
// import config1 from './communities/community1.js';
import configDropEverything2 from './configDropEverything.json';
import configDropEverything from './configDropEverything.json';

//TODO figure out a way to import with multiple cloudflares. Looks like command line arg should be used to to decide the config file

//const hostname = window.location.hostname;


const community = import.meta.env.VITE_COMMUNITY;

//const config = hostname.includes('local') ? config2 : config1;
//const config =  config2;

let config;

switch (community) {
  case 'group1':
    config = configDropEverything;
    break;
  case 'group2':
    config = configDropEverything;
    break;
  default:
    config = { home: '<h1>Error</h1>', about: '<h2>Error</h2>' };
}

export default config;

