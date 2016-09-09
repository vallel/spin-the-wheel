import {Component, Input} from "@angular/core";
import {OptionService, Option} from "./option.service";
import {ColorPickerDirective} from './color-picker/color-picker.directive'
import {WheelComponent} from "./wheel.component";

@Component({
    selector: 'options-table',
    templateUrl: 'app/templates/options-table.html',
    directives: [ColorPickerDirective]
})

export class OptionsTableComponent {
    @Input() options = [];
    @Input() wheel: WheelComponent;
    editModeRow = null;
    previousEditRowValues = null;

    constructor(private optionService: OptionService) { }

    addNewOption() {
        this.options.push(new Option('', '#fff'));
        this.editModeRow = this.options.length - 1;
    }

    onDelete(option: Option, index: number) {
        if (confirm('¿Esta seguro de borrar la opción "'+ option.name +'"?')) {
            this.optionService.deleteOption(index);
            this.options = this.optionService.getOptions();
            this.drawWheelCanvas();
        }
    }

    onEdit(index: number) {
        this.restorePreviousValues();
        this.turnOnEditRowMode(index);
    }

    onSave(index: number, option: Option) {
        this.optionService.saveOption(index, option);
        this.turnOffEditMode();
        this.drawWheelCanvas();
    }

    onCancelEdit() {
        this.restorePreviousValues();
        this.turnOffEditMode();
    }

    private turnOnEditRowMode(index: number) {
        let currentOption = this.options[index];
        this.previousEditRowValues = {
            name: currentOption.name,
            color: currentOption.color
        };
        this.editModeRow = index;
    }

    private turnOffEditMode() {
        this.editModeRow = null;
        this.previousEditRowValues = null;
    }

    private restorePreviousValues() {
        if (this.previousEditRowValues != null && this.editModeRow != null) {
            this.options[this.editModeRow] = new Option(this.previousEditRowValues.name, this.previousEditRowValues.color);
            this.previousEditRowValues = null;
        }
    }

    public drawWheelCanvas() {
        this.wheel.drawWheel();
    }
}