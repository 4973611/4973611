/**
 *@author Habit 5 Business Services LLC
 * @todo Contact support@habit5.com for questions
 * @summary All of the functionality for the capitol coffee html template
 * @description functions for buttons and different css attributes
 **/
$(document).ready( function () {
    require(
        ['N/url',
            'N/search',
            'N/runtime',
            'N/ui/dialog',
            'N/https',
            'N/http',
            'N/ui/message',
        ]);
    $('[data-toggle="tooltip"]').tooltip();
});

function loadModules() {
    return {
        "url": require('N/url'),
        "search": require('N/search'),
        "runtime": require('N/runtime'),
        "dialog": require('N/ui/dialog'),
        "https": require('N/https'),
        "http": require('N/http'),
        "message": require('N/ui/message')
    };
}

/**************************************************** Parts Shipments Lists *******************************************************************/

//_h5_sl_render_planning_shipments
function planningShips(status){

    let customerId = document.getElementById('customerId').innerHTML;
    let customer = document.getElementById('customer').innerHTML;

    console.log("customerId, customer", customerId + "|" + customer)

    console.log("Status", status)

}

function saveShipChangesSpinner(){
    console.log("HERE")
    createWaiter();
    setTimeout(saveAndShip, 20);
}
function saveAndShip(){

    let table = document.getElementById("packageLines")
    console.log(table)

    let tRows = table.rows
    let packages = []
    for(x=1; x<tRows.length; x++){
        let myRow = tRows[x]
        console.log("myRow", myRow)
        let eachRow = {
            id: myRow.children[0].innerHTML,
            description: myRow.children[1].children[0].value,
            quantity: myRow.children[2].children[0].value,
            totWeight: myRow.children[3].children[0].value,
            length: myRow.children[4].children[0].value,
            width: myRow.children[5].children[0].value,
            height: myRow.children[6].children[0].value,
            lineId: myRow.children[8].innerHTML,
        }
        packages.push(eachRow)
    }

    console.log("packages", packages)

    let addressObj = {
        "shipId": document.getElementById("shipmentID").innerHTML,
        "shipDate": document.getElementById("dateS").value,
        "shipperPhone": document.getElementById("phoneS").value,
        "conAddre": document.getElementById("company").value,
        "conAttn": document.getElementById("attn").value,
        "conAdd1": document.getElementById("add1").value,
        "conAdd2": document.getElementById("add2").value,
        "conCity": document.getElementById("city").value,
        "conState": document.getElementById("state").value,
        "conZip": document.getElementById("zip").value,
        "conCountry": document.getElementById("country").value,
        "conPhone": document.getElementById("phone").value,
        "billToAddre": document.getElementById("addreB").value,
        "billToState": document.getElementById("stateB").value,
        "billToCountry": document.getElementById("countryB").value,
        "billToAccount": document.getElementById("accountB").value,
        "packages": packages,
        "printer": document.getElementById("laserPrinterFilter").value,
        "action": "ship"
    }

    console.log(addressObj)

    var ns = loadModules();
    console.log(ns)

    var suiteletURL = ns.url.resolveScript({
        scriptId: "customscript_h5_sl_save_ship_parts",
        deploymentId: "customdeploy_h5_sl_save_ship_parts",
        returnExternalUrl: true
    });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    var shipRec = ns.https.post({
        url: suiteletURL,
        body: JSON.stringify(addressObj),
        headers: headerObj
    })
    console.log(shipRec)
    if (JSON.parse(shipRec.body).code == 201) {
        alert(JSON.parse(shipRec.body).msg)
        location.reload();

    } else {
        //let shipRecError = JSON.parse(shipRec.body).message
        alert(JSON.parse(shipRec.body).msg)
        location.reload();
    }
}

