const AWS = require('aws-sdk');
const fs = require('fs');

const uploadFile = async file => {
  return new Promise((resolve, reject) => {
    AWS.config.update({
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      region: process.env.REGION
    });

    const s3 = new AWS.S3({
      apiVersion: '2006-03-01'
    });

    const stream = fs.createReadStream(file.path);
    stream.on('error', function (err) {
      reject(err);
    });

    s3.upload(
      {
        ACL: 'public-read',
        Bucket: 'portfolio-const-bucket',
        Body: stream,
        Key: file.name,
        ContentType: file.type
      },
      function (err, data) {
        if (err) {
          console.log('an error caught: ', err);
          reject(err);
        } else if (data) {
          console.log('got data: ', data);
          resolve({ key: data.Key, url: data.Location });
        }
      }
    );
  });
};

module.exports = { uploadFile };
