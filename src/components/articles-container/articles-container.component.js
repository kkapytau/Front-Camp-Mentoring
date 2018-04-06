import template from './template.html';
import './styles.scss'

export const ArticlesContainerComponent = {
    template,
    bindings:{
        articles: '<'
    },
    controller: class ArticlesContainer {
        constructor(ArticleService) {
            'ngInject';
            this.articleService = ArticleService;
        }
        $onInit() {
            this.allArticles = this.articleService.getStaticArticles();
            this.pages = this.articleService.getPaginationCount();
        }
        nextChunk(index){
            this.articles = this.articleService.getChunkArticles(index);
        }
    }
};