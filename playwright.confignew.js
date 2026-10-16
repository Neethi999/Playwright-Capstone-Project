const { expect, chromium, devices } = require("@playwright/test");

const config=({
  testdir:'./test',
  retries:0,
  workers:2,
  fullyParallel: true,
  timeout:40*1000,
  expect:{
    timeout:5000,
  },
  reporter:'html',
  projects:[{

  name:'Sapharie',

  use:{
    browsername:'Webkit',
    headless:true,
    screenshot:'on',
    trace:'on'
  },
},
{
name:'chrome',
use:{
    browsername:'chromium',
    headless:false,
    //viewport:{width:720,height:720},
   // ...devices['iPhone 11'],
    ignoreHttpserror:true,
    Permissions:['geolocation'],
    screenshot:'on',
    trace:'on',
    //trace: 'retain-on-failure',
    //video:'retain-on-failure',
    video:'on',
    launchOptions: {
            slowMo: 1000
        }
  },
}
]
})
module.exports=config;