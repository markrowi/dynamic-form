$(document).ready(function(){
    const form_content = webData.form_content
    let $forms = [];
    let $wizards = [];

    



       var wizz = new WizardManager(form_content);        
    wizz.init();

    
    function WizardManager(fc){
        const frmLen = fc.length;
        let currentWiz = 0;
        let $wzrd = []
        let btn = "";
        let self = this;
    
        this.init = function init(){
            render()
            $wzrd[currentWiz].addClass('active')
        }

        function render() {
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
                $wzrd.push($renderd);
                
                bind($renderd)
                $('#app').append($renderd)
            })
        }

        function bind(wz){
            wz.on('click','.actions .btn[data-action="NEXT"]', function(){
                next()
            })

            wz.on('click','.actions .btn[data-action="BACK"]', function(){
                  back()
              })
        }

        

        function next(){
            $wzrd[currentWiz].removeClass('active');
            $wzrd[++currentWiz].addClass('active');
        }

        function back(){
            $wzrd[currentWiz].removeClass('active');
            $wzrd[--currentWiz].addClass('active');
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

    $.each(this.fields, function(i, field){
        $content.find('.form-content').append('<div class="row">'+ field['field-name'] +'</div>')
    })    

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


function Component(type, content){
    this.id;
    this.label;
    this.require = false;

}



Component.prototype.render = function render(){
    // Here is what you will do for a generic component
}

