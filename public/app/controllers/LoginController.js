Notes.controllers.loginController = new Ext.Controller({

    submit: function(options) {
				var theForm = options.data;  
		    	Notes.views.loginForm.submit({
		    		method: 'POST',
					waitMsg: {
						message: 'Processing',
						cls : 'demos-loading'
					},
					scope: this,
					success: function(form, response) {
						window.location = '/';  
					},
					failure: function(form, response) {
						Ext.Msg.alert('Warning', response); 
					}
				});                   	
    }

});

