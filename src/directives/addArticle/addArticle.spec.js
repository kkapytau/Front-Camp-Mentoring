import { AppModule } from '../../app/app';

describe('Directive: AddArticle', function () {
    beforeEach(angular.mock.module(AppModule));

    let element, scope;
    let $state, controller;
    beforeEach(inject(($rootScope, $compile, _$state_, $httpBackend,$componentController) =>{
        $state = _$state_;
        scope = $rootScope.$new();
        element = angular.element('<add-article></add-article>');
        element = $compile(element)(scope);
        element.isolateScope().submitHandler = jest.fn();
        //scope.submitHandler = jest.fn();
        // mock request to the server for list of articles
        $httpBackend.whenGET('http://localhost:4000/json').respond([
            {"title":"art1", "description":"desr1", "id":0},
            {"title":"art2", "description":"desr2", "id":1},
            {"title":"art3", "description":"desr3", "id":2},
            {"title":"art4", "description":"desr4", "id":3}]);
        scope.$digest();
        /*controller = $componentController('addArticle',
            {$scope: {}, ArticleService: jest.fn(), $state: $state}
        );*/
    }));

    it('should be inited with zero state', function() {
        expect(element.find('input')[0].value).toBe("");
        expect(element.find('textarea')[0].value).toBe("");
    });

    it("shouldn't add article due to restrictions", function() {
        const saveButton = angular.element(element[0].querySelectorAll('.btn-success'))[0];
        saveButton.click();
        expect(element.isolateScope().submitHandler).toHaveBeenCalledWith(false);
    });
    it('should add new article', function() {
        element.isolateScope().article = {"title":"art2", "description":"desr2", "id":1};
        scope.$digest();
        const saveButton = angular.element(element[0].querySelectorAll('.btn-success'))[0];
        saveButton.click();
        expect(element.isolateScope().submitHandler).toHaveBeenCalledWith(true);
    });

});