function saveShipment(){

    let table = document.getElementById("packageLines")
    console.log(table)

    let tRows = table.rows
    let packages = []
    for(x=1; x<tRows.length; x++){
        let myRow = tRows[x]
        console.log("myRow", myRow)
        let eachRow = {
            id: myRow.children[0].innerHTML,
            description: myRow.children[1].children[0].value,
            quantity: myRow.children[2].children[0].value,
            totWeight: myRow.children[3].children[0].value,
            length: myRow.children[4].children[0].value,
            width: myRow.children[5].children[0].value,
            height: myRow.children[6].children[0].value,
            lineId: myRow.children[8].innerHTML,
        }
        packages.push(eachRow)
    }

    console.log("packages", packages)

    let addressObj = {
        "shipId": document.getElementById("shipmentID").innerHTML,
        "shipDate": document.getElementById("dateS").value,
        "shipperPhone": document.getElementById("phoneS").value,
        "conAddre": document.getElementById("company").value,
        "conAttn": document.getElementById("attn").value,
        "conAdd1": document.getElementById("add1").value,
        "conAdd2": document.getElementById("add2").value,
        "conCity": document.getElementById("city").value,
        "conState": document.getElementById("state").value,
        "conZip": document.getElementById("zip").value,
        "conCountry": document.getElementById("country").value,
        "conPhone": document.getElementById("phone").value,
        "billToAddre": document.getElementById("addreB").value,
        "billToState": document.getElementById("stateB").value,
        "billToCountry": document.getElementById("countryB").value,
        "billToAccount": document.getElementById("accountB").value,
        "packages": packages,
        "action": "save"
    }

    console.log(addressObj)

    var ns = loadModules();
    console.log(ns)

    var suiteletURL = ns.url.resolveScript({
        scriptId: "customscript_h5_sl_save_ship_parts",
        deploymentId: "customdeploy_h5_sl_save_ship_parts",
        returnExternalUrl: true
    });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    var shipRec = ns.https.post({
        url: suiteletURL,
        body: JSON.stringify(addressObj),
        headers: headerObj
    })
    console.log(shipRec)
    if (JSON.parse(shipRec.body).code == 201) {
        alert(JSON.parse(shipRec.body).msg)
        // location.reload();

    } else {
        //let shipRecError = JSON.parse(shipRec.body).message
        alert(JSON.parse(shipRec.body).msg)
        // location.reload();
    }

    // event.preventDefault();
}

function consolidateSpinner(data){
    createWaiter();
    setTimeout(consolidate, 50, data);
}

function consolidate(data){
    console.log("Ships to Consolidate", data)

    if(data.length < 2){
        alert("Error: Must select at least 2 shipments to consolidate.")
        location.reload();
    }

    let shipmentsToSend = {
        ships: data
    }
    let ns = loadModules()

    let suiteletURL = ns.url.resolveScript({
        scriptId: "customscript_h5_sl_parts_consolidator",
        deploymentId: "customdeploy_h5_sl_parts_consolidator",
        returnExternalUrl: true
    });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let response = ns.https.post({
        url:suiteletURL,
        headers: headerObj,
        body: JSON.stringify(shipmentsToSend)
    })
    let temp = JSON.parse(response.body)
    console.log("temp", temp)

    if(temp.code == 201){
        console.log(temp.newShipId)
        let netShipmentUrl = 'https://4973611.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=1977&id=' + temp.newShipId
        window.open(netShipmentUrl)
        location.reload();
    }else{
        console.log(temp.message)
        alert(temp.message)
        location.reload();
    }
}

//_h5_sl_render_rated_shipment_record
function goToShipment(shipmentId){

    console.log("shipmentId", shipmentId)

    window.open("https://4973611.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=1977&id=" +  shipmentId)
}

function printDocsSpinner(data){
    createWaiter();
    setTimeout(printDocs, 50, data);
}

//Prints the shipping documents for shipments selected
function printDocs(shipRecIds){
    console.log("ShipRecIds", shipRecIds)

    let ns = loadModules();

    let labelPrintSelect = document.getElementById('labelsFilter').value;
    console.log("label printer", labelPrintSelect)

    let laserPrintSelect = document.getElementById('laserFilter').value;

    let shipmentsToSend = {
        ships: shipRecIds,
        labelPrinter: labelPrintSelect,
        laserPrinter: laserPrintSelect
    }

    console.log(shipmentsToSend)

    let suiteletURL = ns.url.resolveScript({
        scriptId: "customscript_h5_sl_print_from_workbench",
        deploymentId: "customdeploy_h5_sl_print_from_workbench",
        returnExternalUrl: true
    });

    let headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let response = ns.https.post({
        url:suiteletURL,
        headers: headerObj,
        body: JSON.stringify(shipmentsToSend)
    })

    location.reload()
}

