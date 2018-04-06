function minLengthValidator() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: ($scope, $element, $attr, ngModel) => {
            const minimalLength = parseInt($attr.minimalLength, 10);
            const validator = (text) => {
                if(text){
                    return !(text.length < minimalLength);
                }
            };
            ngModel.$validators['minimal-length'] = validator;

        }
    };
}

export default minLengthValidator;