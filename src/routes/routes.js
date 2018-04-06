import { FIRST_PAGE } from '../constants/constants';
function appConfig($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('articles', {
            abstract: true,
            url: '/',
            component: 'app',
            resolve: {
                articles: ArticleService => ArticleService.getArticles(FIRST_PAGE)
            }
        })
        .state('articles.list', {
            url: '',
            component: 'articlesContainer'
        })
        .state('articles.add', {
            url: 'add-article',
            component: 'addArticle'
        })
        .state('articles.update', {
            url: 'update-article',
            component: 'addArticle',
            params: {
                article: null
            }
        });
    $urlRouterProvider.otherwise("/");
}

export default appConfig;