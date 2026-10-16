const { expect, chromium } = require("@playwright/test");// This is a import

const config=({
  testdir:'./tests',
  fullyParallel: true,
  timeout:60*1000,
  expect:{
    timeout:5000,
  },
  reporter:'html',
  use:{
    browsername:'chromium', //runs only in chrome
    headless:false, //opens browser and runs
  },
})
module.exports=config;
