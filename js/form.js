function Form(fields, parent_id){
    this.fields = fields
    this.parent_id = parent_id || null
}

Form.prototype.bindEvent = function bindEvent($frm){
    $frm.find('.input-group.date').datepicker({});
    
}

Form.prototype.render = function(){
    var components = app.Components;
    let $form = $('<div class="form"></div>')

    $.each(this.fields, function(i, field){
        if(components[field.field_type]!==undefined){
            // form+=components[field.field_type](field).wrapFormGroup();
            console.log(field['field-col'], field.field_type)
            //Subform always 0;

            $form.append(components[field.field_type](field)
                    .wrapFormGroup()
                    .wrapCol(field.field_type==='subform'? 0 : field['field-col']));
        }
    })
    
    this.bindEvent($form)
    return $form

}

String.prototype.wrapFormGroup = function wrapFormGroup(){
    return '<div class="form-group">' + this + '</div>'
}

String.prototype.wrapCol = function wrapCol(num){
    return `<div class="${num>0?'col-md-6':'col-md-12'}">${this}</div>`
}

