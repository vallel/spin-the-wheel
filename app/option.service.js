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
    OptionService.prototype.getOptions = function () {
        return [
            { name: 'Testing 1', color: '#334355' },
            { name: 'Hola que hace', color: '#6621ae' },
            { name: 'Ola k ace', color: '#ae549f' },
            { name: 'Trolololololo lolo lo', color: '#04fe32' }
        ];
    };
    OptionService.prototype.saveOption = function (id, option) {
    };
    return OptionService;
}());
exports.OptionService = OptionService;
//# sourceMappingURL=option.service.js.map