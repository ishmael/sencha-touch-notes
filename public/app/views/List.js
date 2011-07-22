Notes.views.notesListToolbar = new Ext.Toolbar({
    id: 'notesListToolbar',
    title: 'My Notes',
    layout: 'hbox',
    items: [
        {
            id: 'btn-logout',
            text: 'Logout',
            ui: 'action',
            handler: function () {
                window.location = '/users/sign_out';  
            }
        },    
        { xtype: 'spacer' },
        {
            id: 'btn-new-note',
            text: 'New',
            ui: 'action',
            handler: function () {
                var note = Ext.ModelMgr.create({},'Notes.models.Note');
                //Notes.views.noteEditorTopToolbar.title= 'New Note';
                Notes.views.noteEditor.load(note);
                Notes.views.viewport.setActiveItem('noteEditor', { type: 'slide', direction: 'left' });
            }
        }
    ]
});

Notes.views.notesList = new Ext.List({
    id: 'notesList',
    store: 'Notes.stores.notes',
    grouped: true,
    plugins: [{
        ptype: 'pullrefresh'
    }],
    emptyText: '<div style="margin:5px;">No notes cached.</div>',
    onItemDisclosure: function (record) {
        Notes.views.noteEditor.load(record);
        Notes.views.viewport.setActiveItem('noteEditor', { type: 'slide', direction: 'left' });
    },
    itemTpl: '<div class="list-item-title">{title}</div>' +
        '<div class="list-item-narrative">{content}</div>',

    listeners: {
        render: function (thisComponent) {
            thisComponent.getStore().load();
        }
    }
});     

Notes.views.notesListContainer = new Ext.Panel({
    id: 'notesListContainer',
    layout: 'fit',
    dockedItems: [Notes.views.notesListToolbar],
    items: [Notes.views.notesList]
});