
Notes.models.Note = Ext.regModel("Notes.models.Note", {
    fields: [
        {name: "_id", type: "int"},    
        {name: "title", type: "string"},
        {name: "content", type: "string"},
        {name: "user_id", type: "int"},                     
        {name: "updated_at", type: "date",dateFormat: "c"},
        {name: "created_at", type: "date",dateFormat: "c"}        
    ]
});


Notes.stores.notes = new Ext.data.Store({
    storeId: "Notes.stores.notes",
    model: "Notes.models.Note",
    sorters: [{
            property: 'updated_at',
            direction: 'DESC'
        }],    
    getGroupString : function(record) {
        if (record && record.data.updated_at) {
            return record.get('updated_at').toDateString();
        } else {
            return '';
        }
    },    
    proxy: {
        type: 'rest',
        url: '/notes',
        format: 'json',
        appendId: false,
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
