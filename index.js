const config = require('./config/config');
const KMS = require('./utils/kms');
const logger = require('./utils/logger');

exports.helloGET = async (req, res) => {
  try {
    const [result] = await KMS.decryptSecret(config.example.test);

    logger.info('Result:').info(result);

    const body = `This is a KMS test.
Encrypted value for environment variable 'process.env.CFT_TEST': ${config.example.test}
Plaintext value for environment variable 'process.env.CFT_TEST': ${result.plaintext}`;

    res.send(body);
  }catch(err) {
    logger.error('Error decrpyting:').error(err);

    res.send(`There was an error decrypting KMS key: ${err}`);
  }
};
