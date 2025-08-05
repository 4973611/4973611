/**
 *@author Habit 5 Business Services LLC
 * @todo Contact support@habit5.com for questions
 * @summary All of the functionality for the print labels html template
 * @description functions for when buttons are pressed or dropdowns lists are selected
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
            // '/SuiteScripts/Habit5 Scripts/H5 TMS Modules/_h5_tms_kuebix_apis.js'
        ]);
    $('[data-toggle="tooltip"]').tooltip();
} );

let linesSelected = []
let labelData = []
let bolData = []


//changing the shipment location dropdown field
function shipmentLocationOLD() {

    let tableId = document.getElementById('ab-results');
    let dropDownId = document.getElementById('shipFromLocation');
    //let resetValue = document.getElementById('reset');
    let dropDownValue = dropDownId.options[document.getElementById('shipFromLocation').selectedIndex].innerHTML;



    //this filters out the specified location
    let tableRows = tableId.rows
    for(i=0; i<tableRows.length; i++){
        let tempRow = tableId.rows[i];
        if(tempRow.children[1].innerHTML == dropDownValue || dropDownValue == '-'){
            tempRow.style.display = "";
        }
        else{tempRow.style.display = "none";}
    }
}


//changing the label printer dropdown field
function labelDropDownChange(){
    let LabelDropDownId = document.getElementById('labeldropdown');
    let labelDropDownValue = LabelDropDownId.options[document.getElementById('labeldropdown').selectedIndex].innerHTML;
    let labelPrinterId = $('#labeldropdown').val();
    if(!Boolean(labelData)) {
        bolData.push(labelPrinterId)
    }
    else if(labelDropDownValue != '-'){
        labelData.splice(0);
        labelData.push(labelPrinterId)
    }
    else{labelData.splice(0);}
    console.log(labelData)
}

//changing the bol printer dropdown field
function bolDropDownChange(){
    let bolDropDownId = document.getElementById('boldropdown');
    let bolDropDownValue = bolDropDownId.options[document.getElementById('boldropdown').selectedIndex].innerHTML;
    let bolPrinterId = $('#boldropdown').val();
    if(!Boolean(bolData)) {
        bolData.push(bolPrinterId)
    }
    else if(bolDropDownValue != '-'){
        bolData.splice(0);
        bolData.push(bolPrinterId)
    }
    else{bolData.splice(0);}
    console.log(bolData)
}


//selecting a shipment row
function selectRow(row) {
    let firstInput = row.getElementsByTagName('input')[0];
    firstInput.checked = !firstInput.checked;
    // const checked = document.querySelector('#id:checked') !== null;
    // const rowStyle = document.querySelector('#mainrow');


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
    setTimeout(printPushed, 30);
    //setTimeout(clientFieldChanged, 50);
}

function printPushed(data){
    // $('#spinnerreloads').show();
    //jQuery('#spinnerreloads').show();
    let shipmentsToSend = {
        ships: data,
        labelPrinter: labelData,
        bolPrinter: bolData
    }
    console.log(shipmentsToSend)

    let ns = loadModules()

    let suiteletURL = ns.url.resolveScript({
        scriptId: "customscript_h5_sl_submit_print_jobs",
        deploymentId: "customdeploy_h5_sl_submit_print_jobs",
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
    location.reload()
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
      //  "h5": require('/SuiteScripts/Habit5 Scripts/H5 TMS Modules/_h5_tms_kuebix_apis.js'),
    };
}


//Globals

var lineSelectedObjects = [];

