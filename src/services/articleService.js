import { MAX_CHUNK } from '../constants/constants';

export class ArticleService {
    constructor($resource, $q) {
        'ngInject';
        this.resource = $resource;
        this.$q = $q;
        this.articleList = [{"title":"art1", "description":"desr1"}];
    }
    getAllArticles() {
        if(!this.articleList.length) {
            let test1= this.resource('http://localhost:4000/json').query().$promise.then(article => {
                this.articleList = article;
                //console.log(articleList);
                return article;
            });
            //console.log("QQQQQQQ")
            //console.log(test1)
            return test1/*this.resource('http://localhost:4000/json').query().$promise.then(article => {
                this.articleList = article;
                //console.log(articleList);
                return article;
            });*/
        }
        //console.log(this.$q)
        //console.log(articleList)
        let test = this.$q.resolve(this.articleList);
        //console.log("ZZZZZZ")
        //console.log(test)
        return Promise.resolve(this.articleList);
    }
    getChunkArticles(from){
        let chunkArr = [];
        const to = from * MAX_CHUNK + MAX_CHUNK;
        //console.log(to + " "+(from * MAX_CHUNK) +" "+ this.articleList.length)
        for (let i = from * MAX_CHUNK; i < to && this.articleList.length > i; i++) {
            chunkArr.push(this.articleList[i]);
        }
        //console.log(chunkArr)
        return chunkArr;
        //return this.articleList
    }
    getArticles(from){
       return this.getAllArticles().then(results => {
            //console.log("AAA")
            //console.log(results)
            return this.getChunkArticles(from);
        });
    }
    addArticle(article){
        this.articleList.push(article);
    }
    getPaginationCount(){
        return Math.ceil(this.articleList.length/MAX_CHUNK);
    }
}
