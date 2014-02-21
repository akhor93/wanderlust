$(document).ready(function(){

// main login form //
	$('#new-trip-form').ajaxForm({
		url: '/trip',
		beforeSubmit : function(formData, jqForm, options){
			//Add Validations
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') location.reload(true);
		},
		error : function(e){
			console.log("ERROR submitting form: " + e.responseText);
      		$('#trip_alert_container').html('');
      		$('#trip_alert_container').append('<div class="alert alert-danger">Error Creating Trip: ' + e.responseText + '</div>');
		}
	});

	//TODO bind to specific modal
	$('#login-username-tf').focus();

});