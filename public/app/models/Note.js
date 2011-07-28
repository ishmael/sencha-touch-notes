
Notes.models.Note = Ext.regModel("Notes.models.Note", {
    fields: [
        {name: "_id", type: "string"},    
        {name: "title", type: "string"},
        {name: "content", type: "string"},
        {name: "user_id", type: "string"},                     
        {name: "updated_at", type: "date",dateFormat: "c"},
        {name: "created_at", type: "date",dateFormat: "c"}        
    ],
    idProperty: "_id",
    validations: [
        { type: 'presence', field: 'title', message: 'Please enter a title for this note.' },
        { type: 'presence', field: 'content', message: 'Please enter content for this note.' }        
    ]
});


Notes.stores.notes = new Ext.data.Store({
    storeId: "Notes.stores.notes",
    model: "Notes.models.Note",
    getGroupString : function(record) {
        if (record && record.data.updated_at) {
            return record.get('updated_at').toDateString();
        } else {
            return '';
        }
    },
    sorters: [
      {
        property: 'updated_at',
        direction: 'DESC'
      }],
    proxy: {
        type: 'rest',
        url: '/notes',
        format: 'json',
        appendId: true,
        reader: {
            type: 'json',
            root: 'data',
            record: 'note',
            totalProperty: 'total'            
        },
        writer: {
            type: 'json',
            root: 'note'          
        }
    } 
});
