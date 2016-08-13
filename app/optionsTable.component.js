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
var core_1 = require("@angular/core");
var option_service_1 = require("./option.service");
var OptionsTableComponent = (function () {
    function OptionsTableComponent(optionService) {
        this.options = optionService.getOptions();
    }
    OptionsTableComponent = __decorate([
        core_1.Component({
            selector: 'options-table',
            template: "\n        <button class=\"btn btn-primary pull-right\"><span class=\"glyphicon glyphicon-plus-sign\"></span> Agregar opci\u00F3n</button>\n\n        <table id=\"optionsTable\" class=\"table\">\n            <thead>\n                <th>Opci\u00F3n</th>\n                <th>Color</th>\n                <th></th>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let option of options\">\n                    <td class=\"option-description\">{{ option.name }}</td>\n                    <td width=\"130\">\n                        <span class=\"option-color-display\" [ngStyle]=\"{'background-color': option.color}\"></span>\n                        <div class=\"hidden input-group colorpicker-component\"><input type=\"text\" readonly class=\"option-color-value form-control\" value=\"{{ option.color }}\"><span class=\"input-group-addon\"><i></i></span></div>\n                    </td>\n                    <td width=\"100\">\n                        <button class=\"btn delete-option-btn\"><span class=\"glyphicon glyphicon-trash\"></span></button><button class=\"btn edit-option-btn\"><span class=\"glyphicon glyphicon-pencil\"></span></button><button class=\"btn save-option-btn hide pull-right\"><span class=\"glyphicon glyphicon-floppy-disk\"></span></button>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    ",
            providers: [option_service_1.OptionService]
        }), 
        __metadata('design:paramtypes', [option_service_1.OptionService])
    ], OptionsTableComponent);
    return OptionsTableComponent;
}());
exports.OptionsTableComponent = OptionsTableComponent;
//# sourceMappingURL=optionsTable.component.js.map