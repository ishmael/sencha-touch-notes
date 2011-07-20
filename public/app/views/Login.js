/**
 * @class Notes.Viewport
 * @extends Ext.Panel
 * This is a default generated class which would usually be used to initialize your application's
 * main viewport. By default this is simply a welcome screen that tells you that the app was 
 * generated correctly.
 */
Notes.views.LoginForm = Ext.extend(Ext.form.FormPanel, {
    id        : 'login',
    layout    : 'fit',
    fullscreen: true,
	url: '/users/sign_in.json',
	title: 'Notes',
    items: [{
        xtype: 'form',
        title: '',
        items: [{
            xtype: 'fieldset',
            id: 'loginFormSet',
            items: [
            {
                xtype: 'emailfield',
                placeHolder: 'Username',
                name: 'user[email]',
                id: 'email',
                required: true,
            }, {
                xtype: 'passwordfield',
                placeHolder: 'Password',
                name: 'user[password]',
				id: 'password',
                required: true
            }, {
                xtype: 'checkboxfield',
                id: 'remember_me',
                name: 'user[remember_me]',
                label: 'Save login?',
                labelWidth: '40%',
                value: '1'            
            },
            {
                xtype: 'button',
                text: 'Login',
                ui: 'confirm',
                style: 'margin:2%;',
                handler: function() {
			      Ext.dispatch({
		                controller: Notes.controllers.loginController,
		                action: 'submit',
		                data: Notes.views.loginForm
		            });
                }
            }]
        }]
    }],
    initComponent: function() {
        Notes.views.LoginForm.superclass.initComponent.apply(this, arguments);
    }


});
