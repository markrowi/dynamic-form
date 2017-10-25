function Form(fields, parent_id){
    this.fields = fields
    this.parent_id = parent_id || null
}

Form.prototype.bindEvent = function bindEvent($frm){
    $frm.find('.input-group.date').datepicker({});

    var radio_count = $(window.app).find('.field-radio-group').length;
    $frm.find('.field-radio-group').each(function(index, rg){
        var $rg = $(rg);
        var id = $rg.data('field-name') + '_' + radio_count;
        $rg.attr('id', id);
        $rg.find(':input').attr('name', id).attr('data-parsley-errors-container','#' + id);
    })

    var checkbox_count = $(window.app).find('.field-checkbox-group').length;
    $frm.find('.field-checkbox-group').each(function(index, cg){
        var $cg = $(cg);
        var id = $cg.data('field-name') + '_' + checkbox_count;
        $cg.attr('id', id);
        $cg.find(':input').attr('name', id + '[]').attr('data-parsley-errors-container','#' + id);;
    })

    $frm.find('.field-location-province').on('change', function(){
        var $this = $(this);
        var $city = $this.parent().parent().find('.field-location-city');

        if($this.val()!==''){
            console.log('asda', $city)
            $city.prop('disabled', false)
        }else{
            $city.prop('disabled',true);
            $city.val('')
        }
    })
    // $(':input').attr('data-parsley-group',1)
}

Form.prototype.render = function(){
    var components = app.Components;
    let $form = $('<div class="form"></div>')
    let col = 1;
    $.each(this.fields, function(i, field){
        if(components[field.field_type]!==undefined){

            $form.append(components[field.field_type](field)
                    .wrapFormGroup()
                    .wrapCol(field.field_type==='subform'? 0 : field['field-col']));
        }
    })
    
    this.bindEvent($form)
    $form.append('<div class="clearfix"></div>')
    
    return $form

}

String.prototype.wrapFormGroup = function wrapFormGroup(){
    return '<div class="form-group">' + this + '</div>'
}

String.prototype.wrapCol = function wrapCol(num){
    return `<div class="${num>0?'col-md-6':'col-md-12'}">${this}</div>`
}

