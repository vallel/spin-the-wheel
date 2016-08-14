export class Option {
    name: string;
    color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
}

export class OptionService {
    getOptions() : Option[] {
        return [
            { name: 'Testing 1', color: '#334355' },
            { name: 'Hola que hace', color: '#6621ae' },
            { name: 'Ola k ace', color: '#ae549f' },
            { name: 'Trolololololo lolo lo', color: '#04fe32' }
        ];
    }

    saveOption(id: number, option: Option) {

    }
}