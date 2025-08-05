/**
 *@author Habit 5 Business Services LLC
 * @todo Contact support@habit5.com for questions
 * @summary All of the functionality for the consolidate shipments html template
 * @description functions for buttons and different css attributes with a library of other unused functions underneath
**/
$(document).ready( function () {
    require(
        ['N/url',
            'N/runtime',
            'N/ui/dialog',
            'N/https',
            'N/http',
            'N/ui/message',
            'N/search'
        ]);
    $('[data-toggle="tooltip"]').tooltip();
} );

let linesSelected = []

function shipmentLocation() {

    let tableId = document.getElementById('ab-results');
    let dropDownId = document.getElementById('shipFromLocation');
    //let resetValue = document.getElementById('reset');
    let dropDownValue = dropDownId.options[document.getElementById('shipFromLocation').selectedIndex].innerHTML;

    //alert($('#shipFromLocation').val())
    let tableRows = tableId.rows
    for(i=0; i<tableRows.length; i++){
        let tempRow = tableId.rows[i];
        if(tempRow.children[1].innerHTML == dropDownValue || dropDownValue == '-'){
            tempRow.style.display = "";
        }
        else{tempRow.style.display = "none";}
    }
}

function selectRow(row) {
    let firstInput = row.getElementsByTagName('input')[0];
    firstInput.checked = !firstInput.checked;


    if (firstInput.checked) {
        row.style.backgroundColor = 'lightgreen';


        linesSelected.push(firstInput.id);

    }
    else {
        row.style = '';

        let result = lineSelectedObjects.findIndex(obj => {
            return obj.rowId === firstInput.id
        })
        linesSelected.splice(result, 1);
    }
    console.log(linesSelected)

}
function spinner(){
    let submitSpinner = document.getElementById('spinnerreloads');
    submitSpinner.style.visibility = 'visible';
}

function printSpin(){
    spinner();
    setTimeout(consShipSelected, 30);
    //setTimeout(clientFieldChanged, 50);
}

function consShipSelected(){

    let shipmentsToSend = {
        ships: linesSelected
    }
    let ns = loadModules()

    let suiteletURL = ns.url.resolveScript({
        scriptId: "customscript_h5_sl_ship_consolidator",
        deploymentId: "customdeploy_h5_sl_ship_consolidator",
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

    console.log(temp.newShipId)

    let netShipmentUrl = 'https://4973611.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=1977&id=' + temp.newShipId

    window.open(netShipmentUrl)
    location.reload();
    }


function loadModules() {
    return {
        "url" : require('N/url'),
        "runtime" : require('N/runtime'),
        "dialog" : require('N/ui/dialog'),
        "https" : require('N/https'),
        "http" : require('N/http'),
        "message" : require('N/ui/message'),
        "search" : require('N/search')
    };
}


//Globals

var lineSelectedObjects = [];


