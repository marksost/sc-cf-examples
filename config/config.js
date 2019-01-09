const config = {
  application: {
    name: process.env.CFT_NAME || 'Cloud-Functions-Test',
  },

  kms: {
    projectId: process.env.CFT_KMS_PROJECT_ID || 'marks-playground-new',
    location: process.env.CFT_KMS_LOCATION || 'us-east1',
    keyringName: process.env.CFT_KMS_KEYRING_NAME || 'ms-test',
    keyringKeyName: process.env.CFT_KMS_KEYRING_KEY_NAME || 'ms-test-key',
  },

  log: {
    level: process.env.CFT_LOG_LEVEL || 'info',
  },

  example: {
    test: process.env.CFT_TEST || '',
  },
};

module.exports = config;
