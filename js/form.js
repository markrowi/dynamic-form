// (function(){
    var components = app.Components;

    function Form(fields, parent_id){
       this.fields = fields
        this.parent_id = parent_id || null
    }

    Form.prototype.render = function(){
        $form = ''//'<form class="row">'


        console.log(this.fields)
        $.each(this.fields, function(i, field){
            if(components[field.field_type]!==undefined){
                $form+=components[field.field_type](field).wrapFormGroup();
            }
        })
        return $form

    }

   
   
    
    
    // Component.prototype.render = function render(){
    //     // Here is what you will do for a generic component
    // }
    String.prototype.wrapFormGroup = function wrapFormGroup(){
        return '<div class="form-group">' + this + '</div>'
    }

    

//     return Form;

// })();

