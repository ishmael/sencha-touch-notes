

Notes.views.noteEditorTopToolbar = new Ext.Toolbar({
    title: 'Edit Note',
    items: [
        {
            text: 'Home',
            ui: 'back',
            handler: function () {
               Notes.views.viewport.setActiveItem('notesListContainer', { type: 'slide', direction: 'right' });
            }
        },
        { xtype: 'spacer' },
        {
            text: 'Save',
            ui: 'action',
            handler: function () {

               var currentNote = Notes.views.noteEditor.getRecord();
                Notes.views.noteEditor.updateRecord(currentNote);

                /*var errors = currentNote.validate();
                if (!errors.isValid()) {
                    Ext.Msg.alert('Wait!', errors.getByField('title')[0].message, Ext.emptyFn);
                    return;
                }*/

                var notesStore = Notes.views.notesList.getStore();
                if (null == notesStore.findRecord('_id', currentNote.data._id)) {
                    //currentNote.dirty= false;
                    currentNote.commit();
                    notesStore.add(currentNote);
                    notesStore.proxy.appendId= false;
                }
                else
                {
                    notesStore.proxy.appendId= true;
                }
                           
                notesStore.sync();
                notesStore.sort([{ property: 'updated_at', direction: 'DESC'}]);

                Notes.views.notesList.refresh();
                Notes.views.viewport.setActiveItem('notesListContainer', { type: 'slide', direction: 'right' });
            }
        }
    ]
});

Notes.views.noteEditorBottomToolbar = new Ext.Toolbar({
    dock: 'bottom',
    items: [
    { xtype: 'spacer' },
    {
        iconCls: 'trash',
        iconMask: true,
        handler: function () {

            var currentNote = Notes.views.noteEditor.getRecord();
            var notesStore = Notes.views.notesList.getStore();
            if (notesStore.findRecord('_id', currentNote.data._id)) {
                notesStore.remove(currentNote);
            }
            notesStore.sync();
            Notes.views.notesList.refresh();
            Notes.views.viewport.setActiveItem('notesListContainer', { type: 'slide', direction: 'right' });
        }
    }
]
});

Notes.views.noteEditor = new Ext.form.FormPanel({
    id: 'noteEditor',
    dockedItems: [Notes.views.noteEditorTopToolbar, Notes.views.noteEditorBottomToolbar],
    items: [
        {
            xtype: 'textfield',
            name: 'title',
            label: 'Title',
            required: true
        }, {
            xtype: 'textareafield',
            name: 'content',
            label: 'Content',
            maxRows: 20
        }
    ]
});