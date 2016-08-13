"use strict";
var Option = (function () {
    function Option() {
    }
    return Option;
}());
exports.Option = Option;
var OptionService = (function () {
    function OptionService() {
    }
    OptionService.prototype.getOptions = function () {
        return [
            { id: 1, name: 'Testing 1', color: '#334455' },
            { id: 2, name: 'Hola que hace', color: '#6621ae' },
            { id: 3, name: 'Ola k ace', color: '#ae549f' },
            { id: 3, name: 'Trolololololo lolo lo', color: '#04fe32' }
        ];
    };
    return OptionService;
}());
exports.OptionService = OptionService;
//# sourceMappingURL=option.service.js.map