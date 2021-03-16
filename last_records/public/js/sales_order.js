frappe.ui.form.on("Sales Order Item",{
    "item_code" : function (frm, cdt, cdn){
        var help_content =
			`<table class="table table-bordered" style="background-color: #f9f9f9; color: black; font-weight: bold;">
				<tr>
				    <td>${__("Warehouse")}</td>
				    <td>${__("Stock")}</td>
				</tr>`;
    	var d = locals[cdt][cdn];
        	if(d.item_code){
            	frappe.call({
    		        "method": "last_records.last_records.doctype.last_purchase_table.last_purchase_table.getSalesLastprice",
    		        args: {
    			            item_code: d.item_code,
    		        },
        		    callback:function(r){
                        cur_frm.clear_table("last_sales_details");
        	        var len=r.message.length;
        	            for (var i=0;i<len;i++){
        	                var row = frm.add_child("last_sales_details");
				                row.invoice_number = r.message[i][0];
				                row.customer = r.message[i][1];
				                row.date = r.message[i][2];
        	                    row.item_code = r.message[i][3];
        		                row.qty = r.message[i][4];
				                row.rate = r.message[i][5];
                	    }
                    }
	            });

	            frappe.call({
    		        "method": "last_records.last_records.doctype.last_purchase_table.last_purchase_table.getStock",
    		        args: {
    			            item_code: d.item_code,
    		        },
        		    callback:function(r){
        		        for (var i=0;i<r.message.length;i++){
        		        help_content += `<tr><td>` +r.message[i][0]+ `</td><td>`+r.message[i][1]+`</td></tr>`;
                        }
                        help_content += `</table>`;
                            msgprint(help_content);
            	        }
	            });
    	    }
	    }
});
