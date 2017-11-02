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

        $('body').css({
            'color': parent_form.font_color || '#333',
            'background-color': parent_form.primary_color
        });

        $('.logo').attr('src', window.app.url + '/' + parent_form.logo);

        $('#success-message > p').html(window.app.successMessage);
    };

    this.render = function render() {

        $.each(fc, function (index, frm) {
            // console.log(frm)
            var btn = {
                top: [],
                bottom: []
                //Btn
            };if (index !== 0) {
                btn.bottom.push({
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
            $subformContent.append(window.app.subforms[formId].render(true).wrapSubform());
        });

        self.app.on('click', '.subform-remove', function () {
            var $this = $(this);
            $this.closest('.subform-wrapper').remove();
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
            pre_register: 1,
            form_id: parent_form.id,
            parent_id: 0,
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
                    pre_register: 1,
                    form_id: $comp.children().data('form-id'),
                    parent_id: $comp.data('form-id'),
                    data: []
                    //  **  get all subform ** //
                };var $subforms = $comp.find('.form');

                $.each($subforms, function (si, subf) {
                    var $subf = $(subf);
                    var $subCom = $subf.find('.subform-component');

                    var subFcomp = {
                        record_id: $subf.data('record-id'),
                        parent_id: subForm.parent_id,
                        form_id: subForm.id,
                        pre_register: 1
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
            $("#dialog-confirm").dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Yes": function Yes() {
                        $('[data-action="SUBMIT"]').attr('disabled', true);
                        $.post({
                            url: window.app.saveUrl,
                            data: {
                                'request_data': JSON.stringify(window.app.wizz.getData())
                            },
                            success: function success() {

                                $("#success-message").dialog({
                                    modal: true,
                                    buttons: {
                                        Ok: function Ok() {
                                            if (window.app.redirectUrl) {
                                                window.location.href = window.app.redirectUrl;
                                            } else {
                                                window.location.href = "";
                                            }
                                            $(this).dialog("close");
                                        }
                                    }
                                });
                            },
                            error: function error() {
                                $('[data-action="SUBMIT"]').attr('disabled', false);
                            }
                        });
                        $(this).dialog("close");
                    },
                    "No": function No() {
                        $(this).dialog("close");
                    }
                }
            });
        }

        console.log(window.app.wizz.getData());
    }

    function back() {
        self.$wzrd[self.currentWiz].removeClass('active');
        self.$wzrd[--self.currentWiz].addClass('active');
    }
}