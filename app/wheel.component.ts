import {Component, ViewChild, ElementRef, Input, AfterViewInit, Output, EventEmitter} from "@angular/core";
import {AlertService} from "./alert.service";
import {PriceHistoryService, HistoryRecord} from "./price-history.service";

@Component({
    selector: 'wheel',
    templateUrl: 'app/templates/wheel.html',
    providers: [AlertService]
})

export class WheelComponent implements AfterViewInit {
    @ViewChild('wheelCanvas') canvas: ElementRef;

    @Input() options = [];
    @Input() history = [];
    @Input() spinning = 0;

    @Output() onWheelClicked = new EventEmitter();

    context: CanvasRenderingContext2D;

    spinAngleStart = 10;
    startAngle = 0;
    spinTime = 0;
    spinTimeTotal = 0;
    spinTimeout = null;
    arc = 0;

    username: string;

    public constructor(private alertService: AlertService, private priceHistory: PriceHistoryService) { }

    ngAfterViewInit() {
        this.context = this.canvas.nativeElement.getContext("2d");
        this.drawWheel();
    }

    public onCanvasClick() {
        if (!this.spinning) {
            let that = this;
            let onResolve = function(username) {
                that.username = username;
                that.spinTheWheel();
            };
            this.alertService.input('¿Quién participa?', onResolve);
        }
        else {
            this.spinTheWheel();
        }
    }


    public drawWheel() {
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

    /**
     *
     * @param {int} index
     * @param {int} canvasCenterX
     * @param {int} canvasCenterY
     * @param {int} outsideRadius
     * @param {int} insideRadius
     * @param {int} textRadius
     */
    private drawRouletteElement(index, canvasCenterX, canvasCenterY, outsideRadius, insideRadius, textRadius) {
       this.arc = Math.PI / (this.options.length / 2);

        let context = this.context,
            option = this.options[index],          
            angle = this.startAngle + index * this.arc;

        context.fillStyle = option.color;

        context.beginPath();
        context.arc(canvasCenterX, canvasCenterY, outsideRadius, angle, angle + this.arc, false);
        context.arc(canvasCenterX, canvasCenterY, insideRadius, angle + this.arc, angle, true);
        context.stroke();
        context.fill();

        context.save();
        context.shadowOffsetX = -0.5;
        context.fillStyle = "white";
        context.font = "17px Arial";
        context.translate(canvasCenterX + Math.cos(angle + this.arc / 2) * textRadius, canvasCenterY + Math.sin(angle + this.arc / 2) * textRadius);
        context.rotate(angle + this.arc / 2);
        context.fillText(option.name, -context.measureText(option.name).width / 2, 0);
        context.restore();
    }

    /**
     *
     * @param {int} canvasCenterX
     * @param {int} canvasCenterY
     * @param {int} outsideRadius
     */
    private drawArrow(canvasCenterX, canvasCenterY, outsideRadius) {
        let context = this.context;

        context.fillStyle = "black";
        context.beginPath();
        context.moveTo(canvasCenterX - 15, canvasCenterY - (outsideRadius + 20));
        context.lineTo(canvasCenterX + 15, canvasCenterY - (outsideRadius + 20));
        context.lineTo(canvasCenterX, canvasCenterY - (outsideRadius - 30));
        context.lineTo(canvasCenterX - 15, canvasCenterY - (outsideRadius + 20));
        context.fill();
    }

    public spinTheWheel() {
        this.spinning++;
        this.onWheelClicked.emit({value: this.spinning > 0});

        this.spinAngleStart = Math.random() * 10 + 10;
        this.spinTime = 0;
        this.spinTimeTotal = Math.random() * 3 + 10 * 1000;
        this.rotateWheel();
    }

    private rotateWheel(scope = null) {
        scope = scope || this;

        scope.spinTime += 30;
        if(scope.spinTime >= scope.spinTimeTotal) {
            scope.stopRotateWheel();
            return;
        }
        let spinAngle = scope.spinAngleStart - scope.easeOut(scope.spinTime, 0, scope.spinAngleStart, scope.spinTimeTotal);
        scope.startAngle += (spinAngle * Math.PI / 180);
        scope.drawWheel();
        scope.spinTimeout = setTimeout(scope.rotateWheel, 30, scope);
    }

    private stopRotateWheel() {
        clearTimeout(this.spinTimeout);
        let degrees = this.startAngle * 180 / Math.PI + 90;
        let arcd = this.arc * 180 / Math.PI;
        let index = Math.floor((360 - degrees % 360) / arcd);
        this.context.save();
        this.context.font = 'bold 30px Helvetica, Arial';

        let price = this.options[index].name,
            text = 'Tu premio es: ' + price;
        this.alertService.success('Felicidades ' + this.username + '!', text);

        this.spinning--;
        this.onWheelClicked.emit({value: this.spinning > 0});

        if (this.spinning == 1) {
            this.spinning--;
            this.addPriceToHistory(this.username, price);
        }

        this.context.restore();
    }

    private addPriceToHistory(username: string, price: string) {
        this.history.push(new HistoryRecord(username, price));
        this.priceHistory.saveRecords(this.history);
    }

    private easeOut(t, b, c, d) {
        let ts = (t/=d)*t;
        let tc = ts*t;
        return b+c*(tc + -3*ts + 3*t);
    }
}