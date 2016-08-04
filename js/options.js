var app = app || {};

(function(){
    var optionsStorageField = 'rouletteOptions';

    app.options = {

        init: function() {

        },

        /**
         * @returns {Array}
         */
        getOptions: function() {
            var jsonOptions = localStorage.getItem(optionsStorageField);

            return JSON.parse(jsonOptions) || [];
        },

        /**
         *
         * @param {Array} optionList
         */
        setOptions: function(optionList) {
            localStorage.setItem(optionsStorageField, JSON.stringify(optionList));
        }

    };
}());
