function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("DT_COMPRA");
	dataset.addColumn("NR_DOCCLIENTE");
	dataset.addColumn("NM_CLIENTE");
	dataset.addColumn("NR_DOCLOJA");
	dataset.addColumn("NM_LOJA");
	dataset.addColumn("VL_VENDA");
	
	var jsonArray;
	var clientService = fluigAPI.getAuthorizeClientService();
	var data = {
		"companyId": getValue("WKCompany") + '',
		"serviceCode": "MovimentosVendas",
		"endpoint": "/api/default",
		"method": "get"
	}
	
	var vo = clientService.invoke(JSON.stringify(data));
	if (vo.getResult() == null || vo.getResult().isEmpty()) {
		throw new Exception("Retorno vazio");
	} else {
		jsonArray = JSON.parse(vo.getResult());
		for (i = 0; i < jsonArray.length; i++) {
			dataset.addRow(new Array(
				jsonArray[i]['DT_COMPRA'] == null ? null : jsonArray[i]['DT_COMPRA'].substring(0, 10), 
				jsonArray[i]['NR_DOCCLIENTE'] == null ? null : jsonArray[i]['NR_DOCCLIENTE'].trim(), 
				jsonArray[i]['NM_CLIENTE'] == null ? null : jsonArray[i]['NM_CLIENTE'].trim(), 
				jsonArray[i]['NR_DOCLOJA'] == null ? null : jsonArray[i]['NR_DOCLOJA'].trim(),
				jsonArray[i]['NM_LOJA'] == null ? null : jsonArray[i]['NM_LOJA'].trim(), 
				jsonArray[i]['VL_VENDA'] == null ? null : jsonArray[i]['VL_VENDA']));
		}
	}
	
	return dataset;
}

function onMobileSync(user) {

}
