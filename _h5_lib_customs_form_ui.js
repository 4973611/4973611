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

function loadModules() {
    return {
        "url" : require('N/url'),
        "runtime" : require('N/runtime'),
        "dialog" : require('N/ui/dialog'),
        "https" : require('N/https'),
        "http" : require('N/http'),
        "message" : require('N/ui/message'),
        "search" : require('N/search'),
        //"h5": require('/SuiteScripts/Habit5 Scripts/H5 Modules/_h5_tms_kuebix_apis.js')
    };
}

function spinner(){
    let submitSpinner = document.getElementById('spinnerreloads');
    submitSpinner.style.visibility = 'visible';
}

function carrierSpin(){
    createWaiter();
    setTimeout(submitCustoms, 30);
    //setTimeout(clientFieldChanged, 50);
}

var lineSelectedObjects = [];

function submitCustoms(){
    console.log("Select Rate Button Pushed")

    let table = document.getElementById("packageLines")
    console.log(table)

    let tRows = table.rows
    let packages = []
    for(x=1; x<tRows.length; x++){
        let myRow = tRows[x]
        let eachRow = {
            id: myRow.children[10].innerHTML,
            description: myRow.children[2].children[0].value,
            quantity: myRow.children[3].children[0].value,
            unitPrice: myRow.children[4].children[0].value,
            totWeight: myRow.children[5].children[0].value,
            htsCode: myRow.children[6].children[0].value,
            origin: myRow.children[7].children[0].value,
            export: myRow.children[8].children[0].value,
        }
        packages.push(eachRow)
    }

    console.log(packages)

        let customsInfo = {
            shipId: document.getElementById("shipmentId").innerHTML,
            //fedex: document.getElementById("fedex").checked,
            //ups:document.getElementById("ups").checked,
            insurance: document.getElementById("insurance").checked,
            signature: document.getElementById("signature").checked,
            residential: document.getElementById("residential").checked,
            inside: document.getElementById("inside").checked,
            delivery: document.getElementById("confirmation").checked,
            liftGate: document.getElementById("liftgate").checked,
            value: document.getElementById("custValue").value,
            currency: document.getElementById("currency").value,
            dutiesPayType: document.getElementById("paymentType").value,
            dutiesAccount: document.getElementById("dutiesAccountNum").value,
            accountZip: document.getElementById("dutiesAccountZip").value,
            accountCountry: document.getElementById("dutiesAccountCountry").value,
            conTaxId: document.getElementById("conTaxID").value,
            conTaxIdType: document.getElementById("conTaxIdType").value,
            // b13AFiling: document.getElementById("b13file").value,
            // b13ACompliance: document.getElementById("b13comply").value,
            // permitNum: document.getElementById("permitNum").value,
            // conCustomsIdType: document.getElementById("custID").value,
            // itnNum: document.getElementById("itnNum").value
            packages: packages
        }

        console.log(customsInfo)

    var ns = loadModules();
    console.log(ns)

    // var suiteletURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_submit_customs_info",
    //     deploymentId: "customdeploy_h5_sl_submit_customs_info",
    //     returnExternalUrl: true
    // });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    var shipRec = ns.https.post({
        url: "https://4973611-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6165&deploy=1&compid=4973611_SB1&ns-at=AAEJ7tMQ_DH8mr26ioVQGgceGfnLFJFzZIBnxgIxd07q1A5g68o",
        body: JSON.stringify(customsInfo),
        headers: headerObj
    })
    console.log(shipRec)
    if (JSON.parse(shipRec.body).code == 201) {
        window.close()

    } else {
        //let shipRecError = JSON.parse(shipRec.body).message
        alert(JSON.parse(shipRec.body).msg)
       //location.reload();
    }
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





