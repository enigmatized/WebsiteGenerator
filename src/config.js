// config-loader.js
// import config1 from './communities/community1.js';
import config2 from './configDropEverything.json';
import configDropEverything from './configDropEverything.json';

const hostname = window.location.hostname;

const config = hostname.includes('local') ? config2 : config1;
export default config;

