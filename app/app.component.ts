import {Component, OnInit, ViewChild} from '@angular/core';
import {WheelComponent} from "./wheel.component";
import {OptionService, Option} from "./option.service";
import {OptionsTableComponent} from "./options-table.component";

@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.html',
    directives: [OptionsTableComponent, WheelComponent],
    providers: [OptionService]
})
export class AppComponent implements OnInit {

    options: Option[];

    showConfig = false;

    @ViewChild(WheelComponent)
    private wheel: WheelComponent;

    ngOnInit(): void {
        this.options = this.getOptions();
    }

    /**
     * @param {OptionService} optionService
     */
    public constructor(private optionService: OptionService) { }

    /**
     * @returns {Option[]}
     */
    private getOptions() {
        return this.optionService.getOptions();
    }

    public toggleConfigPanel() {
        this.showConfig = !this.showConfig;
    }
}