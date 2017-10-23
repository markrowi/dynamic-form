$(document).ready(function(){
    const form_content = webData.form_content
    let $forms = [];


    FormManager(form_content)

    function FormManager(fc){
        const frmLen = fc.length;
        let btn = "";
        
        
    
        $.each(fc, (index, frm)=>{
    
            //Btn


            if(frmLen === (++index) ){

                btn = "Submit"    
            }else{
                btn = "Next"
                // data-next = index++          
            }
    
    
            var $frm = FormBuilder(frm);

            $forms.push($frm);
    
        })
    
    }



});



// function Wizard(){
//     this.$content;
// }

// Form.prototype.nextWizard = function nextWizard(){
//     // this.$content.data('index')
// }


function ActionManager(frm){
    
}

function FormBuilder(frm, btn){
    console.log(frm)
    let form = $(`<form>
    <div class="col-lg-12 action-top"></div>

    <div class="col-lg-12 action-bottom"></div>
    </form`);

    $.each(frm.fields, (index, field)=>{
        console.log(field)
    })


    return form;
    console.log(btn)

}


function Component(){
    this.id;
    this.label;
    this.require = false;
}



Component.prototype.render = function render(){
    // Here is what you will do for a generic component
}


function compInput(conf){

    let inp =  `<div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
    </div>
    `
    
    switch(conf.type){
        case "text" : {
            inp = `<input type="text" class="form-control" id="exampleInputEmail1" placeholder="Email">`;
        }
        case "number" : {
            inp = `<input type="number" class="form-control" id="exampleInputEmail1" placeholder="Email">`;
        }
        case "email" : {
            inp = `<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">`;
        }
        case "password": {
            inp = `<input type="password" class="form-control" id="exampleInputEmail1" placeholder="Email">`;
        }
    }

    var $wrapper = componentWrapper();

    $wrapper.append(inp);


}

function componentWrapper(fr,lbl){
    return  $(`<div class="form-group">
                <label for="${fr}">${lbl}</label>
            </div>`)
}