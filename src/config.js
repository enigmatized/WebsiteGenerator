// config-loader.js
// import config1 from './communities/community1.js';
import config2 from './configDropEverything.json';
import configDropEverything from './configDropEverything.json';

//TODO figure out a way to import with multiple cloudflares. Looks like command line arg should be used to to decide the config file

//const hostname = window.location.hostname;

//const config = hostname.includes('local') ? config2 : config1;
const config =  config2;
export default config;

