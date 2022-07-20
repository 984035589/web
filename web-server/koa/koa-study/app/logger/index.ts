import { configure, getLogger } from 'log4js';
import config from '../config';

configure(config.log);

export const accessLogger = getLogger('access');
export const dbLogger = getLogger('db');
export default getLogger();
