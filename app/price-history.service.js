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
var HistoryRecord = (function () {
    function HistoryRecord(username, price) {
        this.username = username;
        this.price = price;
        this.date = new Date();
    }
    HistoryRecord.prototype.setDate = function (dateString) {
        this.date = new Date(dateString);
    };
    return HistoryRecord;
}());
exports.HistoryRecord = HistoryRecord;
var PriceHistoryService = (function () {
    function PriceHistoryService() {
    }
    /**
     * @returns {HistoryRecord[]}
     */
    PriceHistoryService.prototype.getRecords = function () {
        var priceHistory = localStorage.getItem('priceHistory'), jsonRecords = priceHistory ? JSON.parse(priceHistory) : {}, records = [];
        if (jsonRecords) {
            for (var i = 0; i < jsonRecords.length; i++) {
                var username = jsonRecords[i].username, price = jsonRecords[i].price, date = jsonRecords[i].date, checked = jsonRecords[i].checked, record = new HistoryRecord(username, price);
                record.setDate(date);
                record.checked = checked;
                records.push(record);
            }
        }
        return records;
    };
    /**
     * @param {HistoryRecord[]} records
     */
    PriceHistoryService.prototype.saveRecords = function (records) {
        localStorage.setItem('priceHistory', JSON.stringify(records));
    };
    /**
     * @param {HistoryRecord} record
     */
    PriceHistoryService.prototype.addRecord = function (record) {
        var records = this.getRecords();
        records.push(record);
        this.saveRecords(records);
    };
    PriceHistoryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PriceHistoryService);
    return PriceHistoryService;
}());
exports.PriceHistoryService = PriceHistoryService;
//# sourceMappingURL=price-history.service.js.map