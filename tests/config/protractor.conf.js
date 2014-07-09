exports.config = {
    // Do not start a Selenium Standalone sever - only run this using chrome.
    chromeOnly: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },
    specs: ['../specs/**/*.js'],
    baseUrl: 'http://localhost:9001/site/',

    jasmineNodeOpts: {
        showColors: true
    },
    framework: 'jasmine'
};