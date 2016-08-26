import {Component} from '@angular/core';
import {ConfigPanelComponent} from "./config-panel.component";
import {WheelComponent} from "./wheel.component";

@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.html',
    directives: [ConfigPanelComponent, WheelComponent]
})
export class AppComponent { }