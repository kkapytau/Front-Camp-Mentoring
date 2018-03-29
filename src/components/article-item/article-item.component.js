import template from './template.html';

export const ArticleItemComponent = {
    bindings: {
        article: '<'
    },
    template,
    controller: class ArticleItem {
        constructor() {

        }
        $onChanges(changes) {
            if (changes.article) {
                this.article = Object.assign({}, this.article);
            }
        }
    }
};