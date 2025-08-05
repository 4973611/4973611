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

function saveManifestSpinner(addressObj){
    createWaiter();
    setTimeout(saveManiChanges(addressObj), 20);
}
function saveManiChanges(manifestObj){
    console.log("Save Manifest", manifestObj)

    var ns = loadModules();
    console.log(ns)

    console.log("Carrier", manifestObj.carrier)

    var suiteletURL
    if(manifestObj.carrier == "Canada Post"){
        suiteletURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6170&deploy=1&compid=4973611&ns-at=AAEJ7tMQUZc_bVft7BNz9d4oYdW1aRLVyTie43NlOMhHPDa38N4"
        // suiteletURL = ns.url.resolveScript({
        //     scriptId: "customscript_h5_sl_manifest_canada_post",
        //     deploymentId: "customdeploy_h5_sl_manifest_canada_post",
        //     returnExternalUrl: true
        // });
    }else if(manifestObj.carrier == "Purolator"){
        suiteletURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6173&deploy=1&compid=4973611&ns-at=AAEJ7tMQ3bCvbdHKZr5_tgyEX2cQRKAcXRMimjoAGtQQa5694Vo"
        // suiteletURL = ns.url.resolveScript({
        //     scriptId: "customscript_h5_sl_manifest_purolator",
        //     deploymentId: "customdeploy_h5_sl_manifest_purolator",
        //     returnExternalUrl: true
        // });
    }else if(manifestObj.carrier == "Canpar"){
        suiteletURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6171&deploy=1&compid=4973611&ns-at=AAEJ7tMQndhUK9EdmWzjIKDUwg5V5Ft7T2Wr8pdwvkmtvwEcA34"
        // suiteletURL = ns.url.resolveScript({
        //     scriptId: "customscript_h5_sl_manifest_canpar",
        //     deploymentId: "customdeploy_h5_sl_manifest_canpar",
        //     returnExternalUrl: true
        // });
    }else if(manifestObj.carrier == "Loomis"){
        suiteletURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6172&deploy=1&compid=4973611&ns-at=AAEJ7tMQyo0K5GcfieQY3Ho-b8iSEUM-cQWb494SK3gHi1IdlsA"
        // suiteletURL = ns.url.resolveScript({
        //     scriptId: "customscript_h5_sl_manifest_loomis",
        //     deploymentId: "customdeploy_h5_sl_manifest_loomis",
        //     returnExternalUrl: true
        // });
    }

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    var shipRec = ns.https.post({
        url: suiteletURL,
        body: JSON.stringify(manifestObj),
        headers: headerObj
    })
    console.log(shipRec)
    if (JSON.parse(shipRec.body).code == 201) {
        alert(JSON.parse(shipRec.body).message)
        location.reload();

    } else {
        //let shipRecError = JSON.parse(shipRec.body).message
        alert(JSON.parse(shipRec.body).message)
        location.reload();
    }
}

function printDocs(shipRecIds){
    console.log("ManifestIds", shipRecIds)

    let ns = loadModules();

    let labelPrintSelect = document.getElementById('labelsFilter').value;
    console.log("label printer", labelPrintSelect)

    let shipmentsToSend = {
        ships: shipRecIds,
        labelPrinter: labelPrintSelect,
    }

    console.log(shipmentsToSend)

    let suiteletURL = ns.url.resolveScript({
        scriptId: "customscript_h5_sl_print_manifests_workb",
        deploymentId: "customdeploy_h5_sl_print_manifests_workb",
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