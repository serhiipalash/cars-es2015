var CarsModule = require('../app');

CarsModule.directive('activeTheme', function () {
    return {
        restrict: 'A',
        replace: false,
        link: function (scope, elem, attrs) {
            var themeList = ['cerulean', 'lumen', 'slate', 'standstone'],
                themeLink = document.getElementById('theme_link');

            themeLink.href = '/vendor/' + themeList[0] + '-theme.min.css';

            (function() {
                for (var i = 0, l = themeList.length; i < l; i++) {
                    elem.append(angular.element('<li>').append(angular.element('<a>').text(themeList[i])));
                }
            }());

            var themeBtns = elem.find('a');

            themeBtns.eq(0).addClass('active');

            for (var i = 0, l = themeBtns.length; i < l; i++) {
                themeBtns.eq(i).on('click', function() {
                    (function() {
                        for (var i = 0; i < l; i++) {
                            themeBtns.eq(i).removeClass('active');
                        }
                    }());

                    themeLink.href = '/vendor/' + this.textContent + '-theme.min.css';
                    this.setAttribute('class', 'active');
                });
            }
        }
    }
});
