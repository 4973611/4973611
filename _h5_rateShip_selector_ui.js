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

function selectShip(rateId){
    console.log("Select Rate Button Pushed")
    var ns = loadModules();
    console.log(ns)
    let user = document.getElementById("userId").innerHTML
    var intl = document.getElementById("intl").innerHTML
    console.log(intl)
    if(intl == "true"){
        document.getElementById("pagecontainer").style.display = 'none'
        document.getElementById("customsFormBody").style.display = ''
        document.getElementById("header").style.display = ''
        document.getElementById("menublock2").style.display = ''
        document.getElementById("commodityInternational").style.display = ''
        document.getElementById("details").style.display = ''
        addCommodities()
    }else {

        var inputJSON = {
            rateId: rateId,
            printerId: document.getElementById("labelsFilter").value,
            user: user
        };
        console.log(inputJSON)

        // var suiteletURL = ns.url.resolveScript({
        //     scriptId: "customscript_h5_sl_select_ship_print",
        //     deploymentId: "customdeploy_h5_sl_select_ship_print",
        //     returnExternalUrl: true
        // });

        var headerObj = {
            name: "User-Agent",
            value: "Mozilla/5.0"
        };

        var shipRec = ns.https.post({
            url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6245&deploy=1&compid=4973611&ns-at=AAEJ7tMQ1jJMKcyhp9XPZBewDGgBlUKoI1Z81q3xRrdZvgZHew0",
            body: JSON.stringify(inputJSON),
            headers: headerObj
        })

        if (JSON.parse(shipRec.body).code == 201) {
            window.close()
        } else {
            //let shipRecError = JSON.parse(shipRec.body).message
            alert(JSON.parse(shipRec.body).message)
            location.reload();
        }
    }
}

function submitCustoms(rateId){
    console.log("Select Rate Button Pushed",  rateId)

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

    let user = document.getElementById("userId").innerHTML

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
        packages: packages,
        mailroom: true,
        rateId: rateId,
        printerId: document.getElementById("labelsFilter").value,
        user: user
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
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6165&deploy=1&compid=4973611&ns-at=AAEJ7tMQ9Beziz5aPBQzQrfcGGNWVjvcCStBvxMrRRW0XZ0KiMw",
        body: JSON.stringify(customsInfo),
        headers: headerObj
    })
    console.log(shipRec)
    if (JSON.parse(shipRec.body).code != 201) {
        alert(JSON.parse(shipRec.body).message)
        window.close()
    } else {
        window.close()
    }
}