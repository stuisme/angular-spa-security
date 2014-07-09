describe('site', function() {
    var ptor = protractor.getInstance();

    beforeEach(function () {
        ptor = protractor.getInstance();

    });

    describe('security.api', function(){
        it('should be configured correctly', function(){
            ptor.get('test.html');
        })

    });
});