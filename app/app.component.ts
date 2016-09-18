import {Component, OnInit, ViewChild} from '@angular/core';
import {WheelComponent} from "./wheel.component";
import {OptionService, Option} from "./option.service";
import {OptionsTableComponent} from "./options-table.component";
import {PriceHistoryService, HistoryRecord} from "./price-history.service";
import {PriceHistoryComponent} from "./price-history.component";

@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.html',
    directives: [OptionsTableComponent, WheelComponent, PriceHistoryComponent],
    providers: [OptionService, PriceHistoryService]
})

export class AppComponent implements OnInit {

    options: Option[];
    priceHistory: HistoryRecord[];

    showConfig = false;
    showHistory = false;

    wheelSpinning = false;

    @ViewChild(WheelComponent)
    private wheel: WheelComponent;

    ngOnInit(): void {
        this.options = this.getOptions();
        this.priceHistory = this.getPriceHistoryRecords();
    }

    /**
     * @param {OptionService} optionService
     * @param {PriceHistoryService} priceHistoryService
     */
    public constructor(private optionService: OptionService, private priceHistoryService: PriceHistoryService) { }

    /**
     * @returns {Option[]}
     */
    private getOptions() {
        return this.optionService.getOptions();
    }

    private getPriceHistoryRecords() {
        return this.priceHistoryService.getRecords();
    }

    public toggleConfigPanel() {
        this.showConfig = !this.showConfig;
        this.showHistory = this.showConfig ? false : this.showHistory;
    }

    public toggleHistoryPanel() {
        this.showHistory = !this.showHistory;
        this.showConfig = this.showHistory ? false : this.showConfig;
    }

    public closePanels() {
        this.showConfig = false;
        this.showHistory = false;
    }

    public isShowingPannel() {
        return this.showConfig || this.showHistory;
    }

    public onWheelClick(event) {
        if (event.value) {
            this.closePanels();
        }
    }

}