# md-color-slider
Simple Material design color slider for [AngularJS](https://github.com/angular/angular.js) using [Material Design for AngularJS](https://github.com/angular/material/).
No jQuery or TinyColor dependencies.

![preview](#)

## Demo
(Plunker)[http://run.plnkr.co/UKGb9g2xz4vRiAiJ/]

## Install
<!--### NPM
Install `md-color-slider`.
```bash
npm install md-color-slider
```-->

### Bower:
```bash
bower install md-color-slider -S
```

## Usage
Include the stylesheet:
````html
<link href="bower_components/md-color-slider/dist/mdColorSlider.min.css">
````

Include the javascript:
````html
<script src="bower_components/md-color-slider/dist/mdColorSlider.min.js"></script>
````

Add dependencies to your application (ngAnimate is optional)
````javascript
angular.module('myApp', ['ngMaterial','ngAnimate', 'mdColorSlider']);
````

Place the directive anywhere inside a ```md-input-container```:
````html
<md-input-container class="md-color-slider-float">
    <md-color-slider ng-model="[your model]"></md-color-slider>
</md-input-container>
````
Be sure to provide the css class ```md-color-slider-float``` or even ```md-icon-float``` to the ```md-input-container``` wrapper.

You can provide an classic input too:
````html
<md-input-container>
    <md-color-slider ng-model="[your model]"></md-color-slider>
    <input ng-model="[your model]">
</md-input-container>
````

## Dependencies
- [Angular Material](https://material.angularjs.org)
- [ngAnimate](https://docs.angularjs.org/api/ngAnimate) (optional)
