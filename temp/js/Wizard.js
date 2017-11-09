'use strict';

function Wizard(wz, id) {
    this.name = wz.name;
    this.fields = wz.fields;
    this.id = id;
}

Wizard.prototype.render = function render(btn) {
    var $content = $('<div class="container-fluid wizard" data-wizard=' + this.name + '>\n                <div class="row actions action-top"></div>\n                <div class="row form-content"><h1>' + this.name + '</h1></div>\n                <div class="row actions action-bottom"></div>\n            </div>');

    $.each(btn.top, function (i, btn) {
        $content.find('.action-top').append(actionTemplate(btn));
    });
    var bBtnCol = 12 / btn.bottom.length;
    $.each(btn.bottom, function (i, btn) {
        $content.find('.action-bottom').append(actionTemplate(btn, bBtnCol));
    });

    var form = new Form(this.fields, this.id);
    var $form = form.render();
    $content.find('.form-content').append($form);

    return $content;
};

function actionTemplate(btn, col) {
    return '<div class="col-md-' + col + ' col-sm-12">\n            <input type="button" name="" data-action="' + btn.action + '" class="btn btn-primary btn-block btn-lg" id="" value="' + btn.label + '">\n        </div>';
}