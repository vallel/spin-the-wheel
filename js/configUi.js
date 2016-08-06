var app = app || {};

(function (){
    app.configUi = {
        init: function () {
            populateOptionsTable();
            eventWiring();

            $('.colorpicker-component').colorpicker();
        }
    };

    function eventWiring() {
        $('.config-btn').click(toggleConfigSection);
        $('.delete-option-btn').click(deleteOption);
        $('.edit-option-btn').click(editOption);
        $('.save-option-btn').click(saveOption);
    }

    function toggleConfigSection() {
        var $configBtn = $(this),
            $configSection = $('.config-section'),
            configSectionRealWidth = $configSection.width() + parseInt($configSection.css('padding-left'))
                + parseInt($configSection.css('padding-right')) + parseInt($configSection.css('border-right')),
            newPosition = parseInt($configSection.css('left')) < 0 ? 0 : -configSectionRealWidth,
            newBtnMargin = 10 + (newPosition + configSectionRealWidth);

        $configSection.animate({'left': newPosition + 'px'});
        $configBtn.animate({'margin-left': newBtnMargin + 'px'});
    }

    function deleteOption() {
        var $optionRow = $(this).parents('tr'),
            optionDescription = $optionRow.find('.option-description').text();

        if (confirm('Desea eliminar la opción "'+ optionDescription +'"?')) {

        }
    }

    function editOption() {
        var $optionRow = $(this).parents('tr');
        toggleOptionButtons($optionRow, true);
    }

    function saveOption() {
        var $optionRow = $(this).parents('tr');
        toggleOptionButtons($optionRow, false);
    }

    function toggleOptionButtons($row, editMode) {
        var showHideMethod = editMode ? 'hide' : 'show',
            addRemoveClass = editMode ? 'removeClass' : 'addClass';

        $row.find('.delete-option-btn')[showHideMethod]();
        $row.find('.edit-option-btn')[showHideMethod]();
        $row.find('.save-option-btn')[addRemoveClass]('hide');
    }

    function populateOptionsTable() {
        var options = app.options.getOptions(),
            $table = $('#optionsTable'),
            $tableBody = $table.find('tbody');

        // TODO: move html to templates (need to decide a templating framework/engine)
        $.each(options, function(i, option) {
            var $row = $('<tr></tr>'),
                $optionNameCol = $('<td class="option-description">'+ option.name +'</td>'),
                $optionColorField = $('<div class="hidden input-group colorpicker-component"><input type="text" readonly class="option-color-value form-control" value="'+ option.color +'"><span class="input-group-addon"><i></i></span></div>'),
                $optionColorDisplay = $('<span class="option-color-display"></span>'),
                $optionColorCol = $('<td width="130"></td>'),
                $deleteOptionBtn = $('<button class="btn delete-option-btn"><span class="glyphicon glyphicon-trash"></span></button>'),
                $editOptionBtn = $('<button class="btn edit-option-btn"><span class="glyphicon glyphicon-pencil"></span></button>'),
                $saveOptionBtn = $('<button class="btn save-option-btn hide pull-right"><span class="glyphicon glyphicon-floppy-disk"></span></button>'),
                $optionButtonsCol = $('<td width="100"></td>');

            $optionColorDisplay.css({'backgroundColor': option.color});
            $optionColorCol.append($optionColorDisplay).append($optionColorField);
            $optionButtonsCol.append($deleteOptionBtn).append($editOptionBtn).append($saveOptionBtn);
            $row.append($optionNameCol).append($optionColorCol).append($optionButtonsCol);
            $tableBody.append($row);
        });
    }
}());