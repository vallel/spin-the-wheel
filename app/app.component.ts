import {Component} from '@angular/core';
import {ConfigPanelComponent} from "./configPanel.component";

@Component({
    selector: 'my-app',
    template: '<config-panel></config-panel>',
    directives: [ConfigPanelComponent]
})
export class AppComponent { }