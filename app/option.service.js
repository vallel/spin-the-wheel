"use strict";
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
    return OptionService;
}());
exports.OptionService = OptionService;
//# sourceMappingURL=option.service.js.map