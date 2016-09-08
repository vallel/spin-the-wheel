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
var WheelComponent = (function () {
    function WheelComponent() {
        this.options = [];
    }
    WheelComponent.prototype.ngAfterViewInit = function () {
        this.context = this.canvas.nativeElement.getContext("2d");
        this.drawWheel();
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
        var context = this.context, option = this.options[index], arc = Math.PI / (this.options.length / 2), angle = index * arc;
        context.fillStyle = option.color;
        context.beginPath();
        context.arc(canvasCenterX, canvasCenterY, outsideRadius, angle, angle + arc, false);
        context.arc(canvasCenterX, canvasCenterY, insideRadius, angle + arc, angle, true);
        context.stroke();
        context.fill();
        context.save();
        context.shadowOffsetX = -0.5;
        context.fillStyle = "white";
        context.font = "17px Arial";
        context.translate(canvasCenterX + Math.cos(angle + arc / 2) * textRadius, canvasCenterY + Math.sin(angle + arc / 2) * textRadius);
        context.rotate(angle + arc / 2);
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
        context.moveTo(canvasCenterX - 12, canvasCenterY - (outsideRadius + 15));
        context.lineTo(canvasCenterX + 12, canvasCenterY - (outsideRadius + 15));
        context.lineTo(canvasCenterX + 12, canvasCenterY - (outsideRadius - 15));
        context.lineTo(canvasCenterX + 27, canvasCenterY - (outsideRadius - 15));
        context.lineTo(canvasCenterX, canvasCenterY - (outsideRadius - 39));
        context.lineTo(canvasCenterX - 27, canvasCenterY - (outsideRadius - 15));
        context.lineTo(canvasCenterX - 12, canvasCenterY - (outsideRadius - 15));
        context.lineTo(canvasCenterX - 12, canvasCenterY - (outsideRadius + 15));
        context.fill();
    };
    __decorate([
        core_1.ViewChild('wheelCanvas'), 
        __metadata('design:type', core_1.ElementRef)
    ], WheelComponent.prototype, "canvas", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WheelComponent.prototype, "options", void 0);
    WheelComponent = __decorate([
        core_1.Component({
            selector: 'wheel',
            templateUrl: 'app/templates/wheel.html'
        }), 
        __metadata('design:paramtypes', [])
    ], WheelComponent);
    return WheelComponent;
}());
exports.WheelComponent = WheelComponent;
//# sourceMappingURL=wheel.component.js.map