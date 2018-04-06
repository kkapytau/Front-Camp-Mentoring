import { articleComponents } from '../index';

function findIn(element, selector) {
    return angular.element(element[0].querySelector(selector));
}

describe('Component: Pagination', function () {
    beforeEach(angular.mock.module(articleComponents));

    let element, scope;
    beforeEach(inject(($rootScope, $compile) =>{
        scope = $rootScope.$new();
        element = angular.element('<pagination max-number="pages" next-chunk="nextChunk(index)"></pagination>');
        element = $compile(element)(scope);
        scope.pages = 5;
        scope.nextChunk = jest.fn();
        scope.$digest();
    }));

    it('should be inited with 5 pages', function() {
        expect(findIn(element, "#previous-article a").text()).toBe("Previous");
        expect(angular.element(angular.element(element[0].querySelectorAll('a.page-link'))[5]).text()).toBe("5");
    });
    it('should jump to the defined index', function() {
        let thirdPage = angular.element(element[0].querySelectorAll('a.page-link'))[3];
        thirdPage.click();
        expect(scope.nextChunk).toHaveBeenCalled();
        findIn(element, "#previous-article a")[0].click();
        expect(scope.nextChunk).toHaveBeenCalled();
        findIn(element, "#next-article a")[0].click();
        expect(scope.nextChunk).toHaveBeenCalled();
    });

});