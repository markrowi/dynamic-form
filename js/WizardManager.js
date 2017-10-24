function WizardManager(fc){
    const frmLen = fc.length;
    this.app = $('#app');
    this.currentWiz = 0;
    this.$wzrd = [];
    let self = this;
    let $forms = [];
    let wizards = [];

    this.init = function init(){
        this.render()
        this.bind();
        self.$wzrd[self.currentWiz].addClass('active')
    }

    this.render = function render() {
        $.each(fc, (index, frm)=>{
            console.log(frm)
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

        
            var wz = new Wizard(frm);
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
            next()
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

        self.app.on('click', '.subform-remove;', function(){
            var $this = $(this);
            var formId = $this.data('form-id');
            var $subformContent = self.app.find('.subform[data-form-id="' + formId  + '"]>.subform-content');
            $subformContent.append(window.app.subforms[formId].render());
        })


        //Location //autocomplete
        
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