/******************************************************* MODALS *******************************************************************/

let modalData = []

function getShipData(shipModelData){
    let shipId = shipModelData
    console.log("shipId", shipId)

    let ns = loadModules();

    let suiteletURL = ns.url.resolveScript({
        scriptId: "customscript_h5_sl_get_parts_data_modal",
        deploymentId: "customdeploy_h5_sl_get_parts_data_modal",
        returnExternalUrl: true
    });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let response = ns.https.post({
        url:suiteletURL,
        headers: headerObj,
        body: shipId
    });

    console.log(response.body)

    modalData = JSON.parse(response.body)

    buildModal(shipId)

}

function buildModal(shipId) {

    console.log("buildModal", shipId)
    let modalContainer = document.getElementById('modalContents')

    console.log("shipLines", modalData[0].shipLines)
    let packageLines = ''
    for(y=0; y<modalData[0].shipLines.length; y++) {
        packageLines += '<tr><td id="line' + y + '" class=rowNumber style=display:none>' + y + '<td class=packageLine><input id="desc' + y + '"value="' + modalData[0].shipLines[y].desc + '"><td class=packageLine><input class=packageLineInputNumber id="pieces' + y + '"value="' + modalData[0].shipLines[y].pieces + '" type="number" style="width: 100%; font-size: 1vw;border-color: rgba(0,0,0,0.2)"><td class=packageLine><input class=packageLineInputNumber id="weight' + y + '"value="' + modalData[0].shipLines[y].weight + '" type="number" style="width: 100%; font-size: 1vw;border-color: rgba(0,0,0,0.2)"><td class=packageLine autofocus><input class=packageLineInputNumber id="length' + y + '"value="' + modalData[0].shipLines[y].length + '" type="number" style="width: 100%; font-size: 1vw;border-color: rgba(0,0,0,0.2)"><td class=packageLine><input class=packageLineInputNumber id="width' + y + '"value="' + modalData[0].shipLines[y].width + '" type="number" style="width: 100%; font-size: 1vw;border-color: rgba(0,0,0,0.2)"><td class=packageLine><input class=packageLineInputNumber id="height' + y + '"value="' + modalData[0].shipLines[y].height + '" type="number" style="width: 100%; font-size: 1vw;border-color: rgba(0,0,0,0.2)"><td class=packageLine><button onclick=addRow()>add</button><td class=packageLine style=display:none id="lineId' + y + '">' + modalData[0].shipLines[y].lineId + '</td></tr>'
    }

    let printers = ''
    for(z=0; z<modalData[0].printers.length; z++){
        printers += '<option value="' + modalData[0].printers[z].labelPrinterId + '">' + modalData[0].printers[z].name + '</option>'
    }

    let modalContent = '<div class=modal-header style=padding-bottom:0;margin-bottom:0><h5 class=modal-title style=font-size:1vw;padding-bottom:0;margin-bottom:1%>' + modalData[0].shipName + '</h5><p id=shipmentID style=display:none>' + modalData[0].shipId + '</p><button class=close type=button data-bs-dismiss=modal aria-label=Close><span aria-hidden=true>×</span></button></div><div class=modal-body id=modalBody><div class=row style=height:auto;padding:.5%><table style="width:100%;border-radius:1px;margin-bottom:.5%;box-shadow:1px 2px 3px rgba(0,0,0,.2);background-color:#4d5f79"class=titleBars><tr><td style=font-size:.75vw;font-weight:700;padding-left:1%;padding:.5%;color:#fff>Parties</table><div class="col-6 container-fluid"style=padding:0 align=center><form action=""autocomplete=off class=form-horizontal id=shipAddressForm role=form><div class=form-group style=margin-right:.5%!important;margin-left:.5%!important><table style=width:100%;border-radius:1px;margin-bottom:1%;background-color:rgba(0,0,0,.2) class=titleBars><tr><td style=font-size:.75vw;font-weight:700;padding-left:1%;padding:.5%>SHIP DATE</table><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=dateSL style=font-size:.75vw>Date:</span> <input class=form-control id=dateS placeholder=Date style=font-size:.75vw value="' + modalData[0].shipDate + '"type=date aria-describedby=basic-addon1 aria-label=Company></div><table style=width:100%;border-radius:1px;margin-bottom:1%;margin-top:1%;background-color:rgba(0,0,0,.2) class=titleBars><tr><td style=font-size:.75vw;font-weight:700;padding-left:1%;padding:.5%>SHIP FROM</table><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important;margin-right:.5%!important><span class=input-group-text id=locationSL style=font-size:.75vw>Location:</span> <input class=form-control-plaintext id=locationS placeholder=Location style=font-size:.75vw value="' + modalData[0].location + '"aria-describedby=basic-addon1 aria-label="Company Address"readonly></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=phoneSL style=font-size:.75vw><i class="fa-phone fa-solid"></i></span> <input class=form-control id=phoneS placeholder=Phone style=font-size:.75vw value="' + modalData[0].shipPhone + '"type=tel aria-describedby=basic-addon1 aria-label=Company></div><table style=width:100%;border-radius:1px;margin-bottom:1%;margin-top:1%;background-color:rgba(0,0,0,.2) class=titleBars><tr><td style=font-size:.75vw;font-weight:700;padding-left:1%;padding:.5%>BILL TO</table><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=addreBL style=font-size:.75vw;padding:.5%>Addre:</span> <input class=form-control id=addreB placeholder=State style=font-size:.75vw;padding:.5% value="' + modalData[0].billToAddre + '"type=tel></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=stateBL style=font-size:.75vw;padding:.5%>State:</span> <input class=form-control id=stateB placeholder=State style=font-size:.75vw;padding:.5% value="' + modalData[0].billToState + '"type=state></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=countryBL style=font-size:.75vw;padding:.5%>Country:</span> <input class=form-control id=countryB placeholder=Country style=font-size:.75vw;padding:.5% value="' + modalData[0].billToCountry + '"type=country></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=accountBL style=font-size:.75vw;padding:.5%>Account:</span> <input class=form-control id=accountB placeholder=Account style=font-size:.75vw;padding:.5% value="' + modalData[0].billToAccount + '"></div></div></form></div><div class="col-6 container-fluid"style=padding:0 align=center><form action=""autocomplete=off class=form-horizontal id=shipToAddressForm role=form><div class=form-group style=margin-right:.5%!important;margin-left:.5%!important><table style=width:100%;border-radius:1px;margin-bottom:1%;background-color:rgba(0,0,0,.2) class=titleBars><tr><td style=font-size:.75vw;font-weight:700;padding-left:1%;padding:.5%>SHIP TO</table><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=companyL style=font-size:.75vw;padding:.5%>Company:</span> <input class=form-control id=company placeholder=Company style=font-size:.75vw;padding:.5% value="' + modalData[0].conAddre + '"></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=attnL style=font-size:.75vw;padding:.5%>Attn:</span> <input class=form-control id=attn placeholder=Company style=font-size:.75vw;padding:.5% value="' + modalData[0].conAttn + '"></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=add1L style=font-size:.75vw;padding:.5%>Address 1:</span> <input class=form-control id=add1 placeholder="Address 1"style=font-size:.75vw;padding:.5% value="' + modalData[0].conAdd1 + '"></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=add2L style=font-size:.75vw;padding:.5%>Address 2:</span> <input class=form-control id=add2 placeholder="Address 2"style=font-size:.75vw;padding:.5% value="' + modalData[0].conAdd2 + '"></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=cityL style=font-size:.75vw;padding:.5%>City:</span> <input class=form-control id=city placeholder=City style=font-size:.75vw;padding:.5% value="' + modalData[0].conCity + '"></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=stateL style=font-size:.75vw;padding:.5%>State:</span> <input class=form-control id=state placeholder=State: style=font-size:.75vw;padding:.5% value="' + modalData[0].conState + '"></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=zipL style=font-size:.75vw;padding:.5%>Zip:</span> <input class=form-control id=zip placeholder=Zip style=font-size:.75vw;padding:.5% value="' + modalData[0].conZip + '"></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=countryL style=font-size:.75vw;padding:.5%>Country:</span> <input class=form-control id=country placeholder=Country style=font-size:.75vw;padding:.5% value="' + modalData[0].conCountry + '"></div><div class="input-group mb-3"style=padding:0!important;margin-bottom:1%!important;margin-top:0!important><span class=input-group-text id=contactL style=font-size:.75vw;padding:1%><i class="fa-phone fa-solid"></i></span> <input class=form-control id=phone placeholder=Phone style=font-size:.75vw;padding:.5% value="' + modalData[0].conPhone + '"></div></div></form></div></div><div class=row style=height:auto;padding:.5%><table style="width:100%;border-radius:1px;margin-bottom:.5%;box-shadow:1px 2px 3px rgba(0,0,0,.2);background-color:#4d5f79"class=titleBars><tr><td style=font-size:.75vw;font-weight:700;padding-left:1%;padding:.5%;color:#fff>Packages</table><table style="width:100%;overflow:visible;margin:0;padding:0;border:1px solid #e2e0e0"id=packageLines><thead align=center style="width:100%;font-size:1vw;padding:0!important;margin:0!important;border:1px solid #e2e0e0"><th colspan=1 style="padding:0;margin:0;border:1px solid #e2e0e0;display:none">Row<th colspan=1 style="padding:0;margin:0;border:1px solid #e2e0e0">Description<th colspan=1 style="padding:0;margin:0;border:1px solid #e2e0e0">Quantity<th colspan=1 style="padding:0;margin:0;border:1px solid #e2e0e0">Total Weight<th colspan=1 style="padding:0;margin:0;border:1px solid #e2e0e0">Length<th colspan=1 style="padding:0;margin:0;border:1px solid #e2e0e0">Width<th colspan=1 style="padding:0;margin:0;border:1px solid #e2e0e0">Height<th colspan=1 style="padding:0;margin:0;border:1px solid #e2e0e0">Actions<th colspan=1 style="padding:0;margin:0;border:1px solid #e2e0e0;display:none">Line ID<tbody align=center id=packageLinesBody style="vertical-align:middle;border:1px solid #e2e0e0;background-color:#eff1f3">' + packageLines + '</table></div><div class=modal-footer><button class="btn btn-secondary"type=button data-bs-dismiss=modal id=closeButton style=display:none>Close</button><button class="btn btn-primary"type=button onclick=saveShipment()>Save</button> </div>'


    //printer drop down section <div class=row style=height:auto;padding:.5%><table style="width:100%;border-radius:1px;margin-bottom:.5%;box-shadow:1px 2px 3px rgba(0,0,0,.2);background-color:#4d5f79"class=titleBars><tr><td style=font-size:.75vw;font-weight:700;padding-left:1%;padding:.5%;color:#fff>Printer</table><div align=center class="container-fluid col-9"style=padding:0></div><div align=right align=center class="container-fluid col-3"style=padding:0><select class=form-select style="font-size:.75vw" id=laserPrinterFilter><option value="">Label Printer</option>' + printers + '</select></div></div></div>

    //save and ship button <button class="btn btn-success"type=button onclick=saveShipChangesSpinner()>Save & Ship</button>

    modalContainer.innerHTML = modalContent;
}

