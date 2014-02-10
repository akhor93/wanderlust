$(document).ready(function(){

	var lv = new LoginValidator();
	var lc = new LoginController();

// main login form //
	$('#login-form').ajaxForm({
		url: '/login',
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	else{
			// append 'remember-me' option to formData to write local cookie //
				formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') location.reload(true);
		},
		error : function(e){
			console.log(e.responseText);
      $('#login_alert_container').html('');
      $('#login_alert_container').append('<div class="alert alert-danger">Incorrect Username and Password</div>');
		}
	});

	//TODO bind to specific modal
	$('#login-username-tf').focus();

// login retrieval form via email //

	// var ev = new EmailValidator();

	// $('#get-credentials-form').ajaxForm({
	// 	url: '/lost-password',
	// 	beforeSubmit : function(formData, jqForm, options){
	// 		if (ev.validateEmail($('#email-tf').val())){
	// 			ev.hideEmailAlert();
	// 			return true;
	// 		}	else{
	// 			ev.showEmailAlert("<b> Error!</b> Please enter a valid email address");
	// 			return false;
	// 		}
	// 	},
	// 	success	: function(responseText, status, xhr, $form){
	// 		ev.showEmailSuccess("Check your email on how to reset your password.");
	// 	},
	// 	error : function(){
	// 		ev.showEmailAlert("Sorry. There was a problem, please try again later.");
	// 	}
	// });
});