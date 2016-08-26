import {Component, ViewChild, ElementRef} from "@angular/core";
import {Option, OptionService} from "./option.service";

@Component({
    selector: 'wheel',
    template: '<canvas #wheelCanvas class="wheel-canvas" width="550" height="550"></canvas>',
    providers: [OptionService]
})

export class WheelComponent {
    @ViewChild('wheelCanvas') canvas: ElementRef;

    options: Option[];

    context: CanvasRenderingContext2D;

    ngAfterViewInit() {
        this.context = this.canvas.nativeElement.getContext("2d");
        this.drawWheel();
    }

    public constructor(private optionsService: OptionService) {
        this.options = this.optionsService.getOptions();
    }

    private drawWheel() {
        let canvas = this.canvas.nativeElement;

        if (this.context) {
            let outsideRadius = (canvas.width - 25) / 2,
                insideRadius = outsideRadius / 10,
                textRadius = insideRadius * 6,
                canvasCenterX = canvas.width / 2,
                canvasCenterY = canvas.height / 2;

            this.context.clearRect(0, 0, canvas.width, canvas.height);

            this.context.strokeStyle = "black";
            this.context.lineWidth = 10;

            if (this.options.length > 0) {
                for (var i = 0; i < this.options.length; i++) {
                    this.drawRouletteElement(i, canvasCenterX, canvasCenterY, outsideRadius, insideRadius, textRadius);
                }

                this.drawArrow(canvasCenterX, canvasCenterY, outsideRadius);
            }
        }
    }

    private drawRouletteElement(index, canvasCenterX, canvasCenterY, outsideRadius, insideRadius, textRadius) {
        let context = this.context,
            option = this.options[index],
            arc = Math.PI / (this.options.length / 2),
            angle = index * arc;
        context.fillStyle = option.color;

        context.beginPath();
        context.arc(canvasCenterX, canvasCenterY, outsideRadius, angle, angle + arc, false);
        context.arc(canvasCenterX, canvasCenterY, insideRadius, angle + arc, angle, true);
        context.stroke();
        context.fill();

        context.save();
        context.shadowOffsetX = -0.5;
        context.fillStyle = "white";
        context.font = "17px Arial";
        context.translate(canvasCenterX + Math.cos(angle + arc / 2) * textRadius, canvasCenterY + Math.sin(angle + arc / 2) * textRadius);
        context.rotate(angle + arc / 2);
        context.fillText(option.name, -context.measureText(option.name).width / 2, 0);
        context.restore();
    }

    private drawArrow(canvasCenterX, canvasCenterY, outsideRadius) {
        let context = this.context;

        context.fillStyle = "black";
        context.beginPath();
        context.moveTo(canvasCenterX - 12, canvasCenterY - (outsideRadius + 15));
        context.lineTo(canvasCenterX + 12, canvasCenterY - (outsideRadius + 15));
        context.lineTo(canvasCenterX + 12, canvasCenterY - (outsideRadius - 15));
        context.lineTo(canvasCenterX + 27, canvasCenterY - (outsideRadius - 15));
        context.lineTo(canvasCenterX, canvasCenterY - (outsideRadius - 39));
        context.lineTo(canvasCenterX - 27, canvasCenterY - (outsideRadius - 15));
        context.lineTo(canvasCenterX - 12, canvasCenterY - (outsideRadius - 15));
        context.lineTo(canvasCenterX - 12, canvasCenterY - (outsideRadius + 15));
        context.fill();
    }
}