function addRow(){
    console.log("Add Row Hit")

    let table = document.getElementById('packageLines')
    let totalRowCount = table.rows.length
    let rowLine = Number(totalRowCount - 1)
    console.log("table", table)
    console.log("tableRows", table.rows.length)

    var row = table.insertRow(totalRowCount);
    row.className = 'packageRow'
    var cell1 = row.insertCell(0)
    cell1.innerHTML = totalRowCount;
    cell1.className = "rowNumber"
    cell1.style.display = "none"
    var cell2 = row.insertCell(1);
    cell2.innerHTML = '<input  id="desc' + rowLine + '">';
    cell2.className = "packageLine"
    var cell3 = row.insertCell(2);
    cell3.innerHTML = '<input  id="pieces' + rowLine + '" class="packageLineInputNumber" type="number" style="width: 100%; font-size: 1vw;border-color: rgba(0,0,0,0.2)">';
    cell3.className = "packageLine"
    var cell4 = row.insertCell(3);
    cell4.innerHTML = '<input  id="weight' + rowLine + '" class="packageLineInputNumber" type="number" style="width: 100%; font-size: 1vw;border-color: rgba(0,0,0,0.2)">';
    cell4.className = "packageLine"
    var cell5 = row.insertCell(4)
    cell5.innerHTML = '<input  id="length' + rowLine + '" class="packageLineInputNumber" type="number" style="width: 100%; font-size: 1vw;border-color: rgba(0,0,0,0.2)">';
    cell5.className = "rowNumber"
    var cell6 = row.insertCell(5);
    cell6.innerHTML = '<input  id="width' + rowLine + '" class="packageLineInputNumber" type="number" style="width: 100%; font-size: 1vw;border-color: rgba(0,0,0,0.2)">';
    cell6.className = "packageLine"
    var cell7 = row.insertCell(6);
    cell7.innerHTML = '<input  id="height' + rowLine + '" class="packageLineInputNumber" type="number" style="width: 100%; font-size: 1vw;border-color: rgba(0,0,0,0.2)">';
    cell7.className = "packageLine"
    var cell8 = row.insertCell(7);
    cell8.innerHTML = '<button onclick="addRow()">add</button><button onclick="removeRow(this)">remove</button>';
    cell8.className = "packageLine"
    var cell9 = row.insertCell(8);
    cell9.innerHTML = 'null';
    cell9.className = "packageLine"
    cell9.style.display = "none"

    event.preventDefault();

}

