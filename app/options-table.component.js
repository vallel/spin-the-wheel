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
var color_picker_directive_1 = require('./color-picker/color-picker.directive');
var wheel_component_1 = require("./wheel.component");
var OptionsTableComponent = (function () {
    function OptionsTableComponent(optionService) {
        this.optionService = optionService;
        this.options = [];
        this.editModeRow = null;
        this.previousEditRowValues = null;
    }
    OptionsTableComponent.prototype.addNewOption = function () {
        this.options.push(new option_service_1.Option('', '#fff'));
        this.editModeRow = this.options.length - 1;
    };
    OptionsTableComponent.prototype.onDelete = function (option, index) {
        if (confirm('¿Esta seguro de borrar la opción "' + option.name + '"?')) {
            this.optionService.deleteOption(index);
            this.options = this.optionService.getOptions();
            this.drawWheelCanvas();
        }
    };
    OptionsTableComponent.prototype.onEdit = function (index) {
        this.restorePreviousValues();
        this.turnOnEditRowMode(index);
    };
    OptionsTableComponent.prototype.onSave = function (index, option) {
        this.optionService.saveOption(index, option);
        this.turnOffEditMode();
        this.drawWheelCanvas();
    };
    OptionsTableComponent.prototype.onCancelEdit = function () {
        this.restorePreviousValues();
        this.turnOffEditMode();
    };
    OptionsTableComponent.prototype.turnOnEditRowMode = function (index) {
        var currentOption = this.options[index];
        this.previousEditRowValues = {
            name: currentOption.name,
            color: currentOption.color
        };
        this.editModeRow = index;
    };
    OptionsTableComponent.prototype.turnOffEditMode = function () {
        this.editModeRow = null;
        this.previousEditRowValues = null;
    };
    OptionsTableComponent.prototype.restorePreviousValues = function () {
        if (this.previousEditRowValues != null && this.editModeRow != null) {
            this.options[this.editModeRow] = new option_service_1.Option(this.previousEditRowValues.name, this.previousEditRowValues.color);
            this.previousEditRowValues = null;
        }
    };
    OptionsTableComponent.prototype.drawWheelCanvas = function () {
        this.wheel.drawWheel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OptionsTableComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', wheel_component_1.WheelComponent)
    ], OptionsTableComponent.prototype, "wheel", void 0);
    OptionsTableComponent = __decorate([
        core_1.Component({
            selector: 'options-table',
            templateUrl: 'app/templates/options-table.html',
            directives: [color_picker_directive_1.ColorPickerDirective]
        }), 
        __metadata('design:paramtypes', [option_service_1.OptionService])
    ], OptionsTableComponent);
    return OptionsTableComponent;
}());
exports.OptionsTableComponent = OptionsTableComponent;
//# sourceMappingURL=options-table.component.js.map