window.app = window.app || {};
window.app.saveUrl = '';
window.app.getUrl = '';

$(document).ready(function () {
  
  var form_id = $('[name="form-id"]').val();
  var url= $('[name="url"]').val();

  // Do some code here to fill the get url;


  //Save URL here
  // Please see WizardManager.js Line 187 for the submit function. 
  //
  window.app.saveUrl = url+'/api/event/store';

  //Retrieve URL here
  //http://events.enlo.digital/api/event/14/record/1
  if(form_id || url) {
    window.app.getUrl = url+'/api/event/'+form_id;
  }
});