# -*- coding: utf-8 -*-
# Copyright (c) 2019, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class LastPurchaseTable(Document):
	pass

@frappe.whitelist(allow_guest=True)
def getPurchaseLastprice(item_code,company):
	last_PINV = frappe.db.sql("""select pinv.name,pinv.supplier_name,pinv.posting_date,pitem.item_code,pitem.qty,pitem.rate 
		from `tabPurchase Invoice Item` pitem, `tabPurchase Invoice` pinv where pitem.parent = pinv.name and pitem.item_code = %s 
		and pinv.docstatus = 1 and pinv.is_return = 0 and 
		pinv.company = %s order by pinv.creation desc limit 5;""",(item_code,company),as_list = True)

	if last_PINV:
		return last_PINV
	else:
		False

@frappe.whitelist(allow_guest=True)
def getSalesLastprice(item_code,company):
	last_SINV = frappe.db.sql("""select sinv.name,sinv.customer_name,sinv.posting_date,sitem.item_code,sitem.qty,sitem.rate 
                from `tabSales Invoice Item` sitem, `tabSales Invoice` sinv where sitem.parent = sinv.name and sitem.item_code = %s 
                and sinv.docstatus = 1 and sinv.is_return = 0 and 
		sinv.company = %s order by sinv.creation desc limit 5;""",(item_code,company),as_list = True)

	if last_SINV:
		return last_SINV
	else:
		False


@frappe.whitelist(allow_guest=True)
def getStock(item_code):
	stock = frappe.db.sql("""select warehouse, actual_qty from `tabBin`
                where item_code = %s and actual_qty != 0;""",(item_code),as_list = True)

	if stock:
		return stock
	else:
		False
