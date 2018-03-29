import template from './template.html';
import { FIRST_PAGE } from '../../constants/constants';

export const ArticlesContainerComponent = {
    template,
    controller: class ArticlesContainer {
        constructor(ArticleService) {
            'ngInject';
            this.articleService = ArticleService;
        }
        $onInit() {
            //this.updatedArticle = {title:"ZZZZ"}
            //console.log("controller1")
            //this.articles = [];
            //this.pages = this.articleService.getPaginationCount();//4;
            this.articleService.getArticles(FIRST_PAGE).then(response => {
                this.articles = response;/*console.log("controller2")*/
                this.pages = this.articleService.getPaginationCount();
                //console.log(this.pages)
            });
            //console.log("controller3")
            /*if(!this.articles){
                this.articles = this.articleService.getStaticArticles();
            }

            if(!this.articles.length) {
                this.articleService.getArticles().then(response => this.articles = response);
            }*/
        }
        checkArticle(){
            //this.articles.push(article);
            //console.log(this.articles)
        }
        nextChunk(index){
            this.articleService.getArticles(index).then(response => this.articles = response);
        }
        addArticle(article){
            this.articleService.addArticle(article);
        }
        $onChanges(changes) {
            //console.log("ZZZZ111")
            //console.log(changes)
        }
        /*$doCheck(){
            console.log("odcheck")
        }*/
        setUpdatedArticle(article){
            console.log(article)
            this.updatedArticle = article;
        }
    }
};