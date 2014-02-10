$(document).ready(function() {
	var av = new AccountValidator();
	var sc = new SignupController();

	$('#account-form').ajaxForm({
		url: '/signup/',
		beforeSubmit: function(formData, jqForm, options) {
			return av.validateForm();
		},
		success: function(responseText, status, xhr, $form) {
			if (status == 'status') //$('.modal-alert').modal('show');
			console.log("success");
			console.log('??');
		},
		error: function(e) {
			console.log("error: " + e.responseText);
			if (e.responseText == 'email-taken') {
				av.showInvalidEmail();
			}
			else if(e.responseText == 'username-taken') {
				av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();

	//Customize signup form
	$('#account-form h1').text('Signup');
	$('#account-form #sub1').text('Please tell us a little about yourself');
	$('#account-form #sub2').text('Choose you\'re username & password');
	$('#signup_close_btn').html('Cancel');
	$('#signup_submit_btn').html('Submit');
	$('#signup_submit_btn').addClass('btn-primary');

	//Setup alert that displays when an account is successfully created
	$('.modal-alert').modal({ show: false, keyboard: false, backdrop: 'static' });
	$('.modal-alert .modal-header h3').text('success');
	$('.modal-alert .modal-body p').html('Your account has been created.');
})