function removeRow(r){
    console.log("removerow", r.parentNode.parentNode)

    var i = r.parentNode.parentNode.rowIndex; // this gets the rows index
    console.log(i)
    if (document.getElementById("packageLines")) {
        document.getElementById("packageLines").deleteRow(i);
    } else {
        document.getElementById("packageLines").deleteRow(i);
    }

    event.preventDefault();
}

function createWaiter() {
    var waiter = {};
    waiter.styles = '#h5bot-spin{'
        + '  position: fixed;'
        + '  top: 0;'
        + '  left: 0;'
        + '  background-color: #000;'
        + '  height: 100%;'
        + '  width: 100%;'
        + '  z-index: 100000;'
        + '  opacity: 0.6;'
        + '}'
        + '.h5bot-spin{'
        + '  border: 7px solid #333;'
        + '  -webkit-animation: spin 2s linear infinite;'
        + '  animation: spin 2s linear infinite;'
        + '  border-top: 7px solid #fff;'
        + '  border-radius: 50%;'
        + '  width: 50px;'
        + '  height: 50px;'
        + '  position: absolute;'
        + '  bottom: 50%;'
        + '  left: 45%;'
        + '}'
        + '@keyframes spin{'
        + '  0% { transform: rotate(0deg); }'
        + '  100% { transform: rotate(360deg); }'
        + '}';
    waiter.id = 'h5bot-spin';
    waiter.class = 'h5bot-spin';
    // create HTML chunk for loader
    var loaderHtmlElement = document.createElement('div');
    loaderHtmlElement.id = waiter.id;
    loaderHtmlElement.innerHTML = '<div class="' + waiter.class + '"></div>';
    document.body.appendChild(loaderHtmlElement);

    // add styles for loader
    var loaderStyleElement = document.createElement('style');
    loaderStyleElement.type = 'text/css';
    loaderStyleElement.innerHTML = waiter.styles;
    document.body.appendChild(loaderStyleElement);
    document.getElementById('h5bot-spin').style.display = 'block:none';
}