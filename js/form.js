// (function(){
    var components = app.Components;

    function Form(fields, parent_id){
        this.fields = fields
        this.parent_id = parent_id || null
    }

    Form.prototype.bindEvent = function bindEvent($frm){
        console.log('date')
        $frm.find('.input-group.date').datepicker({});

    }

    Form.prototype.render = function(){
        form = '<div class="form">'//'<form class="row">'
        let $form = $(form)
        $.each(this.fields, function(i, field){
            if(components[field.field_type]!==undefined){
                // form+=components[field.field_type](field).wrapFormGroup();
                $form.append(components[field.field_type](field).wrapFormGroup());
            }
        })
        
        this.bindEvent($form)
        return $form

    }


    String.prototype.wrapFormGroup = function wrapFormGroup(){
        return '<div class="form-group">' + this + '</div>'
    }

    

//     return Form;

// })();

