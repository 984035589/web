import run from './app';
import config from './app/config';

run(parseInt(config.server.port as string));
