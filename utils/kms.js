const kms = require('@google-cloud/kms');

const config = require('../config/config');

// Form KMS client
// NOTE: Uses application credentials from the Cloud Function environment
const client = new kms.KeyManagementServiceClient();

// Form crypto key path
const cryptoKeyPath = client.cryptoKeyPath(config.kms.projectId, config.kms.location, config.kms.keyringName, config.kms.keyringKeyName);

/**
 * Utility to handle interracting with KMS for environment variable
 * and other types of application secrets
 */
class KMS {
  /**
   * attempts to decrpyt a secret from KMS based on input and
   * application configuration
   *
   * @param  {String} text     The encrypted text to be decrypted
   *
   * @return {Promise}         Returns a promise the resolves with the plaintext
   *                           value of the secret or rejects with an error if the
   *                           secret cannot be decrypted
   */
  static decryptSecret(text = '') {
    return client.decrypt({
      name: cryptoKeyPath,
      ciphertext: text,
    });
  }
}

module.exports = KMS;
