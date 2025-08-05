/**
 *@author Habit 5 Business Services LLC
 * @todo Contact support@habit5.com for questions
 * @summary All of the functionality for the consolidate shipments html template
 * @description functions for buttons and different css attributes with a library of other unused functions underneath
 **/
$(document).ready(function () {
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
});

let linesSelected = []

function createStopsSpinner() {
    createWaiter();
    setTimeout(createStops, 50);
}

function createStops() {

    let routStops = {}
    let shipIds = []
    let tempTable = document.getElementById('stopsTable')
    let tempCount = tempTable.rows.length

    if(tempCount < 2){
        alert("Please select at least 2 stops.")
        document.getElementById("h5bot-spin").style.display = "none"
        return
    }

    for (z = 1; z < tempCount; z++) {
        routStops[z] = {
            shipId: tempTable.rows[z].children[0].innerHTML,
            stopNum: tempTable.rows[z].children[4].innerHTML,
            stopType: tempTable.rows[z].children[5].innerHTML
        }

        shipIds.push(tempTable.rows[z].children[0].innerHTML)
    }

    let shipmentsToSend = {
        routStops: routStops,
        ships: shipIds
    }
    console.log("shipmentsToSend", shipmentsToSend)

    let ns = loadModules()

    let suiteletURL = ns.url.resolveScript({
        scriptId: "customscript_h5_sl_create_multistop",
        deploymentId: "customdeploy_h5_sl_create_multistop",
        returnExternalUrl: true
    });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let response = ns.https.post({
        url: suiteletURL,
        headers: headerObj,
        body: JSON.stringify(shipmentsToSend)
    })
    let temp = JSON.parse(response.body)
    if(temp.code == 201){
        console.log(temp.newShipId)
        let netShipmentUrl = 'https://4973611.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=1977&id=' + temp.newShipId
        window.open(netShipmentUrl)
        location.reload();
    }else{
        alert(temp.message)
        document.getElementById("h5bot-spin").style.display = "none"
        return
    }
}


function loadModules() {
    return {
        "url": require('N/url'),
        "runtime": require('N/runtime'),
        "dialog": require('N/ui/dialog'),
        "https": require('N/https'),
        "http": require('N/http'),
        "message": require('N/ui/message'),
        "search": require('N/search')
    };
}


//Globals

var lineSelectedObjects = [];

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
