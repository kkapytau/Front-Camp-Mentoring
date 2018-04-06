import { articleComponents } from '../index';

describe('Component: Article Item', function () {
    beforeEach(angular.mock.module(articleComponents));

    let controller;
    let $state;
    const mockArticle = {"title":"art5", "description":"desr5", "id":4};

    beforeEach(inject(($componentController, _$state_) => {
        $state = _$state_;
        controller = $componentController('articleItem',
            {$scope: {}, $state: $state},
            {article: mockArticle}
        );
    }));

    it('Controller', function() {
        $state.go = jest.fn();
        controller.updateArticleHandler();
        expect($state.go).toHaveBeenCalledWith("articles.update", {article: mockArticle});
    });


});