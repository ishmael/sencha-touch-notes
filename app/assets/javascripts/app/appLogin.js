    Notes = new Ext.Application({
        defaultTarget: "viewport",
        name: "Notes",
        launch: function() {
            this.views.loginForm = new Notes.views.LoginForm();
        }
    });

