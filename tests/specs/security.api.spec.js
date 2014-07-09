describe('site', function() {
    var ptor = protractor.getInstance();

    beforeEach(function () {
        ptor = protractor.getInstance();

    });

    describe('security smoke screen', function(){
        it('should be configured correctly', function(){
            ptor.get('test.html');
            element(by.css('h1')).getText()
                .then(function(text){
                    expect(text).toEqual('test app');
                });
        })
    });
});