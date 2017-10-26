$(document).ready(function(){
    // const form_content = webData.form_content
    // http://events.enlo.digital/api/event/1/record/1
    // http://events.enlo.digital/api/event/1
    $.get('http://events.enlo.digital/api/event/14/record/1', function(res){
        res.form_content = JSON.parse(res.form_content);
        console.log(res)
        var wizz = new WizardManager(res);        
     
        wizz.init();
        window.app.wizz = wizz;
    })

    // var wizz = new WizardManager({id:1, 'form_content':webData});        
    
    //    wizz.init();
    //    window.app.wizz = wizz;
});



  





