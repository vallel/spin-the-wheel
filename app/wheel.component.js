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
var alert_service_1 = require("./alert.service");
var price_history_service_1 = require("./price-history.service");
var WheelComponent = (function () {
    function WheelComponent(alertService, priceHistory) {
        this.alertService = alertService;
        this.priceHistory = priceHistory;
        this.options = [];
        this.history = [];
        this.spinning = 0;
        this.onWheelClicked = new core_1.EventEmitter();
        this.spinAngleStart = 10;
        this.startAngle = 0;
        this.spinTime = 0;
        this.spinTimeTotal = 0;
        this.spinTimeout = null;
        this.arc = 0;
    }
    WheelComponent.prototype.ngAfterViewInit = function () {
        this.context = this.canvas.nativeElement.getContext("2d");
        this.drawWheel();
    };
    WheelComponent.prototype.onCanvasClick = function () {
        if (!this.spinning) {
            var that_1 = this;
            var onResolve = function (username) {
                that_1.username = username;
                that_1.spinTheWheel();
            };
            this.alertService.input('¿Quién participa?', onResolve);
        }
        else {
            this.spinTheWheel();
        }
    };
    WheelComponent.prototype.drawWheel = function () {
        var canvas = this.canvas.nativeElement;
        if (this.context) {
            var outsideRadius = (canvas.width - 25) / 2, insideRadius = outsideRadius / 10, textRadius = insideRadius * 6, canvasCenterX = canvas.width / 2, canvasCenterY = canvas.height / 2;
            this.context.clearRect(0, 0, canvas.width, canvas.height);
            this.context.strokeStyle = "black";
            this.context.lineWidth = 10;
            if (this.options.length > 0) {
                for (var i = 0; i < this.options.length; i++) {
                    this.drawRouletteElement(i, canvasCenterX, canvasCenterY, outsideRadius, insideRadius, textRadius);
                }
                this.drawArrow(canvasCenterX, canvasCenterY, outsideRadius);
            }
        }
    };
    /**
     *
     * @param {int} index
     * @param {int} canvasCenterX
     * @param {int} canvasCenterY
     * @param {int} outsideRadius
     * @param {int} insideRadius
     * @param {int} textRadius
     */
    WheelComponent.prototype.drawRouletteElement = function (index, canvasCenterX, canvasCenterY, outsideRadius, insideRadius, textRadius) {
        this.arc = Math.PI / (this.options.length / 2);
        var context = this.context, option = this.options[index], angle = this.startAngle + index * this.arc;
        context.fillStyle = option.color;
        context.beginPath();
        context.arc(canvasCenterX, canvasCenterY, outsideRadius, angle, angle + this.arc, false);
        context.arc(canvasCenterX, canvasCenterY, insideRadius, angle + this.arc, angle, true);
        context.stroke();
        context.fill();
        context.save();
        context.shadowOffsetX = -0.5;
        context.fillStyle = "white";
        context.font = "17px Arial";
        context.translate(canvasCenterX + Math.cos(angle + this.arc / 2) * textRadius, canvasCenterY + Math.sin(angle + this.arc / 2) * textRadius);
        context.rotate(angle + this.arc / 2);
        context.fillText(option.name, -context.measureText(option.name).width / 2, 0);
        context.restore();
    };
    /**
     *
     * @param {int} canvasCenterX
     * @param {int} canvasCenterY
     * @param {int} outsideRadius
     */
    WheelComponent.prototype.drawArrow = function (canvasCenterX, canvasCenterY, outsideRadius) {
        var context = this.context;
        context.fillStyle = "black";
        context.beginPath();
        context.moveTo(canvasCenterX - 15, canvasCenterY - (outsideRadius + 20));
        context.lineTo(canvasCenterX + 15, canvasCenterY - (outsideRadius + 20));
        context.lineTo(canvasCenterX, canvasCenterY - (outsideRadius - 30));
        context.lineTo(canvasCenterX - 15, canvasCenterY - (outsideRadius + 20));
        context.fill();
    };
    WheelComponent.prototype.spinTheWheel = function () {
        this.spinning++;
        this.onWheelClicked.emit({ value: this.spinning > 0 });
        this.spinAngleStart = Math.random() * 10 + 10;
        this.spinTime = 0;
        this.spinTimeTotal = Math.random() * 3 + 10 * 1000;
        this.rotateWheel();
    };
    WheelComponent.prototype.rotateWheel = function (scope) {
        if (scope === void 0) { scope = null; }
        scope = scope || this;
        scope.spinTime += 30;
        if (scope.spinTime >= scope.spinTimeTotal) {
            scope.stopRotateWheel();
            return;
        }
        var spinAngle = scope.spinAngleStart - scope.easeOut(scope.spinTime, 0, scope.spinAngleStart, scope.spinTimeTotal);
        scope.startAngle += (spinAngle * Math.PI / 180);
        scope.drawWheel();
        scope.spinTimeout = setTimeout(scope.rotateWheel, 30, scope);
    };
    WheelComponent.prototype.stopRotateWheel = function () {
        clearTimeout(this.spinTimeout);
        var degrees = this.startAngle * 180 / Math.PI + 90;
        var arcd = this.arc * 180 / Math.PI;
        var index = Math.floor((360 - degrees % 360) / arcd);
        this.context.save();
        this.context.font = 'bold 30px Helvetica, Arial';
        var price = this.options[index].name, text = 'Tu premio es: ' + price;
        this.alertService.success('Felicidades ' + this.username + '!', text);
        this.spinning--;
        this.onWheelClicked.emit({ value: this.spinning > 0 });
        if (this.spinning == 1) {
            this.spinning--;
            this.addPriceToHistory(this.username, price);
        }
        this.context.restore();
    };
    WheelComponent.prototype.addPriceToHistory = function (username, price) {
        this.history.push(new price_history_service_1.HistoryRecord(username, price));
        this.priceHistory.saveRecords(this.history);
    };
    WheelComponent.prototype.easeOut = function (t, b, c, d) {
        var ts = (t /= d) * t;
        var tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    };
    __decorate([
        core_1.ViewChild('wheelCanvas'), 
        __metadata('design:type', core_1.ElementRef)
    ], WheelComponent.prototype, "canvas", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WheelComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WheelComponent.prototype, "history", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WheelComponent.prototype, "spinning", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WheelComponent.prototype, "onWheelClicked", void 0);
    WheelComponent = __decorate([
        core_1.Component({
            selector: 'wheel',
            templateUrl: 'app/templates/wheel.html',
            providers: [alert_service_1.AlertService]
        }), 
        __metadata('design:paramtypes', [alert_service_1.AlertService, price_history_service_1.PriceHistoryService])
    ], WheelComponent);
    return WheelComponent;
}());
exports.WheelComponent = WheelComponent;
//# sourceMappingURL=wheel.component.js.map