/**
 *@author Habit 5 Business Services LLC
 * @todo Contact support@habit5.com for questions
 * @summary All of the functionality for the parts rates html template
 * @description functions for buttons and different css attributes
 **/
$(document).ready(function () {
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
function selectShipSpinner(rateId) {
    createWaiter()
    setTimeout(selectShip, 50, rateId);
}

function selectShip(rateId) {
    console.log("Select Rate Button Pushed")
    var ns = loadModules();
    console.log(ns)
    let user = document.getElementById("userId").innerHTML
    var intl = document.getElementById("intl").innerHTML

    let labelPrintSelect = document.getElementById('labelsFilter').value;
    var labelPrinter = document.getElementById('labelsFilter');
    var selectedLabel = labelPrinter.options[labelPrinter.selectedIndex];
    var labelPrinterId = selectedLabel.getAttribute('data-id');

    let laserPrintSelect = document.getElementById('laserFilter').value;
    var laserPrinter = document.getElementById('laserFilter');
    var selectedLaser = laserPrinter.options[laserPrinter.selectedIndex];
    var laserPrinterId = selectedLaser.getAttribute('data-id');

    var inputJSON = {
        "rateId": rateId,
        "printerId": document.getElementById("labelsFilter").value,
        "user": user,
        "customs": intl,
        "shipId": document.getElementById("shipmentId").innerHTML,
        "labelPrinter": labelPrintSelect,
        "labelPrinterId": labelPrinterId,
        "laserPrinter": laserPrintSelect,
        "laserPrinterId": laserPrinterId,
        "preferences": document.getElementById("preferences").innerHTML
    };
    console.log(inputJSON)

    // var suiteletURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_parts_select_rate",
    //     deploymentId: "customdeploy_h5_sl_parts_select_rate",
    //     returnExternalUrl: true
    // });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    var shipRec = ns.https.post({
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6802&deploy=1&compid=4973611&ns-at=AAEJ7tMQQ9VL7Gz-IcACSc8txzA0GAaWN2EzuqHCJ2CyXpbZtfc",
        body: JSON.stringify(inputJSON),
        headers: headerObj
    })

    console.log(JSON.parse(shipRec.body).code)
    if (JSON.parse(shipRec.body).code == 201) {
        alert(JSON.parse(shipRec.body).message)
        window.close()
    } else {
        //let shipRecError = JSON.parse(shipRec.body).message
        alert(JSON.parse(shipRec.body).message)
        window.close()
    }
}

function submitCustomsSpinner(shipId) {
    document.getElementById("custSpinText").style.display = "none"
    document.getElementById("custSpin").style.display = ""
    setTimeout(submitCustoms, 50, shipId);
}

function submitCustoms(shipId) {
    console.log("Select Rate Button Pushed", shipId)

    let table = document.getElementById("packageLines")
    console.log(table)

    let tRows = table.rows
    let packages = []
    for (x = 1; x < tRows.length; x++) {
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
        packages: packages,
        mailroom: true,
        shipId: shipId,
        printerId: document.getElementById("labelsFilter").value,
        user: user,
        customs: true
    }

    console.log(customsInfo)

    var ns = loadModules();
    console.log(ns)

    // var suiteletURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_parts_submit_customs",
    //     deploymentId: "customdeploy_h5_sl_parts_submit_customs",
    //     returnExternalUrl: true
    // });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    var shipRec = ns.https.post({
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6803&deploy=1&compid=4973611&ns-at=AAEJ7tMQnfRcQOKoXwltgZZG7QYk14ouzODYc8q7sjJMzqLbo4k",
        body: JSON.stringify(customsInfo),
        headers: headerObj
    })
    console.log(shipRec)
    if (JSON.parse(shipRec.body).code != 201) {
        alert(JSON.parse(shipRec.body).message)
        location.reload()
    } else {
        document.getElementById("customsHeader").style.display = "none"
        document.getElementById("commodityInternational").style.display = "none"
        document.getElementById("customsDetails").style.display = "none"
        document.getElementById("customsButton").style.display = "none"

        document.getElementById("selectRate").style.display = ""
    }
}
