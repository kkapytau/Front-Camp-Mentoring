import template from './template.html';

export const ArticleItemComponent = {
    bindings: {
        article: '<'
    },
    template,
    controller: class ArticleItem {
        constructor($state) {
            this.state = $state;
        }
        updateArticleHandler(){
            this.state.go("articles.update", {article: this.article});
        }
    }
};