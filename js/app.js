var app = {};

(function () {
    var optionsStorageField = 'rouletteOptions',
        spinAngleStart = 10,
        startAngle = 0,
        spinTime = 0,
        spinTimeTotal = 0,
        spinTimeout = null,
        options = getOptions(),
        arc = Math.PI / (options.length / 2),
        ctx,
        colors = getColors();

    function spin() {
        spinAngleStart = Math.random() * 10 + 10;
        spinTime = 0;
        spinTimeTotal = Math.random() * 3 + 10 * 1000;
        rotateWheel();
    }

    function rotateWheel() {
        spinTime += 30;
        if(spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI / 180);
        drawRouletteWheel();
        spinTimeout = setTimeout(rotateWheel, 30);
    }

    function stopRotateWheel() {
        clearTimeout(spinTimeout);
        var degrees = startAngle * 180 / Math.PI + 90;
        var arcd = arc * 180 / Math.PI;
        var index = Math.floor((360 - degrees % 360) / arcd);
        ctx.save();
        ctx.font = 'bold 30px Helvetica, Arial';
        var text = options[index];
        //ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);

        alertModal(text);

        ctx.restore();
    }

    function alertModal(text) {
        var title = title || '',
            $alertModal = $('#alertModal');

        $alertModal.find('.modal-title').text(text);
        $alertModal.modal('show');
    }

    function easeOut(t, b, c, d) {
        var ts = (t/=d)*t;
        var tc = ts*t;
        return b+c*(tc + -3*ts + 3*t);
    }

    function drawRouletteWheel() {
        var canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            var outsideRadius = (canvas.width - 25) / 2,
                insideRadius = outsideRadius / 10,
                textRadius = insideRadius * 6,
                canvasCenterX = canvas.width / 2,
                canvasCenterY = canvas.height / 2;

            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "black";
            ctx.lineWidth = 10;

            if (options.length > 0) {
                for (var i = 0; i < options.length; i++) {
                    drawRouletteElement(i, canvasCenterX, canvasCenterY, outsideRadius, insideRadius, textRadius);
                }

                //Arrow
                drawArrow(canvasCenterX, canvasCenterY, outsideRadius);

                showSpinRouletteButton();
            }
        }
    }

    function drawRouletteElement(index, canvasCenterX, canvasCenterY, outsideRadius, insideRadius, textRadius) {
        var angle = startAngle + index * arc;
        ctx.fillStyle = getColor(index);

        ctx.beginPath();
        ctx.arc(canvasCenterX, canvasCenterY, outsideRadius, angle, angle + arc, false);
        ctx.arc(canvasCenterX, canvasCenterY, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.shadowOffsetX = -0.5;
        //ctx.shadowOffsetY = -1;
        //ctx.shadowBlur = 0.2;
        //ctx.shadowColor = "rgb(210,210,210)";
        ctx.fillStyle = "white";
        ctx.font = "17px Arial";
        ctx.translate(canvasCenterX + Math.cos(angle + arc / 2) * textRadius, canvasCenterY + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2);
        var text = options[index];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
    }

    function drawArrow(canvasCenterX, canvasCenterY, outsideRadius) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(canvasCenterX - 12, canvasCenterY - (outsideRadius + 15));
        ctx.lineTo(canvasCenterX + 12, canvasCenterY - (outsideRadius + 15));
        ctx.lineTo(canvasCenterX + 12, canvasCenterY - (outsideRadius - 15));
        ctx.lineTo(canvasCenterX + 27, canvasCenterY - (outsideRadius - 15));
        ctx.lineTo(canvasCenterX, canvasCenterY - (outsideRadius - 39));
        ctx.lineTo(canvasCenterX - 27, canvasCenterY - (outsideRadius - 15));
        ctx.lineTo(canvasCenterX - 12, canvasCenterY - (outsideRadius - 15));
        ctx.lineTo(canvasCenterX - 12, canvasCenterY - (outsideRadius + 15));
        ctx.fill();
    }

    /**
     *
     * @param {int} index
     * @returns {string}
     */
    function getColor(index) {
        var color;
        if (index >= colors.length) {
            index -= colors.length;
            color = getColor(index);
        }
        else {
            color = colors[index];
        }

        return color;
    }

    function getColors() {
        return ["#B8D430", "#3AB745", "#029990", "#3501CB",
            "#2E2C75", "#673A7E", "#CC0071", "#F80120",
            "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"];
    }

    /**
     * @returns {Array}
     */
    function getOptions() {
        var jsonOptions = localStorage.getItem(optionsStorageField);

        return JSON.parse(jsonOptions) || [];
    }

    /**
     *
     * @param {Array} optionList
     */
    function setOptions(optionList) {
        localStorage.setItem(optionsStorageField, JSON.stringify(optionList));
        options = optionList;
        arc = Math.PI / (options.length / 2);
    }

    function showOptionsModal() {
        var options = getOptions();
        $.each(options, function(i, option) {
            addOptionToList(option);
        });
        $('#optionsModal').modal('show');
        $('#addOptionText').focus();
    }

    function showSpinRouletteButton() {
        $('#spinWheelBtn').removeClass('hidden');
    }

    function hideSpinRouletteButton() {
        $('#spinWheelBtn').addClass('hidden');
    }

    function addOptionToList(option) {
        if (option) {
            var optionElement = $($('#optionElementTemplate').html()).clone();
            optionElement.find('.optionText').text(option);
            $('#optionsList').append(optionElement);
        }
    }

    function removeOptionFromList() {
        $(this).parent().remove();
    }

    function saveOptions() {
        var elements = $('#optionsList').find('.optionText'),
            newOptions = [];

        $.each(elements, function() {
            newOptions.push($(this).text());
        });

        setOptions(newOptions);

        $('#optionsList').html('');

        hideSpinRouletteButton();
        drawRouletteWheel();
    }

    app.init = function () {
        drawRouletteWheel();
        eventWiring();

        app.options.init();
        app.configUi.init();
    };

    function eventWiring() {
        $('#spinWheelBtn').click(spin);
        $('#editOptionsBtn').click(showOptionsModal);
        $('#addOptionBtn').click(function() {
            var option = $('#addOptionText').val();
            addOptionToList(option);
            $('#addOptionText').val('').focus();
        });
        $('#optionsList').on('click', '.removeOptionElementBtn', removeOptionFromList);
        $('#saveOptionsBtn').click(saveOptions);

    }

}());

$(function () {
    app.init();
});