function WizardManager(parent_form){
    const fc = parent_form.form_content;
    const frmLen = fc.length;
    this.app = $('#app');
    this.currentWiz = 0;
    this.$wzrd = [];
    let self = this;
    let $forms = [];
    let wizards = [];
    this.$parseApp = $('.app').parsley();


    this.init = function init(){
        this.render()
        this.bind();
        self.$wzrd[self.currentWiz].addClass('active')
        this.getData();
    }

    this.render = function render() {
        $.each(fc, (index, frm)=>{
            // console.log(frm)
            let btn = {
                top: [],
                bottom: []
            }
            //Btn
            if(index !== 0){
                btn.top.push({
                    label:'Back',
                    action:'BACK'
                }) 
            }
            if(frmLen === (++index) ){
                // btn = "Submit"   
                btn.bottom.push({
                    label:'Submit',
                    action:'SUBMIT'
                }) 
            }else{
                // btn = "Next"
                btn.bottom.push({
                    label:'Next',
                    action:'NEXT'
                })       
            }

        
            var wz = new Wizard(frm, parent_form.id);
            var $renderd = wz.render(btn);


            window.app = window.app || {};
            window.app.wizards = window.app.wizards || [];
            window.app.wizards[wz.name] = wz;
            self.$wzrd.push($renderd);
            this.app.append($renderd)
        })
    }

    this.bind = function bind(){
        self.app.on('click','.actions .btn[data-action="NEXT"]', function(){
            // Validation;
            if(validate()){
                next();
            }
            
        })

        self.app.on('click','.actions .btn[data-action="BACK"]', function(){
              back()
          })
        
        self.app.on('click', '.subform-add', function(){
            var $this = $(this);
            var formId = $this.data('form-id');
            var $subformContent = self.app.find('.subform[data-form-id="' + formId  + '"]>.subform-content');
            $subformContent.append(window.app.subforms[formId].render());
        })

        self.app.on('click', '.subform-remove', function(){
            var $this = $(this);
            var formId = $this.data('form-id');
            var $subformContent = self.app.find('.subform[data-form-id="' + formId  + '"]>.subform-content');
            $subformContent.append(window.app.subforms[formId].render());
        })

        $.each(self.$wzrd, function(index, $wiz){
            console.log($wiz)
            $wiz.attr('data-wiz-step',index);
            
        })

        //Location //autocomplete
        
    }

    this.getData = function getData(){
        
        var subforms = [];
        var components = window.app.Components;
        var $componetns = this.app.find('.parent-component');

        var parentForm = {
            type:'form',
            id:1,
            data: {
            }
        };

        $componetns.each(function(index, com){
            let $comp = $(com);
            const ftype = $comp.data('field-type')

            //  **  If component is a subform ** //

            if(ftype === "subform"){
                var subForm = {
                    type:'subform',
                    id:$comp.children().data('form-id'),
                    parent_id:$comp.data('form-id'),
                    data: []
                }
                //  **  get all subform ** //
                let $subforms = $comp.find('.form');

                $.each($subforms, function(si, subf){
                    var subFcomp = {};
                    let $subf = $(subf);
                    var $subCom = $subf.find('.subform-component');

                    // ** get all components of specific subform ** //
                    $subCom.each(function(index, sfc){
                        let $sfc = $(sfc);
                        let sftype = $sfc.data('field-type');

                        if(components['read-' + sftype]){
                            subFcomp[$sfc.data('field-name')] = components['read-' + sftype]($sfc)
                        }
                    })
                    
                    subForm.data.push(subFcomp);

                })

                subforms.push(subForm);
            }else{
                if(components['read-' + ftype]){
                    parentForm.data[$comp.data('field-name')] = components['read-' + ftype]($comp)
                }
            }
     
        })

        return [].concat(parentForm, subforms);
 
    }

   

    function validate() {
        self.$wzrd[self.currentWiz].find(':input').attr('data-parsley-group','block-'+self.currentWiz);

        
        return self.$parseApp.validate({group:'block-'+self.currentWiz});
        
    }
    

    function next(){
        self.$wzrd[self.currentWiz].removeClass('active');
        self.$wzrd[++self.currentWiz].addClass('active');
    }

    function back(){
        self.$wzrd[self.currentWiz].removeClass('active');
        self.$wzrd[--self.currentWiz].addClass('active');
    }

}