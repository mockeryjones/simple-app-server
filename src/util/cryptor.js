import crypto from'crypto';
import logger from './logger';

const algo = 'aes-256-cbc';
const keyword  = "AlibabaAndThe40Theives";
const key = crypto.scryptSync(keyword, 'salt', 24)
const iv = crypto.randomBytes(16);

var cryptor = function()  {

  return {
    encrypt: (text) => {
      let hash = crypto.createHmac('sha256', keyword).update(text).digest('hex');
      return hash;
    }
  }

};

export default cryptor;
