'use strict';

describe('colorpicker module', function () {

  beforeEach(module('colorpicker.module'));

  describe('directive', function () {
    var element, scope;

    beforeEach(inject(function($rootScope, $compile) {
      scope = $rootScope;
      element = $compile('<input colorpicker ng-model="picker.color" type="text" value="" />')(scope);
      scope.$digest();
    }));

    afterEach(function() {
      // clean up after our tests
      element.remove();
    });

    it('should clean up element from dom', function () {
      expect($(document).find('.colorpicker').length).toBe(1);
      element.remove();
      expect($(document).find('.colorpicker').length).toBe(0);
    });

    it('should change visibility of the picker element', function() {
      element.click();
      expect($(document).find('.colorpicker').css('display')).toEqual('block');
    });

    it('should set a default class name', function() {
      expect($(document).find('.colorpicker').hasClass('colorpicker-position-bottom')).toBeTruthy();
    });

  });

  describe('directive.target', function () {
    var element, scope;

    it('should use the body as target if none is given', function () {
      inject(function($rootScope, $compile) {
        scope = $rootScope;
        element = $compile('<input colorpicker ng-model="picker.color" type="text" value="" />')(scope);
        scope.$digest();
      });
      expect($(document.body).find('.colorpicker').length).toBe(1);
      element.remove();
      expect($(document).find('.colorpicker').length).toBe(0);
    });

    it('should use the parent as target if "parent" is given', function () {
      inject(function($rootScope, $compile) {
        scope = $rootScope;
        element = $compile('<div><input colorpicker colorpicker-target="parent" ng-model="picker.color" type="text" value="" /></div>')(scope);
        scope.$digest();
      });
      var $element = $(element);
      expect($element.css('top')).toBe('');
      expect($element.css('left')).toBe('');
      expect($element.find('.colorpicker').length).toBe(1);
      element.remove();
      expect($(document).find('.colorpicker').length).toBe(0);
    });

    it('should use a selector target if given', function () {
      var $foo = $(document.body).append('<div id="foo">');
      inject(function($rootScope, $compile) {
        scope = $rootScope;
        element = $compile('<input colorpicker colorpicker-target="#foo" ng-model="picker.color" type="text" value="" />')(scope);
        scope.$digest();
      });
      expect($foo.find('.colorpicker').length).toBe(1);
      element.remove();
      expect($foo.find('.colorpicker').length).toBe(0);
    });

  });

  describe('Color', function () {
    var
      Color,
      helper;

    beforeEach(inject(function (_Color_, _helper_) {
      Color = _Color_;
      helper = _helper_;
    }));

    it('should return color as a rgb string', function () {
      Color.setColor('#ffffff');
      expect(Color.rgb()).toEqual('rgb(255,255,255)');
    });

    it('should return color as a rgba string', function () {
      Color.setColor('#ffffff');
      expect(Color.rgba()).toEqual('rgba(255,255,255,1)');
    });

    it('should return color as a hex string', function () {
      Color.setColor('rgb(255,255,255)');
      expect(Color.hex()).toEqual('#ffffff');
    });

    it('should set hue', function () {
      Color.setHue(0.25);
      expect(Color.value.h).toEqual(0.75);
    });

    it('should set saturation', function () {
      Color.setSaturation(0.25);
      expect(Color.value.s).toEqual(0.25);
    });

    it('should set lightness', function () {
      Color.setLightness(0.25);
      expect(Color.value.b).toEqual(0.75);
    });

    it('should set alpha', function () {
      Color.setAlpha(0.5);
      expect(Color.value.a).toEqual(0.5);
    });

    it('should convert value to hex', function () {
      Color.setColor('rgb(102, 204, 68)');
      expect(Color.toHex()).toEqual('#66cc44');
    });

    it('should convert value to rgb', function () {
      Color.setColor('#66CC44)');
      expect(Color.toRGB()).toEqual({r:102, g:204, b:68, a:1});
    });

  });
});