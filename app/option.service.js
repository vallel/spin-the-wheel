"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Option = (function () {
    function Option(name, color) {
        this.name = name;
        this.color = color;
    }
    return Option;
}());
exports.Option = Option;
var OptionService = (function () {
    function OptionService() {
    }
    /**
     * @returns {Option[]}
     */
    OptionService.prototype.getOptions = function () {
        var jsonOptions = JSON.parse(localStorage.getItem('options')), options = [];
        if (jsonOptions) {
            for (var i = 0; i < jsonOptions.length; i++) {
                var name_1 = jsonOptions[i].name, color = jsonOptions[i].color;
                options.push(new Option(name_1, color));
            }
        }
        return options;
    };
    /**
     * @param {int} index
     * @param {Option} option
     */
    OptionService.prototype.saveOption = function (index, option) {
        var options = this.getOptions();
        options[index] = option;
        this.saveOptions(options);
    };
    /**
     * @param {Option[]} options
     */
    OptionService.prototype.saveOptions = function (options) {
        localStorage.setItem('options', JSON.stringify(options));
    };
    /**
     * @param {int} index
     */
    OptionService.prototype.deleteOption = function (index) {
        var options = this.getOptions();
        options.splice(index, 1);
        this.saveOptions(options);
    };
    OptionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], OptionService);
    return OptionService;
}());
exports.OptionService = OptionService;
//# sourceMappingURL=option.service.js.map