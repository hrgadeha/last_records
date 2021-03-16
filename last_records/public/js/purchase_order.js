frappe.ui.form.on("Purchase Order Item",{
    "item_code" : function (frm, cdt, cdn){
    	var d = locals[cdt][cdn];
        	if(d.item_code){
            	frappe.call({
    		        "method": "last_records.last_records.doctype.last_purchase_table.last_purchase_table.getPurchaseLastprice",
    		        args: {
    			            item_code: d.item_code,
    		        },
        		    callback:function(r){
	                    cur_frm.clear_table("last_purchase_details");
        	        var len=r.message.length;
        	            for (var i=0;i<len;i++){
        	                var row = frm.add_child("last_purchase_details");
				                row.invoice_number = r.message[i][0];
				                row.supplier = r.message[i][1];
				                row.date = r.message[i][2];
        	                    row.item_code = r.message[i][3];
        		                row.qty = r.message[i][4];
				                row.rate = r.message[i][5];
                	    }
                    }
	            });
    	    }
	    }
});
