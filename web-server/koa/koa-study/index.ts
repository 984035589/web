import run from './app';
import config from './app/config';

console.log(config);

run(parseInt(config.server.port as string));
