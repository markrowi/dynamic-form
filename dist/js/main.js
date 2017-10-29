'use strict';

(function () {
    var components = [];
    function TextBoxComponent(comp) {
        comp['value'] = comp['value'] || "";
        return '\n        <label for="">' + comp['field-label'] + '</label>\n        <input \n            type="text" \n            class="form-control" \n            value="' + comp['value'] + '"\n            ' + (comp['numeric-only'] ? 'data-parsley-type="number"' : '') + ' \n            data-field-type=\'' + comp['field_type'] + '\'  ' + (comp['field-required'] ? 'required=""' : '') + ' \n            placeholder="' + comp['field-placeholder'] + '"\n        >';
    }

    function EmailComponent(comp) {
        comp['value'] = comp['value'] || "";
        return '\n        <label for="">' + comp['field-label'] + '</label>\n        <input \n            type="email"\n            class="form-control"  \n            data-field-type=\'' + comp['field_type'] + '\'  \n            ' + (comp['field-required'] ? 'required' : '') + ' \n            placeholder="mail@example.com"\n            value="' + comp['value'] + '"\n        />';
    }

    function LocationComponent(comp) {
        var loc = comp.value ? comp.value.split('||') : ["", ""];
        return ('\n        <label for="">Province</label>\n        <select\n            ' + (comp['field-required'] ? 'required' : '') + ' \n            class="form-control field-location-province" \n            data-field-type=\'' + comp['field_type'] + '\' \n            placeholder=""\n            data-value="' + loc[0] + '"\n        >\n            <option value="" disabled selected>Select Province</option>\n        </select>').wrapFormGroup() + ('<label for="">City</label>\n        <select \n            ' + (comp['field-required'] ? 'required' : '') + ' \n            disabled \n            class="form-control field-location-city" \n            data-field-type=\'' + comp['field_type'] + '\' \n            placeholder=""\n            data-value="' + loc[1] + '"\n        >\n            <option value="" disabled selected>Select City</option>\n        </select>').wrapFormGroup();
    }

    function DateComponent(comp) {
        comp['value'] = comp['value'] || "";
        return '\n        <label for="">' + comp['field-label'] + '</label>\n        <div class="input-group date">\n            <input \n                type="text" \n                class="form-control"  \n                value="' + comp['value'] + '"\n                ' + (comp['field-required'] ? 'required' : '') + ' \n            > \n                <span class="input-group-addon">\n                    <i class="fa fa-calendar"></i>\n                </span>\n        </div>';
    }

    function TextAreaComponent(comp) {
        comp['value'] = comp['value'] || "";
        return '\n        <label  for="">' + comp['field-label'] + '</label>\n        <textarea \n            type="textbox"\n            class="form-control" \n            ' + (comp['field-required'] ? 'required' : '') + ' \n            placeholder=""\n            \n        >' + comp['value'] + '</textarea>';
    }

    function LabelComponent(comp) {
        return '<h3 style="color:' + comp['label-color'] + '">' + comp['label-title'] + '</h3>';
    }

    function DividerComponent(comp) {
        return '<hr style="border-top: ' + comp['divider-size'] + ' solid ' + comp['divider-color'] + '; border-right-style: solid; border-bottom-style: solid; border-left-style: solid"/>';
    }

    function DropdownComponent(comp) {
        return '<label  for="">' + comp['field-label'] + '</label>\n                <select id="" ' + (comp['field-required'] ? 'required' : '') + ' class="form-control" placeholder="">\n                ' + (comp['field-required'] ? '<option value="" disabled selected>' + comp['field-placeholder'] + '</option>' : '') + '\n                ' + comp['field-options'].map(function (opt, index) {

            return '<option ' + (comp['value'] === opt.value ? 'selected' : '') + ' value="' + opt.value + '">' + opt.label + '</option>';
        }) + '\n                </select>';
    }

    function RadioComponent(comp) {

        var random = new Date().getMilliseconds();
        return '<label  for="">' + comp['field-label'] + '</label>\n                <div class="form-group field-radio-group" id="' + (comp['field-name'] + '_' + random) + '" data-field-name="' + comp['field-name'] + '" placeholder="">\n                ' + $.map(comp['field-options'], function (opt, index) {
            return '<div class="radio"><label><input type="radio" name="' + (comp['field-name'] + '_' + random) + '" data-parsley-errors-container="#' + (comp['field-name'] + '_' + random) + '" ' + (comp['value'] === opt.value ? 'checked' : '') + ' ' + (comp['field-required'] ? 'required' : '') + '  value="' + opt.value + '">' + opt.label + '</label></div>';
        }).join(' ') + '\n                </div>';
    }

    function CheckboxComponent(comp) {
        var random = new Date().getMilliseconds();
        var checked = comp['value'] ? comp['value'].split('||') : [];
        return '<label  for="">' + comp['field-label'] + '</label>\n                <div class="form-group field-checkbox-group" id="' + (comp['field-name'] + '_' + random) + '"  data-field-name="' + comp['field-name'] + '" placeholder="">\n                ' + $.map(comp['field-options'], function (opt, index) {
            return '<div class="checkbox"><label><input ' + (checked.indexOf(opt.value) ? 'checked' : '') + ' name="' + (comp['field-name'] + '_' + random + '[]') + '" data-parsley-errors-container="#' + (comp['field-name'] + '_' + random) + '" type="checkbox" ' + (comp['field-required'] ? 'required' : '') + '  value="' + opt.value + '">' + opt.label + '</label></div>';
        }).join(' ') + '\n                </div>';
        //data-parsley-mincheck=""
    }

    function SubformComponent(comp) {
        var subforms = [];
        var subformsHtml = "";

        var frm = new Form(comp.fields, comp['form_id'], this.id);
        window.app = window.app || {};
        window.app.subforms = window.app.subforms || [];
        window.app.subforms[comp['form_id']] = frm;
        var self = this;

        if (comp.value) {
            $.each(comp.value, function (ind, vSub) {
                var newSub = { id: vSub.id, 'form_id': comp['form_id'], 'parent_id': self.id, fields: [] };

                $.each(comp.fields, function (index, nsub) {
                    newSub.fields.push(_extends({}, nsub, {
                        value: vSub[(nsub['field-name'] + '').toLowerCase()] || ""
                    }));
                });

                //ES6 Code
                // {
                //     ...nsub, 
                //     value: (vSub[(nsub['field-name'] + '').toLowerCase()] || "") 
                // }


                subforms.push(newSub);
            });
            subformsHtml = subforms.map(function (sform) {

                var tempFrm = new Form(sform.fields, sform['form_id'], self.id, sform.id); // Insert data id here
                // console.log('sform', sform)
                return tempFrm.render()[0].outerHTML;
            }).join('');
        }
        // console.log('subformsHtml', subformsHtml)
        // frm = new Form(comp.fields, comp['form_id'], this.id);

        return '<div class="subform" data-type="subform" data-form-id="' + comp['form_id'] + '">\n                    <label for="">' + comp['field-label'] + '</label>\n                    <div class="container-fluid subform-content">\n                       ' + (subformsHtml === "" ? frm.render()[0].outerHTML : subformsHtml) + '</div>\n                    <div class="form-group pull-right"> <input type="button" data-form-id=' + comp['form_id'] + ' class="btn btn-primary subform-add" value="+ Add"/></div>\n                    <div class="clearfix"></div>\n                </div>';
    }

    components['label'] = LabelComponent;
    components['divider'] = DividerComponent;
    components['textbox'] = TextBoxComponent;
    components['textarea'] = TextAreaComponent;
    components['date'] = DateComponent;
    components['location'] = LocationComponent;
    components['email'] = EmailComponent;
    components['dropdown'] = DropdownComponent;
    components['radio'] = RadioComponent;
    components['checkbox'] = CheckboxComponent;
    components['subform'] = SubformComponent;

    function readInput($comp) {
        var inputs = [];
        $comp.find(':input').each(function (index, inp) {
            inputs.push($(inp).val());
        });

        return inputs.join('||');
    }

    function readOption($comp) {
        var inputs = [];
        $comp.find(':checked').each(function (index, inp) {
            inputs.push($(inp).val());
        });

        return inputs.join('||');
    }

    components['read-textbox'] = readInput;
    components['read-textarea'] = readInput;
    components['read-date'] = readInput;
    components['read-location'] = readInput;
    components['read-email'] = readInput;
    components['read-dropdown'] = readInput;
    components['read-radio'] = readOption;
    components['read-checkbox'] = readOption;

    window.app = window.app || {};
    window.app.Components = components;
})();

