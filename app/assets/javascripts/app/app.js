/**
 * This file sets application-wide settings and launches the application when everything has
 * been loaded onto the page. By default we just render the applications Viewport inside the
 * launch method (see app/views/Viewport.js).
 */ 

    Notes = new Ext.Application({
    //    defaultTarget: "viewport",
        name: "Notes",
        launch: function() {
           // this.viewport = new Notes.views.Viewport();
            Notes.views.viewport = new Ext.Panel({
                fullscreen: true,
                layout: 'card',
                cardAnimation: 'slide',
                items: [Notes.views.notesListContainer, Notes.views.noteEditor]
            });       
        }
    });
