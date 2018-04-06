import template from './addArticle.html';
import './styles.scss'

export default function addArticle() {
    return {
        restrict: 'E',
        scope: {},
        controller: function($scope, ArticleService, $state){

            $scope.isUpdate = !!$state.params.article;
            $scope.article = $state.params.article;

            $scope.submitHandler = function (isValid) {
                if(!isValid){
                    return false;
                }

                ($scope.isUpdate) ? ArticleService.updateArticle($scope.article) : ArticleService.addArticle($scope.article);

                $state.go('articles.list');

            };

        },
        template
    };
}