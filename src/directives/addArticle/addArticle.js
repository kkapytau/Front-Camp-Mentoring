import template from './addArticle.html';
import './styles.scss'

export default function addArticle() {
    return {
        restrict: 'E',
        scope: {},
        controllerAs: "vm",
        controller: function($scope, ArticleService, $state){

            this.isUpdate = !!$state.params.article;
            this.article = $state.params.article;

            this.submitHandler = function (isValid) {
                if(!isValid){
                    return false;
                }

                (this.isUpdate) ? ArticleService.updateArticle(this.article) : ArticleService.addArticle(this.article);

                $state.go('articles.list');

            };

        },
        template
    };
}