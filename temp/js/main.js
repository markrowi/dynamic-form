'use strict';

$(document).ready(function () {

    if (window.app.getUrl) {
        $.get(window.app.getUrl, function (res) {
            res.form_content = JSON.parse(res.form_content);
            console.log(res);
            var wizz = new WizardManager(res);

            wizz.init();
            window.app.wizz = wizz;
        }).fail(function () {
            $('#app').html("<h3 class='text-center btn-danger'>Something went wrong, please try again later.</h3>");
        });
    } else {
        $('#app').html("<h3 class='text-center btn-danger'>Please set up the config file.</h3>");
    }
});