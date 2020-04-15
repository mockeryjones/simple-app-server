import server from './server.js';
import logger from './util/logger';


let app = server.listen(8088, () => {
  logger.log({level: 'info', 'message': 'simple express server started on 8088'});
});