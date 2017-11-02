'use strict';

window.app = window.app || {};
window.app.saveUrl = '';
window.app.getUrl = '';
window.app.url = '';
window.app.redirectUrl = '';
window.app.successMessage = '';
$(document).ready(function () {

  var form_id = $('[name="form-id"]').val();
  window.app.url = $('[name="url"]').val();
  window.app.redirectUrl;
  // Do some code here to fill the get url;

  //Redirect Url here
  window.app.redirectUrl = "";

  window.app.successMessage = "Successfuly submited.";

  //Save URL here
  // Please see WizardManager.js Line 187 for the submit function. 
  //
  window.app.saveUrl = window.app.url + '/api/event/store';

  //Retrieve URL here
  //http://events.enlo.digital/api/event/14/record/1
  if (form_id || url) {
    window.app.getUrl = window.app.url + '/api/event/' + form_id;
  }
  // window.app.getUrl = 'http://events.enlo.digital/api/event/16/record/10';
});