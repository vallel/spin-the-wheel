var app = app || {};

(function (){
    app.configUi = {
        init: function () {
            populateOptionsTable();
            eventWiring();
        }
    };

    function eventWiring() {
        $('.config-btn').click(toggleConfigSection);
        $('.delete-option-btn').click(deleteOption);
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
        var optionDescription = $(this).parents('tr').find('.option-description').text();
        confirm('Desea eliminar la opción "'+ optionDescription +'"?');
    }

    function populateOptionsTable() {
        var options = app.options.getOptions(),
            $table = $('#optionsTable'),
            $tableBody = $table.find('tbody');

        $.each(options, function(i, option) {
            var $row = $('<tr></tr>'),
                $optionNameCol = $('<td class="option-description">'+ option +'</td>'),
                $optionColorCol = $('<td width="100"></td>'),
                $optionDeleteCol = $('<td width="60"><button class="btn delete-option-btn"><span class="glyphicon glyphicon-trash"></span></button></td>');

            $row.append($optionNameCol).append($optionColorCol).append($optionDeleteCol);
            $tableBody.append($row);
        });
    }
}());