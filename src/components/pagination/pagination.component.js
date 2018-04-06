import template from './template.html';
import { FIRST_PAGE } from '../../constants/constants';
import './styles.scss'

export const PaginationComponent = {
    bindings: {
        maxNumber: '<',
        nextChunk: '&'
    },
    template,
    controller: class Pagination {
        constructor() {

        }
        $onInit() {
            this.currentIndex = FIRST_PAGE;
        }
        previousPage(){
            if((this.currentIndex - 1) >= 0) {
                this.currentIndex--;
            }
            this.nextChunk({index:this.currentIndex});
        }
        nextPage(){
            if((this.currentIndex + 1) < this.lastIndex) {
                this.currentIndex++;
            }
            this.nextChunk({index:this.currentIndex});
        }
        getPages(number){
            let arr = [];
            for(let i=0; i< number; i++){
                arr.push(i);
            }
            return arr;
        }
        jumpToPage(index){
            this.currentIndex = index;
            this.nextChunk({index: this.currentIndex});
        }

        $onChanges(changes) {
            this.lastIndex = changes.maxNumber.currentValue;
            this.pages = this.getPages(this.lastIndex);
        }
    }
};