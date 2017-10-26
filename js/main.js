$(document).ready(function(){
    const form_content = webData.form_content
    
    $.get('http://events.enlo.digital/api/event/1', function(res){
        res.form_content = JSON.parse(res.form_content);
    
        var wizz = new WizardManager(res.form_content);        
        wizz.init();
    })
    
    
});



  





