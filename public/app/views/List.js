Notes.views.notesListToolbar = new Ext.Toolbar({
    id: 'notesListToolbar',
    title: 'My Notes',
    layout: 'hbox',
    items: [
        { xtype: 'spacer' },
        {
            id: 'btn-new-note',
            text: 'New',
            ui: 'action',
            handler: function () {
/*                var now = new Date();
                var noteId = now.getTime();
                var note = Ext.ModelMgr.create(
                    { id: noteId, date: now, title:'', narrative:'' },
                    'Note'
                );
                NotesApp.views.noteEditor.load(note);
                NotesApp.views.viewport.setActiveItem('noteEditor', { type: 'slide', direction: 'left' });*/
            }
        }
    ]
});

Notes.views.notesList = new Ext.List({
    id: 'notesList',
    store: 'Notes.stores.notes',
    grouped: true,
    emptyText: '<div style="margin:5px;">No notes cached.</div>',
    onItemDisclosure: function (record) {
        //console.log('itemdisclosure');
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