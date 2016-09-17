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
var price_history_service_1 = require("./price-history.service");
var PriceHistoryComponent = (function () {
    function PriceHistoryComponent(priceHistoryService) {
        this.priceHistoryService = priceHistoryService;
    }
    PriceHistoryComponent.prototype.onCheckBoxClick = function (record) {
        record.checked = !record.checked;
        this.priceHistoryService.saveRecords(this.records);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PriceHistoryComponent.prototype, "records", void 0);
    PriceHistoryComponent = __decorate([
        core_1.Component({
            selector: 'price-history',
            templateUrl: 'app/templates/price-history.html'
        }), 
        __metadata('design:paramtypes', [price_history_service_1.PriceHistoryService])
    ], PriceHistoryComponent);
    return PriceHistoryComponent;
}());
exports.PriceHistoryComponent = PriceHistoryComponent;
//# sourceMappingURL=price-history.component.js.map