$(document).ready(function(){
    const form_content = webData.form_content
    let $forms = [];
    let $wizards = [];

    var wizz = new WizardManager(form_content);        
    wizz.init();
    
    function WizardManager(fc){
        const frmLen = fc.length;
        this.app = $('#app');
        this.currentWiz = 0;
        this.$wzrd = [];
        let btn = "";
        let self = this;
    
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

                $wizards.push(wz);
                self.$wzrd.push($renderd);
                
                // bind($renderd)
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

            //DatePicker
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



});



    function Wizard(wz){
        this.name = wz.name; 
        this.fields = wz.fields;
    }

    Wizard.prototype.render = function render (btn) {
    $content = $(`<div class="container-fluid wizard" data-wizard=${this.name}>
                <div class="row actions action-top"></div>
                <div class="row form-content"><h1>${this.name}</h1></div>
                <div class="row actions action-bottom"></div>
            </div>`)
 

    $.each(btn.top, function(i, btn){
        $content.find('.action-top').append(actionTemplate(btn))
    })
    $.each(btn.bottom, function(i, btn){
        $content.find('.action-bottom').append(actionTemplate(btn))
    })

    var form = new Form(this.fields);

    $content.find('.form-content').append(form.render())

    return $content;
}

// Form.prototype.nextWizard = function nextWizard(){
//     // this.$content.data('index')
// }


function actionTemplate(btn){
    return `<div class="col-md-12">
            <input type="button" name="" data-action="${btn.action}" class="btn btn-primary form-control" id="" value="${btn.label}">
        </div>`
}



