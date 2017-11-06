"use strict";

function Form(fields) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var parent_id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var record_id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    this.fields = fields;
    this.parent_id = parent_id;
    this.id = id;
    this.record_id = record_id;
}

function populateSelect($select, list, val, desc) {
    var placeholder = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

    $select.empty();
    $select.append("<option disabled selected value=\"\">" + placeholder + "</option>");
    $.each(list, function (index, item) {
        $select.append("<option value=\"" + item[val] + "\">" + item[desc] + "</option>");
    });
    if ($select.data('value') !== "") {
        $select.find('option[value="' + $select.data('value') + '"]').attr('selected', '');
        $select.trigger('change');
    }
}

Form.prototype.bindEvent = function bindEvent($frm) {
    $frm.find('.input-group.date').datepicker({});

    var provinces = window.app.Provinces || [];

    if (provinces.length === 0) {
        $.get('http://events.enlo.digital/api/provinces', function (res) {

            window.app.Provinces = res;
            $.each($frm.find('.field-location-province'), function (index, prv) {
                populateSelect($(prv), res, 'provDesc', 'provDesc', "Select Province");
            });
        });
    } else {
        $.each($frm.find('.field-location-province'), function (index, prv) {
            populateSelect($(prv), window.app.Provinces, 'provDesc', 'provDesc', "Select Province");
        });
    }

    $frm.on('change', '.field-location-province', function () {
        var $this = $(this);
        var $city = $this.closest('.component').find('.field-location-city');
        var $cityLoader = $this.closest('.component').find('.city-loader');

        if ($this.val() !== '') {
            $city.prop('disabled', true);
            $cityLoader.removeClass('hidden');
            $city.val('');
            $.get('http://events.enlo.digital/api/cities/' + $this.val(), function (res) {
                $.each($city, function (index, prv) {
                    populateSelect($(prv), res, 'citiesmunDesc', 'citiesmunDesc', "Select City");
                });
                $cityLoader.addClass('hidden');
                $city.prop('disabled', false);
            });
        } else {
            $city.prop('disabled', true);
            $city.val('');
        }
    });

    // $(':input').attr('data-parsley-group',1)
};

Form.prototype.render = function render(isHtml) {
    var components = app.Components;
    var $form = $('<div class="form" data-record-id="' + this.record_id + '"  data-form-id="' + this.id + '" data-form-parent-id="' + this.parent_id + ' "></div>');
    var col = 1;
    var self = this;

    $.each(this.fields, function (i, field) {
        if (components[field.field_type] !== undefined) {

            $form.append(components[field.field_type].call(self, field).wrapComponent(field, self.id, self.parent_id).wrapCol(field.field_type === 'subform' ? 0 : field['field-col']));
        }
    });

    this.bindEvent($form);
    $form.append('<div class="clearfix"></div>');

    return isHtml ? $form[0].outerHTML : $form;
};

Form.prototype.data = function data() {};
String.prototype.wrapFormGroup = function wrapFormGroup() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    return '<div class="form-group">' + this + '</div>';
};

String.prototype.wrapCol = function wrapCol(num) {
    return "<div class=\"" + (num > 0 ? 'col-md-6' : 'col-md-12') + "\">" + this + "</div>";
};