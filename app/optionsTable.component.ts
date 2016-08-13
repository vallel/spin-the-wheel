import {Component} from "@angular/core";
import {OptionService, Option} from "./option.service";

@Component({
    selector: 'options-table',
    template: `
        <button class="btn btn-primary pull-right"><span class="glyphicon glyphicon-plus-sign"></span> Agregar opción</button>

        <table id="optionsTable" class="table">
            <thead>
                <th>Opción</th>
                <th>Color</th>
                <th></th>
            </thead>
            <tbody>
                <tr *ngFor="let option of options">
                    <td class="option-description">{{ option.name }}</td>
                    <td width="130">
                        <span class="option-color-display" [ngStyle]="{'background-color': option.color}"></span>
                        <div class="hidden input-group colorpicker-component"><input type="text" readonly class="option-color-value form-control" value="{{ option.color }}"><span class="input-group-addon"><i></i></span></div>
                    </td>
                    <td width="100">
                        <button class="btn delete-option-btn"><span class="glyphicon glyphicon-trash"></span></button><button class="btn edit-option-btn"><span class="glyphicon glyphicon-pencil"></span></button><button class="btn save-option-btn hide pull-right"><span class="glyphicon glyphicon-floppy-disk"></span></button>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    providers: [OptionService]
})

export class OptionsTableComponent {
    options: Option[];

    constructor(optionService: OptionService) {
        this.options = optionService.getOptions();
    }
}