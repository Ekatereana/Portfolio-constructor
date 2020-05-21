const AWS = require('aws-sdk');
const fs = require('fs');

const uploadFile = async ({ fileName, filePath, fileType }) => {
  return new Promise((resolve, reject) => {
    const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
    AWS.config.credentials = credentials;

    const s3 = new AWS.S3({
      apiVersion: '2006-03-01'
    });

    const stream = fs.createReadStream(filePath);
    stream.on('error', function (err) {
      reject(err);
    });

    s3.upload(
      {
        ACL: 'public-read',
        Bucket: 'portfolio-const-bucket',
        Body: stream,
        Key: fileName,
        ContentType: fileType
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else if (data) {
          resolve({ key: data.Key, url: data.Location });
        }
      }
    );
  });
};

module.exports = { uploadFile };
