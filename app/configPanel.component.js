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
var optionsTable_component_1 = require("./optionsTable.component");
var ConfigPanelComponent = (function () {
    function ConfigPanelComponent() {
    }
    ConfigPanelComponent = __decorate([
        core_1.Component({
            selector: 'config-panel',
            template: "\n        <section class=\"config-section\">\n            <h3 class=\"config-title\">Configurar ruleta</h3>\n            \n            <options-table></options-table>\n        </section>\n    ",
            directives: [optionsTable_component_1.OptionsTableComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ConfigPanelComponent);
    return ConfigPanelComponent;
}());
exports.ConfigPanelComponent = ConfigPanelComponent;
//# sourceMappingURL=configPanel.component.js.map