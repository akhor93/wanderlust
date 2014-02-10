function AccountValidator(){

// build array maps of the form inputs & control groups //

	this.formFields = [$('#name-tf'), $('#email-tf'), $('#username-tf'), $('#password-tf'), $('#country-list')];
	this.controlGroups = [$('#name-cg'), $('#email-cg'), $('#username-cg'), $('#password-cg'), $('#country-cg')];
	
	this.validateName = function(s)
	{
		return s.length >= 3;
	}
	
	this.validatePassword = function(s)
	{
	// if user is logged in and hasn't changed their password, return ok
		if ($('#userId').val() && s===''){
			return true;
		}	else{
			return s.length >= 6;
		}
	}
	
	this.validateEmail = function(e)
	{
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(e);
	}

	this.validateCountry = function(c) {
		return c != "Please select a country";
	}
}

AccountValidator.prototype.showInvalidEmail = function()
{
	this.controlGroups[1].addClass('has-error');
	// this.showErrors(['That email address is already in use.']);
}

AccountValidator.prototype.showInvalidUserName = function()
{
	this.controlGroups[2].addClass('has-error');
	// this.showErrors(['That username is already in use.']);
}

AccountValidator.prototype.validateForm = function()
{
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('has-error');
	if (this.validateName(this.formFields[0].val()) == false) {
		this.controlGroups[0].addClass('has-error'); e.push('Please Enter Your Name');
	}
	if (this.validateEmail(this.formFields[1].val()) == false) {
		this.controlGroups[1].addClass('has-error'); e.push('Please Enter A Valid Email');
	}
	if (this.validateName(this.formFields[2].val()) == false) {
		this.controlGroups[2].addClass('has-error'); e.push('Please Choose A Username');
	}
	if (this.validatePassword(this.formFields[3].val()) == false) {
		this.controlGroups[3].addClass('has-error'); e.push('Password Should Be At Least 6 Characters');
	}
	if(this.validateCountry(this.formFields[4].val()) == false) {
		this.controlGroups[4].addClass('has-error'); e.push('Please Choose A Country');
	}
	return e.length === 0;
}

	