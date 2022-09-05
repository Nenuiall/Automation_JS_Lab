## Test automation framework for EPAM AT Lab (2022CW12 JS AY-VR Team)

### Description

Test automation framework based on webdriverIO for the e-shop: **[https://awesome-shop.ru](https://awesome-shop.ru)**

### Tech Stack

| Name           | Version       | Description                                                          |
| -------------- |:-------------:|--------------------------------------------------------------------  |
| Node.js        | 16.15.0       |Open-source, cross-platform, back-end JavaScript runtime environment  |
| Webdriver.IO   | 7.20          |Browser and mobile automation test framework for Node.js              |
| Faker          | 7.3.0         |Library that generates fake (but reasonable) data                     |
| Allure-reporter| 7.20.3        |WebdriverIO reporter plugin to create Allure Test Reports             |
| Mocha          | 7.20.3        |Mocha is a feature-rich JavaScript test framework running on Node.js  |
| eslint         | 8.19.0        |Project that helps you find and fix problems with your JavaScript code|
| Chai           | 4.3.6         |BDD / TDD assertion library for node and the browser                  |

### Recommended requirements
  * [GIT](https://git-scm.com/downloads) version 2.4 
  * [Node.js](https://nodejs.org/en/download/) version 16.15.0
  * [VS Code](https://code.visualstudio.com/download) or [WebStorm](https://www.jetbrains.com/webstorm/download/#section=windows) at least version
 
### Installation
 * Clone [repository](https://git.epam.com/Aliaksandr_Yeutushkou/at-lab-2022cw12-js-ay-vr-team/)
 * Install dependencies with **npm i**


### CLI

```
- npm run eslint                check and fix problems with your code style
- npm run wdio                  run all tests
- npm run wdio -- --cimode      run all tests with chrome options:[
                                                          '--disable-infobars',
                                                          '--headless',
                                                          '--disable-gpu',
                                                          '--window-size=1920,1080',
                                                          '--no-sandbox']

```

### Contributors
1. **Mentors:**
 * Aliaksandr Yeutushkou
 * Viachaslau Rouski
2. **Test Automation Engineers:**
 * Ivan Shadrin
 * Jasurbek Erkinov
 * Marharita Dubanevich

