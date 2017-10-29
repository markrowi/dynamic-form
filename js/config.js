window.app = window.app || {};
window.app.saveUrl = '';
window.app.getUrl = '';

$(document).ready(function () {
    // Do some code here to fill the get url;
     
    
    //Save URL here
    // Please see WizardManager.js Line 187 for the submit function. 
    //
    window.app.saveUrl = '';


    //Retrieve URL here
    //http://events.enlo.digital/api/event/14/record/1
    window.app.getUrl = 'http://events.enlo.digital/api/event/14/record/1';
});

