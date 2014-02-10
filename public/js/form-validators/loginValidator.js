function LoginValidator(){

}

LoginValidator.prototype.validateForm = function()
{
	$('#login_alert_container').html('');
	if ($('#login-username-tf').val() == ''){
		$('#login_alert_container').append('<div class="alert alert-danger">Please enter username</div>');
		return false;
	}	else if ($('#login-password-tf').val() == ''){
		$('#login_alert_container').append('<div class="alert alert-danger">Please enter password</div>');
		return false;
	}	else{
		return true;
	}
}