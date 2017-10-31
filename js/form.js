function Form(fields, id = null, parent_id = null, record_id = null){
    this.fields = fields
    this.parent_id = parent_id;
    this.id = id;
    this.record_id = record_id;
  
}

function populateSelect($select, list, val, desc, placeholder=""){
    $select.empty();
    $select.append(`<option disabled selected value="">${placeholder}</option>`)
    $.each(list, function(index, item){
        $select.append(`<option value="${item[val]}">${item[desc]}</option>`)
    })
    if($select.data('value')!==""){
        $select.find('option[value="'+$select.data('value')+'"]').attr('selected','')
        $select.trigger('change')
    }
}

Form.prototype.bindEvent = function bindEvent($frm){
    $frm.find('.input-group.date').datepicker({});

    var provinces = window.app.Provinces || [];
    

    if(provinces.length === 0){
        $.get('http://events.enlo.digital/api/provinces', function(res){
            
            window.app.Provinces = res;
            $.each($frm.find('.field-location-province'), function(index, prv){
                populateSelect($(prv), res, 'provDesc','provDesc', "Select Province")
            })
           
        })
    }else{
        $.each($frm.find('.field-location-province'), function(index, prv){
            populateSelect($(prv), window.app.Provinces, 'provDesc','provDesc', "Select Province")
        })
    }


    $frm.on('change','.field-location-province', function(){
        var $this = $(this);
        var $city = $this.closest('.component').find('.field-location-city');
        

        if($this.val()!==''){
            $city.prop('disabled', false)
            $.get('http://events.enlo.digital/api/cities/' + $this.val() , function(res){
                $.each($city, function(index, prv){
                    populateSelect($(prv), res, 'citiesmunDesc','citiesmunDesc', "Select City")
                })
                
            })
        }else{
            $city.prop('disabled',true);
            $city.val('')
        }
    })


    // $(':input').attr('data-parsley-group',1)
}

Form.prototype.render = function render(isHtml){
    var components = app.Components;
    let $form = $('<div class="form" data-record-id="'+this.record_id+'"  data-form-id="'+this.id+'" data-form-parent-id="'+this.parent_id+' "></div>')
    let col = 1;
    let self = this;
    
    $.each(this.fields, function(i, field){
        if(components[field.field_type]!==undefined){

            $form.append(components[field.field_type].call(self,field)
                    .wrapComponent(field, self.id, self.parent_id)
                    .wrapCol(field.field_type==='subform'? 0 : field['field-col']));
        }
    })
    
    this.bindEvent($form)
    $form.append('<div class="clearfix"></div>')
    
    return isHtml ? $form[0].outerHTML : $form;

}

Form.prototype.data = function data(){

}
String.prototype.wrapFormGroup = function wrapFormGroup(name=""){
        return '<div class="form-group">' + this + '</div>';
}


String.prototype.wrapCol = function wrapCol(num){
    return `<div class="${num>0?'col-md-6':'col-md-12'}">${this}</div>`
}