String.prototype.wrapComponent = function wrapComponent(field) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var parent_id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return '<div class="form-group component ' + (parent_id ? "subform-component" : "parent-component") + '" data-form-id="' + id + '" data-field-type="' + field.field_type + '" data-field-name="' + (field['field-name'] || field['form-name']) + '">' + this + '</div>';
};
'use strict';

function WizardManager(parent_form) {
    var fc = parent_form.form_content;
    var frmLen = fc.length;
    this.app = $('#app');
    this.currentWiz = 0;
    this.$wzrd = [];
    var self = this;
    var $forms = [];
    var wizards = [];
    this.$parseApp = $('.app').parsley();

    this.init = function init() {
        this.render();
        this.bind();
        self.app.attr('data-record-id', parent_form.record_id || null);
        self.$wzrd[self.currentWiz].addClass('active');
        this.getData();
    };

    this.render = function render() {

        $.each(fc, function (index, frm) {
            // console.log(frm)
            var btn = {
                top: [],
                bottom: []
                //Btn
            };if (index !== 0) {
                btn.top.push({
                    label: 'Back',
                    action: 'BACK'
                });
            }
            if (frmLen === ++index) {
                // btn = "Submit"   
                btn.bottom.push({
                    label: 'Submit',
                    action: 'SUBMIT'
                });
            } else {
                // btn = "Next"
                btn.bottom.push({
                    label: 'Next',
                    action: 'NEXT'
                });
            }

            var wz = new Wizard(frm, parent_form.id, null, parent_form.record_id);
            var $renderd = wz.render(btn);

            window.app = window.app || {};
            window.app.wizards = window.app.wizards || [];
            window.app.wizards[wz.name] = wz;
            self.$wzrd.push($renderd);
            this.app.append($renderd);
        }.bind(this));
    };

    this.bind = function bind() {

        self.app.on('click', '.actions .btn', function () {
            var $this = $(this);
            var action = $this.data('action');

            if (action === 'NEXT') {
                if (validate()) {
                    next();
                }
            } else if (action === 'BACK') {
                back();
            } else if (action === 'SUBMIT') {
                if (validate()) {
                    submit();
                }
            }
        });

        self.app.on('click', '.subform-add', function () {
            var $this = $(this);
            var formId = $this.data('form-id');
            var $subformContent = self.app.find('.subform[data-form-id="' + formId + '"]>.subform-content');
            $subformContent.append(window.app.subforms[formId].render());
        });

        self.app.on('click', '.subform-remove', function () {
            var $this = $(this);
            var formId = $this.data('form-id');
            var $subformContent = self.app.find('.subform[data-form-id="' + formId + '"]>.subform-content');
            $subformContent.append(window.app.subforms[formId].render());
        });

        $.each(self.$wzrd, function (index, $wiz) {
            $wiz.attr('data-wiz-step', index);
        });

        //Location //autocomplete
    };

    this.getData = function getData() {

        var subforms = [];
        var components = window.app.Components;
        var $componetns = this.app.find('.parent-component');
        var self = this;
        var parentForm = {
            type: 'form',
            form_id: parent_form.id,
            record_id: parent_form.record_id,
            data: {}
        };

        $componetns.each(function (index, com) {
            var $comp = $(com);
            var ftype = $comp.data('field-type');

            //  **  If component is a subform ** //

            if (ftype === "subform") {
                var subForm = {
                    type: 'subform',
                    form_id: $comp.children().data('form-id'),
                    parent_id: $comp.data('form-id'),
                    data: []
                    //  **  get all subform ** //
                };var $subforms = $comp.find('.form');

                $.each($subforms, function (si, subf) {
                    var $subf = $(subf);
                    var $subCom = $subf.find('.subform-component');

                    var subFcomp = {
                        id: $subf.data('record-id'),
                        parent_id: subForm.parent_id,
                        form_id: subForm.id
                    };

                    // ** get all components of specific subform ** //
                    $subCom.each(function (index, sfc) {
                        var $sfc = $(sfc);
                        var sftype = $sfc.data('field-type');

                        if (components['read-' + sftype]) {
                            subFcomp[$sfc.data('field-name')] = components['read-' + sftype]($sfc);
                        }
                    });

                    subForm.data.push(subFcomp);
                });

                subforms.push(subForm);
            } else {
                if (components['read-' + ftype]) {
                    parentForm.data[$comp.data('field-name')] = components['read-' + ftype]($comp);
                }
            }
        });

        return [].concat(parentForm, subforms);
    };

    function validate() {
        self.$wzrd[self.currentWiz].find(':input').attr('data-parsley-group', 'block-' + self.currentWiz);

        return self.$parseApp.validate({ group: 'block-' + self.currentWiz });
    }

    function next() {
        self.$wzrd[self.currentWiz].removeClass('active');
        self.$wzrd[++self.currentWiz].addClass('active');
    }

    function submit() {
        if (window.app.saveUrl !== '') {
            $.post({
                url: window.app.saveUrl,
                data: window.app.wizz.getData()
            });
        }

        console.log(window.app.wizz.getData());
    }

    function back() {
        self.$wzrd[self.currentWiz].removeClass('active');
        self.$wzrd[--self.currentWiz].addClass('active');
    }
}
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
    $.each(btn.bottom, function (i, btn) {
        $content.find('.action-bottom').append(actionTemplate(btn));
    });

    var form = new Form(this.fields, this.id);
    var $form = form.render();
    $content.find('.form-content').append($form);

    return $content;
};

function actionTemplate(btn) {
    return '<div class="col-md-12">\n            <input type="button" name="" data-action="' + btn.action + '" class="btn btn-primary form-control" id="" value="' + btn.label + '">\n        </div>';
}
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

    $frm.find('.field-location-province').on('change', function () {
        var $this = $(this);
        var $city = $this.parent().parent().find('.field-location-city');

        if ($this.val() !== '') {
            $city.prop('disabled', false);
            $.get('http://events.enlo.digital/api/cities/' + $this.val(), function (res) {
                $.each($city, function (index, prv) {
                    populateSelect($(prv), res, 'citiesmunDesc', 'citiesmunDesc', "Select City");
                });
            });
        } else {
            $city.prop('disabled', true);
            $city.val('');
        }
    });

    // $(':input').attr('data-parsley-group',1)
};

Form.prototype.render = function render() {
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

    return $form;
};

Form.prototype.data = function data() {};
String.prototype.wrapFormGroup = function wrapFormGroup() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    return '<div class="form-group">' + this + '</div>';
};

String.prototype.wrapCol = function wrapCol(num) {
    return "<div class=\"" + (num > 0 ? 'col-md-6' : 'col-md-12') + "\">" + this + "</div>";
};
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