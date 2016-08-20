import {Component} from '@angular/core';
import {OptionsTableComponent} from "./options-table.component";

@Component({
    selector: 'config-panel',
    templateUrl: 'app/templates/config-section.html',
    directives: [OptionsTableComponent]
})

export class ConfigPanelComponent {

}