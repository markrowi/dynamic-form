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