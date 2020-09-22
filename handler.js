'use strict';

// module.exports.hello = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

// 1. ここは本番と差し替える感じ？
// const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer');

module.exports.hello = async (event, context, callback) => {
  let result = null;
  let browser = null;

  try {
    browser = await puppeteer.launch({
      // 2. ここも本番と差し替える感じ？
      // args: chromium.args,
      // defaultViewport: chromium.defaultViewport,
      // executablePath: await chromium.executablePath,
      // headless: chromium.headless,
      // ignoreHTTPSErrors: true,
    });

    let page = await browser.newPage();

    await page.goto(event.url || 'https://example.com');

    result = await page.title();
  } catch (error) {
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return callback(null, result);
};
