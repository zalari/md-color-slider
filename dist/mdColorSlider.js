;(function(angular) {
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
                        var hex = hex || '#fff',
                            short = hex.length == 4,
                            result = short
                                ? /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex)
                                : /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                        return result ? {
                            r: parseInt(short ? result[1] + '' + result[1] : result[1], 16),
                            g: parseInt(short ? result[2] + '' + result[2] : result[2], 16),
                            b: parseInt(short ? result[3] + '' + result[3] : result[3], 16)
                        } : null;
                    },
                    _setColorHEX = function (color) {
                        if (!color) return;
                        scope.model = _rgbToHex(
                            color.r || 255,
                            color.g || 255,
                            color.b || 255
                        );
                    },
                    _setColorRGB = function (color) {
                        // do not return to set an initial slider value
                        var color = color || {r: 255, g: 255, b: 255};
                        scope.color = {
                            r: color.r || 255,
                            g: color.g || 255,
                            b: color.b || 255
                        };
                    },
                    _change = function () {
                        if (!scope.color) return;
                        _setColorHEX(scope.color);
                    },
                    _render = function () {
                        if (!ngModel.$viewValue) return;
                        _setColorRGB(_hexToRgb(ngModel.$viewValue));
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
                    _setInitials = function () {
                        if (!scope.model) return;
                        scope.ColorInitialHex = angular.copy(scope.model);
                        scope.ColorInitialRGB = _hexToRgb(scope.model);
                    },
                    _resetInitials = function () {
                        if (!scope.model) return;
                        scope.model = scope.ColorInitialHex;
                        scope.ColorInitialRGB = _hexToRgb(scope.model);
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

                        ngModel.$render = _render;
                    };

                _init();
            }
        }
    }]);

angular.module("mdColorSlider").run(["$templateCache", function($templateCache) {$templateCache.put("mdColorSlider.view.html","<div class=\"color-slider-handle\" ng-click=\"toggle()\" ng-style=\"{\'background-color\': model}\"></div>\n\n<md-card layout-padding\n         ng-show=\"showCard\"\n         ng-form=\"rgb\"\n         class=\"ng-hide\">\n    <md-slider min=\"0\" max=\"255\" ng-model=\"color.r\" ng-change=\"change()\" aria-label=\"red\"></md-slider>\n    <md-slider min=\"0\" max=\"255\" ng-model=\"color.g\" ng-change=\"change()\" aria-label=\"green\"></md-slider>\n    <md-slider min=\"0\" max=\"255\" ng-model=\"color.b\" ng-change=\"change()\" aria-label=\"blue\"></md-slider>\n    <md-button type=\"button\" class=\"md-raised md-accent md-hue-1\" ng-click=\"cancel()\">Abbrechen</md-button>\n    <md-button type=\"button\" class=\"md-raised md-primary\" ng-click=\"accept()\">Übernehmen</md-button>\n</md-card>\n");}]);
})(angular);