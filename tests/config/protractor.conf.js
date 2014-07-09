exports.config = {
    // Do not start a Selenium Standalone sever - only run this using chrome.
    chromeOnly: false,

    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [{
        'browserName': 'firefox'
    }, {
        'browserName': 'chrome'
    }],
    specs: ['../specs/**/*.js'],
    baseUrl: 'http://localhost:9001/site/',
    sauceUser: 'seaves',
    sauceKey: 'b86fb77e-06b6-4df0-9865-022bd492b167',
    jasmineNodeOpts: {
        showColors: true
    },
    framework: 'jasmine'
};