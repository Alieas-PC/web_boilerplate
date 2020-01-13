const koaBody = require('koa-body');

const FormData = require('form-data');

const fs = require('fs');

const { gateway } = require('../../config');

const requester = require('common/dist/server/request');

module.exports = serverName => {
  const url = gateway.fileUploadServers[serverName];

  return [
    koaBody({ multipart: true, formidable: { keepExtensions: true } }),
    async (ctx, next) => {
      ctx.logger.info('Upload file to', serverName, `, url:${url}`);

      ctx.permanentUrls = {};

      // 如果有上传文件，则将文件设置为对应字段
      if (ctx.request.files) {
        try {
          // eslint-disable-next-line guard-for-in,no-restricted-syntax
          for (const fileKey in ctx.request.files) {
            const file = ctx.request.files[fileKey];

            const postData = new FormData();

            postData.append('file', fs.createReadStream(file.path));

            postData.append('name', file.name);

            ctx.logger.info('File uploading begins.');

            // eslint-disable-next-line no-await-in-loop
            const { data, responseCode } = await requester.post(url, postData);

            ctx.logger.info('Response data =>', data);

            ctx.logger.info('file uploading ends.');

            if (responseCode) {
              throw new Error(`Response code not zero but ${responseCode}`);
            }

            ctx.permanentUrls[fileKey] = data;
          }
        } catch (e) {
          ctx.logger.warn('Failed to upload file', e.stack);
        }
      }

      return next();
    }
  ];
};
