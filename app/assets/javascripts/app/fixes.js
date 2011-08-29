/**
* AjaxProxy is totally borked when it comes to synchronizing records of an UPDATE or CRDATE action
* NB: This hack assumes that server will return result recordset in the same order received.
* Taken from: https://gist.github.com/1040439
*/
Ext.override(Ext.data.AjaxProxy, {
    createRequestCallback: function(request, operation, callback, scope) {
	var me = this;
        return function(options, success, response) {
            if (success === true) {
                var reader  = me.getReader(),
                    result  = reader.read(response),
                    records = result.records,
                    length  = records.length,
                    mc = new Ext.util.MixedCollection(true, function(r) {return r.internalId;}),
                    newRec, oldRec, i;

                mc.addAll(operation.records);
                for (i = 0; i < length; i++) {
	            newRec = records[i];		            
	            oldRec = mc.getAt(i);		            					
                    if (oldRec) {				                        
			// HACK Set internalId of newly-read record to that of the original record.
			// This is so that Store can replace the original with this new version from server.
			newRec.internalId = oldRec.internalId;
                    }
                }
	        //</END_OF_HACK>:  everything else is verbatim from AjaxProxy

                //see comment in buildRequest for why we include the response object here
                Ext.apply(operation, {
                    response : response,
                    resultSet: result
                });

                operation.setCompleted();
                operation.setSuccessful();
            } else {
                me.fireEvent('exception', this, response, operation);

                //TODO: extract error message from reader
                operation.setException();                
            }

            //this callback is the one that was passed to the 'read' or 'write' function above
            if (typeof callback == 'function') {
                callback.call(scope || me, operation);
            }

            me.afterRequest(request, true);
        };
    }
});