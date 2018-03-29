import template from './addArticle.html';
import './styles.scss'

export default function addArticle() {
    return {
        restrict: 'E',
        scope: {
            add: '&addArticle',
            article: '<'
        },
        controller: function($scope){
console.log($scope.article)
            if($scope.article)
                $scope.newArticleTitle = $scope.article.title;
            $scope.submitHandler = function (isValid) {
                if(!isValid){
                    return false;
                }
                let article = {
                    title: $scope.newArticleTitle,
                    description: $scope.newArticleDescription
                };
                // in the parent function we have to set object with the same name as from directive
                // e.g. addArticle(article) => add({article:{some data}})
                $scope.add({article});

                $scope.newArticleTitle = "";
                $scope.newArticleDescription = "";

            };

        },
        template
    };
}