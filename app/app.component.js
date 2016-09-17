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
var wheel_component_1 = require("./wheel.component");
var option_service_1 = require("./option.service");
var options_table_component_1 = require("./options-table.component");
var price_history_service_1 = require("./price-history.service");
var price_history_component_1 = require("./price-history.component");
var AppComponent = (function () {
    /**
     * @param {OptionService} optionService
     * @param {PriceHistoryService} priceHistoryService
     */
    function AppComponent(optionService, priceHistoryService) {
        this.optionService = optionService;
        this.priceHistoryService = priceHistoryService;
        this.showConfig = false;
        this.showHistory = false;
        this.wheelSpinning = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.options = this.getOptions();
        this.priceHistory = this.getPriceHistoryRecords();
    };
    /**
     * @returns {Option[]}
     */
    AppComponent.prototype.getOptions = function () {
        return this.optionService.getOptions();
    };
    AppComponent.prototype.getPriceHistoryRecords = function () {
        return this.priceHistoryService.getRecords();
    };
    AppComponent.prototype.toggleConfigPanel = function () {
        this.showConfig = !this.showConfig;
        this.showHistory = this.showConfig ? false : this.showHistory;
    };
    AppComponent.prototype.toggleHistoryPanel = function () {
        this.showHistory = !this.showHistory;
        this.showConfig = this.showHistory ? false : this.showConfig;
    };
    AppComponent.prototype.closePanels = function () {
        this.showConfig = false;
        this.showHistory = false;
    };
    AppComponent.prototype.isShowingPannel = function () {
        return this.showConfig || this.showHistory;
    };
    AppComponent.prototype.onWheelClick = function (event) {
        if (event.value) {
            this.closePanels();
        }
    };
    __decorate([
        core_1.ViewChild(wheel_component_1.WheelComponent), 
        __metadata('design:type', wheel_component_1.WheelComponent)
    ], AppComponent.prototype, "wheel", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/templates/app.html',
            directives: [options_table_component_1.OptionsTableComponent, wheel_component_1.WheelComponent, price_history_component_1.PriceHistoryComponent],
            providers: [option_service_1.OptionService, price_history_service_1.PriceHistoryService]
        }), 
        __metadata('design:paramtypes', [option_service_1.OptionService, price_history_service_1.PriceHistoryService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map