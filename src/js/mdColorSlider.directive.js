;(function (angular) {
    'use strict';

    angular
        .module('mdColorSlider', [])
        .directive('mdColorSlider', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                require: 'ngModel',
                scope: {
                    model: '=ngModel'
                },
                templateUrl: 'mdColorSlider.view.html',
                link: function (scope, element, attrs, ngModel) {
                    var _componentToHex = function (c) {
                            var hex = c.toString(16);
                            return hex.length == 1 ? '0' + hex : hex;
                        },
                        _rgbToHex = function (r, g, b) {
                            return '#' + _componentToHex(r) + _componentToHex(g) + _componentToHex(b);
                        },
                        _hexToRgb = function (hex) {
                            var short = hex.length == 4,
                                result = short
                                    ? /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex)
                                    : /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                            return result ? {
                                r: parseInt(short ? result[1] + '' + result[1] : result[1], 16),
                                g: parseInt(short ? result[2] + '' + result[2] : result[2], 16),
                                b: parseInt(short ? result[3] + '' + result[3] : result[3], 16)
                            } : null;
                        },
                        _setInitials = function () {
                            scope.ColorInitialHex = angular.copy(scope.model);
                            scope.ColorInitialRGB = _hexToRgb(scope.model);
                        },
                        _resetInitials = function () {
                            scope.model = scope.ColorInitialHex;
                            scope.ColorInitialRGB = _hexToRgb(scope.model);
                        },
                        _setColorHEX = function (color) {
                            scope.model = _rgbToHex(
                                color.r,
                                color.g,
                                color.b
                            );
                        },
                        _setColorRGB = function (color) {
                            scope.color = {
                                r: color.r,
                                g: color.g,
                                b: color.b
                            };
                        },
                        _change = function () {
                            _setColorHEX(scope.color);
                        },
                        _open = function () {
                            scope.showCard = true;
                        },
                        _close = function () {
                            scope.showCard = false;
                        },
                        _toggle = function () {
                            scope.showCard = !scope.showCard;
                        },
                        _accept = function () {
                            _setInitials();
                            _close();
                        },
                        _cancel = function () {
                            _resetInitials();
                            _setColorRGB(scope.ColorInitialRGB);
                            $timeout(_close, 250);
                        },
                        _init = function () {
                            _setInitials();
                            _setColorRGB(scope.ColorInitialRGB);
                            scope.showCard = false;
                            scope.change = _change;
                            scope.open = _open;
                            scope.close = _close;
                            scope.toggle = _toggle;
                            scope.accept = _accept;
                            scope.cancel = _cancel;

                            ngModel.$render = function () {
                                _setColorRGB(_hexToRgb(ngModel.$viewValue));
                                _setInitials();
                            };
                        };

                    _init();
                }
            }
        }]);
})(angular);
