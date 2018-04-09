import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import { ArticleItemComponent } from './article-item/article-item.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ArticlesContainerComponent } from './articles-container/articles-container.component';

export const articleComponents = angular
    .module("articleListApp.components", [uiRouter])
    .component('articleItem', ArticleItemComponent)
    .component('articleList', ArticleListComponent)
    .component('pagination', PaginationComponent)
    .component('articlesContainer', ArticlesContainerComponent)
    .name;