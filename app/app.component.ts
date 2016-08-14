import {Component} from '@angular/core';
import {ConfigPanelComponent} from "./config-panel.component";

@Component({
    selector: 'my-app',
    template: '<config-panel></config-panel>',
    directives: [ConfigPanelComponent]
})
export class AppComponent { }