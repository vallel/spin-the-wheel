import {Injectable} from "@angular/core";

export class HistoryRecord {
    public username: string;
    public price: string;
    public date: Date;
    public checked: boolean;

    public constructor(username: string, price: string) {
        this.username = username;
        this.price = price;
        this.date = new Date();
    }

    public setDate(dateString: string) {
        this.date = new Date(dateString);
    }
}

@Injectable()
export class PriceHistoryService {

    /**
     * @returns {HistoryRecord[]}
     */
    public getRecords() {
        let priceHistory = localStorage.getItem('priceHistory'),
            jsonRecords = priceHistory ? JSON.parse(priceHistory) : {},
            records = [];

        if (jsonRecords) {
            for (let i = 0; i < jsonRecords.length; i++) {
                let username = jsonRecords[i].username,
                    price = jsonRecords[i].price,
                    date = jsonRecords[i].date,
                    checked = jsonRecords[i].checked,
                    record = new HistoryRecord(username, price);

                record.setDate(date);
                record.checked = checked;

                records.push(record);
            }
        }

        return records;
    }

    /**
     * @param {HistoryRecord[]} records
     */
    public saveRecords(records: HistoryRecord[]) {
        localStorage.setItem('priceHistory', JSON.stringify(records));
    }

    /**
     * @param {HistoryRecord} record
     */
    public addRecord(record: HistoryRecord) {
        let records = this.getRecords();
        records.push(record);
        this.saveRecords(records);
    }

}