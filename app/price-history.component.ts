import {Component, Input} from "@angular/core";
import {HistoryRecord, PriceHistoryService} from "./price-history.service";

@Component({
    selector: 'price-history',
    templateUrl: 'app/templates/price-history.html'
})

export class PriceHistoryComponent {

    @Input() records: HistoryRecord[];

    public constructor(private priceHistoryService: PriceHistoryService) { }

    public onCheckBoxClick(record: HistoryRecord) {
        record.checked = !record.checked;
        this.priceHistoryService.saveRecords(this.records);
    }
}