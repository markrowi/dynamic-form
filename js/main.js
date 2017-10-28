$(document).ready(function(){
   
    // For integration
    // 
    // pull data here
    //
    // http://events.enlo.digital/api/event/1
    $.get('http://events.enlo.digital/api/event/14/record/1', function(res){
        res.form_content = JSON.parse(res.form_content);
        console.log(res)
        var wizz = new WizardManager(res);        
     
        wizz.init();
        window.app.wizz = wizz;
    })
    
    //Save URL here
    //Save data here.
    // Please see WizardManager.js Line 194 for the submit function. 
    //
    window.app.saveUrl = '';

});



  





