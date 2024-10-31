// @ts-check
const { devices, expect } = require('@playwright/test');
const { TIMEOUT } = require('dns');
const config ={
  testDir: './tests',
  /* Maximum time one test can run for.*/
  Timeout: 30 * 1000,
  expect: {
    Timeout: 5000
  },
  
 
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: false
  },


};

module.exports = config;

