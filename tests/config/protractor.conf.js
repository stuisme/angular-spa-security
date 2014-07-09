exports.config = {
    // Do not start a Selenium Standalone sever - only run this using chrome.
    chromeOnly: false,

    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [{
        'browserName': 'firefox',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER
    },{
        'browserName': 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER
    }],
    specs: ['../specs/**/*.js'],
    baseUrl: 'http://localhost:9000/site/',
    sauceUser: 'seaves',
    sauceKey: 'b86fb77e-06b6-4df0-9865-022bd492b167',
    jasmineNodeOpts: {
        showColors: true
    },
    framework: 'jasmine'
};