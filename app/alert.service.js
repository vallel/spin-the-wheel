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
var AlertService = (function () {
    function AlertService() {
    }
    AlertService.prototype.success = function (title, text) {
        swal(title, text, 'success');
    };
    AlertService.prototype.input = function (title, onResolve) {
        swal({
            title: title,
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            preConfirm: function (input) {
                return new Promise(function (resolve, reject) {
                    if (input != '') {
                        resolve();
                    }
                });
            }
        }).then(onResolve);
    };
    AlertService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AlertService);
    return AlertService;
}());
exports.AlertService = AlertService;
//# sourceMappingURL=alert.service.js.map