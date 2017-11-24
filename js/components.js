(function(){
    var components = []
    function TextBoxComponent(comp){
        // <label ${!comp['label-visibible']?"hidden":""} for="">${comp['field-label']}</label>
        comp['value'] = comp['value'] || "";
        return `
        
        <input 
            type="text" 
            class="form-control" 
            value="${comp['value']}"
            data-parsley-errors-messages-disabled
            ${comp['numeric-only']?'data-parsley-type="number"':''} 
            data-field-type='${comp['field_type']}'  ${comp['field-required']?'required=""':''} 
            placeholder="${comp['field-placeholder']}"
        >`;
    }
    
    function EmailComponent(comp){
        comp['value'] = comp['value'] || "";
        return `
        
        <input 
            type="email"
            class="form-control"  
            data-parsley-errors-messages-disabled
            data-field-type='${comp['field_type']}'  
            ${comp['field-required']?'required':''} 
            placeholder="${comp['field-placeholder']}"
            value="${comp['value']}"
        />`;
    }
    
    function LocationComponent(comp){
        let loc = comp.value?comp.value.split('||') : ["",""];
        return `
        
        <select
            ${comp['field-required']?'required':''} 
            data-parsley-errors-messages-disabled
            class="form-control field-location-province" 
            data-field-type='${comp['field_type']}' 
            placeholder="Province"
            data-value="${loc[0]}"
        >
            <option value="" disabled selected>Select Province</option>
        </select>`.wrapFormGroup() + 
        `<i class="fa  fa-circle-o-notch fa-spin text-danger city-loader hidden"></i>
        <select 
            ${comp['field-required']?'required':''} 
            disabled 
            data-parsley-errors-messages-disabled
            class="form-control field-location-city" 
            data-field-type='${comp['field_type']}' 
            placeholder="City"
            data-value="${loc[1]}"
        >
            <option value="" disabled selected>Select City</option>
        </select>`.wrapFormGroup() 
    }
    
    function DateComponent(comp){
        comp['value'] = comp['value'] || "";
        return `
        
        <div class="input-group date">
            <input 
                type="text" 
                class="form-control"  
                data-parsley-errors-messages-disabled
                value="${comp['value']}"
                placeholder="${comp['field-placeholder']}"
                ${comp['field-required']?'required':''} 
            > 
                <span class="input-group-addon">
                    <i class="fa fa-calendar"></i>
                </span>
        </div>`;
    }
    
    function TextAreaComponent(comp){
        comp['value'] = comp['value'] || "";
        return `
        
        <textarea 
            type="textbox"
            class="form-control" 
            data-parsley-errors-messages-disabled
            ${comp['field-required']?'required':''} 
            placeholder="${comp['field-placeholder']}"
        >${comp['value']}</textarea>`;
    }
    
    function LabelComponent(comp){
        return `<label class="component-label" style="color:${comp['label-color']}">${comp['label-title']}</label>`
    }
    
    function DividerComponent(comp){
        return `<hr style="border-top: ${comp['divider-size']} solid ${comp['divider-color']}; border-right-style: solid; border-bottom-style: solid; border-left-style: solid"/>`
    }

    function DropdownComponent(comp){
        // <label ${!comp['label-visibible']?"hidden":""}  for="">${comp['field-label']}</label>
        return `
                <select id="" ${comp['field-required']?'required':''} class="form-control" data-parsley-errors-messages-disabled placeholder="">
                ${comp['field-required']?`<option value="" disabled selected>${comp['field-placeholder']}</option>`:''}
                ${
                    comp['field-options'].map(function(opt, index){
                    return  `<option ${comp['value']===opt.value?'selected':''} value="${opt.value}">${opt.label}</option>`;
                    })
                }
                </select>`;
    }

    function RadioComponent(comp){
     
        let random  =new Date().getMilliseconds();
        return `<label  for="">${comp['field-label']}</label>
                <div class="form-group field-radio-group" id="${comp['field-name'] + '_' + random}" data-field-name="${comp['field-name']}" placeholder="">
                ${
                    $.map(comp['field-options'],function(opt, index){
                    return  `<div class="radio">
                        <label>
                            <input type="radio" 
                            name="${comp['field-name'] + '_' + random}" 
                            data-parsley-errors-container="#${comp['field-name'] + '_' + random}" 
                            ${comp['value']===opt.value?'checked':''} 
                            ${comp['field-required']?'required':''}  
                            value="${opt.value}">${opt.label}</label></div>`;
                    }).join(' ')
                }
                </div>`;
    }

    function CheckboxComponent(comp){
        let random  =new Date().getMilliseconds();
        let checked = comp['value']?comp['value'].split('||'):[]
        return `<label  for="">${comp['field-label']}</label>
                <div class="form-group field-checkbox-group" id="${comp['field-name'] + '_' + random}"  data-field-name="${comp['field-name']}" placeholder="">
                ${
                    $.map(comp['field-options'],function(opt, index){
                    return  `<div class="checkbox">
                        <label>
                            <input ${checked.indexOf(opt.value)>-1?'checked':''} name="${comp['field-name'] + '_' + random + '[]'}" data-parsley-errors-container="#${comp['field-name'] + '_' + random}" type="checkbox" ${comp['field-required']?'required':''}  value="${opt.value}">${opt.label}</label></div>`;
                    }).join(' ')
                }
                </div>`;
                //data-parsley-mincheck=""
            }

    function SubformComponent(comp){
        let subforms = [];
        var subformsHtml = "";

        var frm = new Form(comp.fields, comp['form_id'], this.id);
        window.app = window.app || {};
        window.app.subforms = window.app.subforms || [];
        window.app.subforms[comp['form_id']] = frm;
        var self = this;
        
        if(comp.value){
            $.each(comp.value, function(ind, vSub){
                var newSub = {id:vSub.id, 'form_id':comp['form_id'], 'parent_id':self.id, fields:[]};
                $.each(comp.fields, function(index, nsub){
                    newSub.fields.push(_extends({}, nsub, {
                        value: vSub[(nsub['field-name'] + '').toLowerCase()] || ""
                    }));
                })
                subforms.push(newSub);
            })
            subformsHtml =  subforms.map(function(sform, frmIndex){
                let tempFrm = new Form(sform.fields, sform['form_id'], self.id, sform.id); // Insert data id here
                // console.log('sform', sform)
                return tempFrm.render(true).wrapSubform(frmIndex!==0);
            }).join('');
        }
        // return `<div class="subform" data-type="subform" data-form-id="${comp['form_id']}">
        //             <label for="">${comp['field-label']}</label>
        //             <div class="container-fluid subform-content">
        //                ${subforms.length===0?frm.render(true).wrapSubform(false):subformsHtml}</div>
        //             <div class="form-group"> <span data-form-id=${comp['form_id']} class="form-btn subform-add"><i class="fa fa-plus"></i> Add ${comp['field-label']}</span></div>
        //             <div class="clearfix"></div>
        //         </div>`;
        let visibility = (comp['subform-allow-multiple-values']) ? '' : 'hidden';
        
        return `<div class="subform" data-type="subform" data-form-id="${comp['form_id']}">
                    <label for="">${comp['field-label']}</label>
                    <div class="container-fluid subform-content">
                        ${subforms.length===0?frm.render(true).wrapSubform(false):subformsHtml}</div>
                    <div class="form-group"> <span data-form-id=${comp['form_id']} class="form-btn subform-add ${visibility}"><i class="fa fa-plus"></i> Add ${comp['field-label']}</span></div>
                    <div class="clearfix"></div>
                </div>`;
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



    function readInput($comp){
        var inputs = []
        $comp.find(':input').each(function(index, inp){
            inputs.push($(inp).val());
        })

        return inputs.join('||');
    }

    function readOption($comp){
        var inputs = []
        $comp.find(':checked').each(function(index, inp){
            inputs.push($(inp).val());
        })

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


String.prototype.wrapComponent = function wrapComponent(field, id="", parent_id=null){
    return `<div class="form-group component ${parent_id?"subform-component":"parent-component"}" 
        data-form-id="${id}" 
        data-field-type="${field.field_type}" 
        data-field-name="${field['field-name']||field['form-name']}">
            ${this}
        </div>`
}

String.prototype.wrapSubform = function wrapSubform(isRemovable=true){
    return `<div class="subform-wrapper">
    <div class="row text-right">
            ${isRemovable?'<span class="form-btn subform-remove"><i class="fa fa-close"></i> Remove</span>':''}
    </div>
    ${this}
    </div>`
}
