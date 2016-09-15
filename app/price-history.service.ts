import {Injectable} from "@angular/core";

export class HistoryRecord {
    private username: string;
    private price: string;
    private date: Date;

    public constructor(username: string, price: string) {
        this.username = username;
        this.price = price;
        this.date = new Date();
    }

    /**
     * @returns {string}
     */
    public getDateToString() {
        let day = this.date.getDate(),
            month = this.date.getMonth() + 1,
            year = this.date.getFullYear();

        return day + '/' + month + '/' + year;
    }
}

@Injectable()
export class PriceHistoryService {

    /**
     * @returns {HistoryRecord[]}
     */
    public getRecords() {
        let jsonRecords = JSON.parse(localStorage.getItem('priceHistory')),
            records = [];

        if (jsonRecords) {
            for (let i = 0; i < jsonRecords.length; i++) {
                let username = jsonRecords[i].username,
                    price = jsonRecords[i].price;
                records.push(new HistoryRecord(username, price));
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