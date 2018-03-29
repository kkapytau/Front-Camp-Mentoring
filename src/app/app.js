import angular from 'angular';
import ngResource from 'angular-resource';

import { AppComponent } from './app.component';
import { ArticleService } from '../services/ArticleService';
//import { ArticleListComponent } from '../components/article-list/article-list.component';
import { articleComponents } from '../components/index';
import addArticle from '../directives/addArticle/addArticle';
import minLengthValidator from '../directives/min-length-checker/minLength';

import './styles.scss';

export const AppModule = angular
    .module('articleListApp', [
        ngResource,
        //AppServices,
        articleComponents])
    .service('ArticleService', ArticleService)
    .component('app', AppComponent)
    .directive('addArticle', addArticle)
    .directive('minimalLength', minLengthValidator)
    //.component('articleList', ArticleListComponent)
    .name;