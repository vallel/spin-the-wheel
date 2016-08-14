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
        this.editModeRow = null;
        this.options = optionService.getOptions();
    }
    OptionsTableComponent.prototype.addNewOption = function () {
        this.options.push(new option_service_1.Option('', '#fff'));
        this.editModeRow = this.options.length - 1;
    };
    OptionsTableComponent.prototype.onDelete = function (option, index) {
        if (confirm('¿Esta seguro de borrar la opción "' + option.name + '"?')) {
            this.options.splice(index, 1);
        }
    };
    OptionsTableComponent.prototype.onEdit = function (index) {
        this.editModeRow = index;
    };
    OptionsTableComponent.prototype.onSave = function () {
        this.editModeRow = null;
    };
    OptionsTableComponent.prototype.onCancelEdit = function () {
        this.editModeRow = null;
    };
    OptionsTableComponent = __decorate([
        core_1.Component({
            selector: 'options-table',
            template: "\n        <button class=\"btn btn-primary pull-right\" (click)=\"addNewOption()\"><span class=\"glyphicon glyphicon-plus-sign\"></span> Agregar opci\u00F3n</button>\n\n        <table id=\"optionsTable\" class=\"table\">\n            <thead>\n                <th>Opci\u00F3n</th>\n                <th>Color</th>\n                <th></th>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let option of options; let i = index\">\n                    <td class=\"option-description\">\n                        <span *ngIf=\"editModeRow != i\">{{ option.name }}</span>\n                        <input class=\"form-control\" *ngIf=\"editModeRow == i\" [(ngModel)]=\"option.name\" type=\"text\" value=\"{{ option.name }}\">\n                    </td>\n                    <td width=\"130\">\n                        <span *ngIf=\"editModeRow != i\" class=\"option-color-display\" [ngStyle]=\"{'background-color': option.color}\"></span>\n                        <button *ngIf=\"editModeRow == i\" class=\"btn\" colorpicker=\"hex\"  type=\"button\"><span class=\"option-color-display-sm\" [ngStyle]=\"{'background-color': option.color}\"></span></button>\n                    </td>\n                    <td width=\"100\">\n                        <button *ngIf=\"editModeRow != i\" class=\"btn delete-option-btn pull-left\" (click)=\"onDelete(option, i)\"><span class=\"glyphicon glyphicon-trash\"></span></button>\n                        <button *ngIf=\"editModeRow != i\" class=\"btn edit-option-btn pull-left\" (click)=\"onEdit(i)\"><span class=\"glyphicon glyphicon-pencil\"></span></button>\n                        <button *ngIf=\"editModeRow == i\" class=\"btn save-option-btn pull-left\" (click)=\"onSave()\"><span class=\"glyphicon glyphicon-floppy-disk\"></span></button>\n                        <button *ngIf=\"editModeRow == i\" class=\"btn cancel-option-btn pull-left\" (click)=\"onCancelEdit()\"><span class=\"glyphicon glyphicon glyphicon-remove\"></span></button>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    ",
            providers: [option_service_1.OptionService]
        }), 
        __metadata('design:paramtypes', [option_service_1.OptionService])
    ], OptionsTableComponent);
    return OptionsTableComponent;
}());
exports.OptionsTableComponent = OptionsTableComponent;
//# sourceMappingURL=options-table.component.js.map