import {Component, Input} from "@angular/core";
import {HistoryRecord} from "./price-history.service";

@Component({
    selector: 'price-history',
    templateUrl: 'app/templates/price-history.html'
})

export class PriceHistoryComponent {

    @Input() records: HistoryRecord[];
}