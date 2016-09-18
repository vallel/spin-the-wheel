import { Injectable } from '@angular/core'

export class Option {
    name: string;
    color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
}

@Injectable()
export class OptionService {

    /**
     * @returns {Option[]}
     */
    public getOptions() : Option[] {
        let jsonOptions = JSON.parse(localStorage.getItem('options')),
            options = [];

        if (jsonOptions) {
            for (let i = 0; i < jsonOptions.length; i++) {
                let name = jsonOptions[i].name,
                    color = jsonOptions[i].color;
                options.push(new Option(name, color));
            }
        }

        return options;
    }

    /**
     * @param {int} index
     * @param {Option} option
     */
    public saveOption(index: number, option: Option) {
        let options = this.getOptions();
        options[index] = option;
        this.saveOptions(options);
    }

    /**
     * @param {Option[]} options
     */
    public saveOptions(options: Option[]) {
        localStorage.setItem('options', JSON.stringify(options));
    }

    /**
     * @param {int} index
     */
    public deleteOption(index: number) {
        let options = this.getOptions();
        options.splice(index, 1);
        this.saveOptions(options);
    }
}