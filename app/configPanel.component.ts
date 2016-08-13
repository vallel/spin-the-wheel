import {Component} from '@angular/core';
import {OptionsTableComponent} from "./optionsTable.component";

@Component({
    selector: 'config-panel',
    template: `
        <section class="config-section">
            <h3 class="config-title">Configurar ruleta</h3>
            
            <options-table></options-table>
        </section>
    `,
    directives: [OptionsTableComponent]
})

export class ConfigPanelComponent {

}