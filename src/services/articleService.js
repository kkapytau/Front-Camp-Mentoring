import { MAX_CHUNK } from '../constants/constants';
import uuidV4 from 'uuid/v4';

export class ArticleService {
    constructor($resource) {
        'ngInject';
        this.resource = $resource;
    }
    getAllArticles() {
        return this.resource('http://localhost:4000/json').query().$promise.then(articles => {
            this.articleList = articles;
            return articles;
        });
    }
    getChunkArticles(from){
        let chunkArr = [];
        const to = from * MAX_CHUNK + MAX_CHUNK;
        for (let i = from * MAX_CHUNK; i < to && this.articleList.length > i; i++) {
            chunkArr.push(this.articleList[i]);
        }
        return chunkArr;
    }
    getArticles(from){
       return this.getAllArticles().then(results => {
            return this.getChunkArticles(from);
        });
    }
    addArticle(article){
        article.id = uuidV4();
        this.articleList.push(article);
    }
    updateArticle(article){
        const index = this.getArticleIndexById(article.id);
        this.articleList[index] = Object.assign(this.articleList[index], article);
    }
    getPaginationCount(){
        return Math.ceil(this.articleList.length/MAX_CHUNK);
    }
    getArticleIndexById = function(id){
        return this.articleList.findIndex(article => article.id == id);
    }
    getStaticArticles(){
        return this.articleList;
    }
}
