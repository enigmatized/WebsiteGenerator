import configDropEverything from './configDropEverything.json';
import configLivingMeditation from './configLivingMeditation.json';
import configLiarsAnonymous from './configLiarsAnonymous.json';

const community = import.meta.env.VITE_COMMUNITY;


let config;

switch (community) {
  case 'group1':
    config = configDropEverything;
    break;
  case 'group2':
    config = configLivingMeditation;
    break;
  case 'liar':
    config = configLiarsAnonymous;
    break;
  default:
    config = { home: '<h1>Error</h1>', about: '<h2>Error</h2>' };
}

export default config;

