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

let pageContainer = document.getElementById('pagecontainer');
let employeeName = '';
let employeeInternalId;
let employeeLocation;
let shipmentData = [];
let specificCaseData = [];
let caseCommentArr = [];
let caseStatusArr = [];
let shipId
let shipmentId

/****************************************************** LOGOUT *******************************************************************/

function logOut(){
    location.replace("https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4530&deploy=1&compid=4973611&ns-at=AAEJ7tMQc4N_vIpiXHh7_k_x1_qgtBkrIRZNzuduALdN0FOPOJ0")
}

/****************************************************** LOGIN *******************************************************************/

function loginSpin(){
    $("#loginbuttontext").hide('fast');
    $("#loginspinner").show('fast');
    $("#loginbutton").animate({ width: '-=100px !important' }, 300);
    setTimeout(loginAuthorization, 700)
}
function loginAuthorization() {
    ///////////ERROR HANDLING
    let emailError = document.getElementById('incorrectemail');
    let emailBox = document.getElementById('emailbox');
    let emailLogo = document.getElementById('emaillogo');
    let passwordError = document.getElementById('incorrectpassword');
    let passwordBox = document.getElementById('passwordbox');
    let passwordLogo = document.getElementById('passwordlogo');
    ////////////
    let untrimmedEmail = document.getElementById('email').value;
    let email = untrimmedEmail.trim();
    let untrimmedPassword = document.getElementById('password').value;
    let password = untrimmedPassword.trim();

    if(!Boolean(password)){
        $("#loginbuttontext").show('fast');
        $("#loginspinner").hide('fast');
        passwordError.style.display = 'block';
        passwordBox.style.border = '2px solid red';
        passwordLogo.style.color = 'red';
        return;
    }

    //Get Employee ID
    let objToSend = {
        email: email,
        password: password
    }
    let ns = loadModules()

    // let suiteletURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_validate_employee",
    //     deploymentId: "customdeploy_h5_sl_validate_employee",
    //     returnExternalUrl: true
    // });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let response = ns.https.post({
        url:"https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4532&deploy=1&compid=4973611&ns-at=AAEJ7tMQ80Z3A7qflvWtA1reYa46dxLe2hJ__E687KtOT4UOURg",
        headers: headerObj,
        body: JSON.stringify(objToSend)
    });
    console.log(JSON.parse(response.body))
    let employeeData = JSON.parse(response.body);

    //Validation
    emailError.style.display = 'none';
    emailBox.style.border = '';
    emailLogo.style.color = 'white';
    passwordError.style.display = 'none';
    passwordBox.style.border = '';
    passwordLogo.style.color = 'white';
    if(response.body == '0'){
        $("#loginbuttontext").show('fast');
        $("#loginspinner").hide('fast');
        emailError.style.display = 'block';
        emailBox.style.border = '2px solid red';
        emailLogo.style.color = 'red';
        return;
    }
    else if(employeeData[0].password == '1'){
        $("#loginbuttontext").show('fast');
        $("#loginspinner").hide('fast');
        passwordError.style.display = 'block';
        passwordBox.style.border = '2px solid red';
        passwordLogo.style.color = 'red';
        return;
    }
    else {
        employeeName = employeeData[0].name
        employeeId = employeeData[0].id
        employeeLocation = employeeData[0].location
        console.log("employee location", employeeLocation)
        console.log("employee internal id", employeeId)

        switchToMenu(employeeLocation, employeeId)
    }
}

/****************************************************** MAIN MENU *******************************************************************/

//Opens the script _h5_render_mobile_menu
function switchToMenu(locationId, employeeId){
    console.log("variables:", locationId + " | " + employeeId)

     location.replace("https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4540&deploy=1&compid=4973611&ns-at=AAEJ7tMQ3MLRz2V0C39yv7JG5n_QSmkcEmvki4c2jwgXEL1JIuI&locationId=" + locationId + "&employee=" + employeeId)

}

/**************************************************** BOL SIGNATURE *******************************************************************/

//Opens the script _h5_render_shipment_list
function shipments(empLocation, employeeId){

    console.log("empLocation", empLocation)

    console.log("empID", employeeId)

     let shipmentListURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4533&deploy=1&compid=4973611&ns-at=AAEJ7tMQQnn0sBPPal9X-sdaMPT6k-Lg0C1LlNelPbTuayxVg_Q&location=" + empLocation + "&employee=" + employeeId

    location.replace(shipmentListURL)

}

//Opens the script _h5_sl_render_bol_signature
function bolGenerator(shipmentId){

    console.log("shipmentId", shipmentId)


    let locationId = document.getElementById('h5ShipRecId').innerHTML;

    let employeeName = document.getElementById('employeeId').innerHTML;

    let bolURL = 'https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4528&deploy=1&compid=4973611&ns-at=AAEJ7tMQh7En6ZYooeNtapKW4UFw1EfewV5m-TsSs0aX5x31oXk&shipId=' + shipmentId + '&locationId=' + locationId + "&employee=" + employeeName
    window.open(bolURL)
    // location.reload()
}

//Clears the signature pad on the BOL
function clearSignature(){
    signaturePad.clear();
}

//Saves the BOL Signature on the signature pad, generates the BOL, and saves the signed BOL to the shipment
function saveSignatureSpin(){
    $("#signbuttontext").hide('fast');
    $("#signspinner").show('fast');
    setTimeout(saveSignature, 700)
}

function saveSignature() {
    console.log("Save Button Pressed")

    const data = signaturePad.toDataURL("image/jpeg").split(',')[1];;

    let shipmentId = document.getElementById('shipId').innerHTML;
    let locationId = document.getElementById('locationId').innerHTML;
    //let employeeName = document.getElementById('employeeName').innerHTML;
    let empName = document.getElementById('empName').value;
    let handlingUnits = document.getElementById('quantity').value;
    let trailer = document.getElementById('truck').value;
    let seal = document.getElementById('seal').value;
    let driverName = document.getElementById('driverName').value;
    let driverId = document.getElementById('driverId').value;
    let shipperLoaded = document.getElementById('byShipper').checked;
    let driverLoaded = document.getElementById('byDriver').checked;
    let shipperCounted = document.getElementById('byShipperCou').checked;
    let driverCountedPal = document.getElementById('byDriverPal').checked;
    let driverCountedPie = document.getElementById('byDriverPie').checked;
    let arrivalTime = document.getElementById('arrivalTime').value;
    let departureTime = document.getElementById('departureTime').value;
    //console.log(shipmentId)

    var parameters = {
        dataFile: data,
        shipId: shipmentId,
        //employee: employeeName,
        empId: empName,
        handUnits: handlingUnits,
        trailerNum: trailer,
        sealNum: seal,
        driverN: driverName,
        driverI: driverId,
        shipperL: shipperLoaded,
        driverL: driverLoaded,
        shipperC: shipperCounted,
        driverPal: driverCountedPal,
        driverPie: driverCountedPie,
        arrive: arrivalTime,
        depart: departureTime
    }

    console.log(parameters)

    var ns = loadModules();

    // var suiteletURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_bol_signature_save",
    //     deploymentId: "customdeploy_h5_sl_bol_signature_save",
    //     returnExternalUrl: true
    // });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    var signature = ns.https.post({
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4527&deploy=1&compid=4973611&ns-at=AAEJ7tMQjhQHbglAdOY2fuTI-r6CLWKqyP8lvwi43pFYlJySYEU",
        body: JSON.stringify(parameters),
        headers: headerObj
    })

    window.close()
    // if(signature.code == 200) {
    //     window.close()
    // }else{
    //     alert("ERROR!")
    // }
}

/****************************************************** MANIFEST MENU *******************************************************************/

//Opens the script _h5_render_manifest_menu
function manifests(locationId, employeeName){
    console.log("locationId", locationId + " | " + employeeName)


    location.replace("https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4617&deploy=1&compid=4973611&ns-at=AAEJ7tMQ9ybCvaYD4H0Cj-mp3YRA55efsCQjrgTHqiLSvcuyjy8&locationId=" + locationId + "&employee=" + employeeName)

}

//Opens the script _h5_sl_render_bol_manifest_table - List of Shipments Ready to Add to Manifest
function manifestTable(locationId, employeeName){
    console.log("locationId", locationId + " | " + employeeName)


    location.replace("https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4615&deploy=1&compid=4973611&ns-at=AAEJ7tMQuIo4cXsJeaBG_xYiQiOZEv6c4drXLVj3-06Q3Rd7rkg&locationId=" + locationId + "&employee=" + employeeName)

}

//Opens the script _h5_sl_render_bol_manifest - Barcode Reader
function manifestBarcode(locationId, employeeName){
    console.log("locationId", locationId + " | " + employeeName)

    location.replace("https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4614&deploy=1&compid=4973611&ns-at=AAEJ7tMQHaZLN2eBHu9nUczMUZ0XVIXOxIMdwQfZ3IyW6ai-Lz0&locationId=" + locationId + "&employee=" + employeeName)

}

//Opens the script _h5_sl_render_manifest_list - List of Manifests
function manifestList(locationId, employeeName){
    console.log("locationId", locationId + " | " + employeeName)

    location.replace("https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4616&deploy=1&compid=4973611&ns-at=AAEJ7tMQUE3BKwbfXl06e5gzQ_KUC3V_CQO1_dktZH0bSuSmNDQ&locationId=" + locationId + "&employee=" + employeeName)

}

//Creates and Adds Shipments to Manifest Record - _h5_sl_create_manifest
function addToManifest(shipmentData, trailerNumber, locationId, bolNumbers, date){
    console.log("create manifest", shipmentData + " | " + trailerNumber + "| " + locationId + "| " + bolNumbers + "|" + date)

    let ns = loadModules();

    let employeeName = document.getElementById('employeeName').innerHTML;
    let empName = document.getElementById('empName').value;

    let parameters = {
        shipIds: shipmentData,
        trailerNum: trailerNumber,
        locationId: locationId,
        bolNumbers: bolNumbers,
        date: date,
        employee: employeeName,
        empName: empName
    }

    console.log(parameters)

    // let suiteletAddManifestURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_create_manifest",
    //     deploymentId: "customdeploy_h5_sl_create_manifest",
    //     returnExternalUrl: true
    // });

    let headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let addToManifest = ns.https.post({
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4612&deploy=1&compid=4973611&ns-at=AAEJ7tMQ8eNa_YURBIPqsCnz7eNfn9GiOIgaETiWPV-3e7fmkT8",
        body: JSON.stringify(parameters),
        headers: headerObj
    })

    location.reload()
}

//Opens Manifest HTML Page for Drivers to Sign AFTER shipments are selected from a list to add to the Manifest - _h5_sl_render_manifest_signature
function buildManifest(shipmentData, trailerNumber, locationId, bolNumbers, date){
    console.log("Render Manifest Signature", shipmentData + " | " + trailerNumber + " | " + locationId + "| " + bolNumbers + "|" + date)

    let employeeName = document.getElementById('employeeName').innerHTML;
    let empName = document.getElementById('empName').value;

    console.log(employeeName, empName)

    let manifestURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4618&deploy=1&compid=4973611&ns-at=AAEJ7tMQfA7kHaAcW6OyEFdeLOJ4IdX4nWU2I9dy426_2Al13-Y&shipIds=" + shipmentData + "&trailerNumber=" + trailerNumber + "&locationId=" + locationId + "&bolNumbers=" + bolNumbers + "&date=" + date  + "&employee=" + employeeName + "&empName=" + empName

    window.open(manifestURL)

    location.reload()

}

//Opens Manifest HTML Pages for Drivers to Sign - _h5_render_manifest_signature
function openManifest(manifestData, locationId){
    console.log("Render Manifest Signature", manifestData + " | " + locationId)

    let employeeName = document.getElementById('employeeName').innerHTML;

    console.log(employeeName)

    for(x=0; x<manifestData.length; x++) {

        console.log(manifestData[x])

        let manifestURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4618&deploy=1&compid=4973611&ns-at=AAEJ7tMQfA7kHaAcW6OyEFdeLOJ4IdX4nWU2I9dy426_2Al13-Y&manifestIds=" + manifestData[x] + "&locationId=" + locationId + "&bolNumbers=false&shipIds=false" + "&employee=" + employeeName

        window.open(manifestURL)

    }

    location.reload()
}

function saveManifestSpin(){
    $("#saveManSignButtonText").hide('fast');
    $("#saveManSignSpinner").show('fast');
    setTimeout(saveManifestSignature, 700)
}

//Script - _h5_sl_manifest_signature_save
function saveManifestSignature(){
    console.log("Save Button Pressed")
    $("#saveManSignButtonText").hide('fast');
    $("#saveManSignSpinner").show('fast');

    const data = signaturePad.toDataURL("image/jpeg").split(',')[1];;

    let manifestId = document.getElementById('manifestId').innerHTML;
    let locationId = document.getElementById('h5ShipRecId').innerHTML;
    let trailer = document.getElementById('trailerNumber').value
    let sealNumber = document.getElementById('sealNumber').value;
    let handlingUnits = document.getElementById('quantity').value;
    let employee = document.getElementById('empName').value
    let driverName = document.getElementById('driverName').value;
    let driverId = document.getElementById('driverId').value;
    let shipperLoaded = document.getElementById('byShipper').checked;
    let driverLoaded = document.getElementById('byDriver').checked;
    let shipperCounted = document.getElementById('byShipperCou').checked;
    let driverCountedPal = document.getElementById('byDriverPal').checked;
    let driverCountedPie = document.getElementById('byDriverPie').checked;
    let arrivalTime = document.getElementById('arrivalTime').value;
    let departureTime = document.getElementById('departureTime').value;
    //console.log(shipmentId)

    var parameters = {
        dataFile: data,
        manId: manifestId,
        trailerNum: trailer,
        sealNum: sealNumber,
        handUnits: handlingUnits,
        emp: employee,
        driverN: driverName,
        driverI: driverId,
        shipperL: shipperLoaded,
        driverL: driverLoaded,
        shipperC: shipperCounted,
        driverPal: driverCountedPal,
        driverPie: driverCountedPie,
        arriveTime: arrivalTime,
        departTime: departureTime
    }

    console.log(parameters)

    //return

    var ns = loadModules();

    // var suiteletURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_manifest_signature_sa",
    //     deploymentId: "customdeploy_h5_sl_manifest_signature_sa",
    //     returnExternalUrl: true
    // });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    var signature = ns.https.post({
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4613&deploy=1&compid=4973611&ns-at=AAEJ7tMQug_FKRgxL_V4Px1S5wjfkLxo8xE5T1yOhwlp9zathc4",
        body: JSON.stringify(parameters),
        headers: headerObj
    })

    window.close()

}

function manifestPhotos(locationId, employeeName){

    location.replace("https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=5202&deploy=1&compid=4973611&ns-at=AAEJ7tMQQ-kqbga1cBtaM4XXt-iUdtKYohnqOFc7mCAKibn3tzc&locationid=" + locationId + "&employee=" + employeeName)
}

function takeManifestPhoto(manifestId){
    let locationId = document.getElementById('locationId').innerHTML;
    let employeeName = document.getElementById('employeeName').innerHTML;

    console.log("ManifestId | LocationId", manifestId + " | " + locationId)
    console.log("employeeName", employeeName)

    let renderManiPhotoURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=5203&deploy=1&compid=4973611&ns-at=AAEJ7tMQDMqGq0D5qxb6cW8psh9gH9Np1ZkDM0wRA520EZV7RsA&manifestId=" + manifestId + '&locationId=' + locationId + "&employee=" + employeeName
    location.replace(renderManiPhotoURL)
}

//saves the photos taken in the "Shipment Photo" script
function saveManiPhoto(data, photoNum){
    console.log("Take Photo Button")

    console.log("picture data", data)
    console.log("picture Num", photoNum)

    let ns = loadModules();

    let location = document.getElementById('locationID').innerHTML;
    console.log(location)

    let manifestId = document.getElementById('manifestId').innerHTML;
    console.log(manifestId)

    let parameters = {
        dataFile: data,
        photoNum: photoNum,
        manifestId: manifestId,
        locationId: location
    }

    console.log(parameters)

    // let suiteletPhotoURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_manifest_photo_save",
    //     deploymentId: "customdeploy_h5_sl_manifest_photo_save",
    //     returnExternalUrl: true
    // });

    let headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let photo = ns.https.post({
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=5205&deploy=1&compid=4973611&ns-at=AAEJ7tMQPHhjYudtPLuzjvd0L6R-dxnlPDxFkkqfoX-Y7gME9_E",
        body: JSON.stringify(parameters),
        headers: headerObj
    })

}

function deleteManiPhotos(manifestId){
    console.log("Delete Photo Button")
    console.log("manifestId", manifestId)

    const deleteDone = document.getElementById('deleted');
    const deleteActive = document.getElementById('delete');
    const canvas = document.getElementById('canvas');
    const snap = document.getElementById("snap");
    const snapRedo = document.getElementById("snapAgain");
    const cameraDiv = document.getElementById('cameraDiv');

    let ns = loadModules();

    let parameters = {
        manifestId: manifestId,
    }


    canvas.style.display = 'none';
    snapRedo.style.display = 'none';
    deleteActive.style.display = 'none';

    cameraDiv.style.display = 'block';
    snap.style.display = 'block';
    deleteDone.style.display = 'block';


    console.log(parameters)

    // let suiteletPhotoURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_manifest_photo_delete",
    //     deploymentId: "customdeploy_h5_sl_manifest_photo_delete",
    //     returnExternalUrl: true
    // });

    let headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let photoDelete = ns.https.post({
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=5204&deploy=1&compid=4973611&ns-at=AAEJ7tMQqfMZKLD_sRQHc-DkvwPS1sb2NQwzAkk9RSnSD26aEsY",
        body: JSON.stringify(parameters),
        headers: headerObj
    })

}

/*********************************************** MULTISTOPS *******************************************************************/

//Opens the script _h5_sl_render_multistop_list - List of Multistops
function multiStopList(locationId, employeeName){
    console.log("locationId", locationId + " | " + employeeName)

    location.replace("https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=7481&deploy=1&compid=4973611&ns-at=AAEJ7tMQZnNfYFE508I_s058szldU0FXp7Dz6AW3VAx2biQoO9I&locationId=" + locationId + "&employee=" + employeeName)

}

function openMultiStop(multiStopData){
    console.log("Render MultiStop Signature", multiStopData)

    let locationId = document.getElementById("locationId").innerHTML
    let employee = document.getElementById("employeeName").innerHTML
    let manifestURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=7482&deploy=1&compid=4973611&ns-at=AAEJ7tMQOUr3JOsHahawfHeWXXXODxiKHIJSQTtBXOd73XR8v5s&multiStopId=" + multiStopData + "&locationId=" + locationId + "&employee=" + employee

    window.open(manifestURL)

    location.reload()
}
//Script - _h5_sl_manifest_signature_save
function saveMultiStopSignature(){
    console.log("Save Button Pressed")

    const data = signaturePad.toDataURL("image/jpeg").split(',')[1];

    var parameters = {
        dataFile: data,
        manId: document.getElementById('shipId').innerHTML,
        trailerNum:  document.getElementById('trailerNumber').value,
        sealNum: document.getElementById('sealNumber').value,
        emp: document.getElementById('empName').value,
        driverName: document.getElementById('driverName').value,
        driverId: document.getElementById('driverId').value,
        shipperLoaded: document.getElementById('byShipper').checked,
        driverLoaded: document.getElementById('byDriver').checked,
        shipperCounted: document.getElementById('byShipperCou').checked,
        driverCountedPal: document.getElementById('byDriverPal').checked,
        driverCountedPie: document.getElementById('byDriverPie').checked,
        arriveTime: document.getElementById('arrivalTime').value,
        departTime: document.getElementById('departureTime').value
    }

    console.log(parameters)

    //return

    var ns = loadModules();

    // var suiteletURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_save_multistop_cover",
    //     deploymentId: "customdeploy_h5_sl_save_multistop_cover",
    //     returnExternalUrl: true
    // });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    var signature = ns.https.post({
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=7483&deploy=1&compid=4973611&ns-at=AAEJ7tMQYFXp8tIm376zGITU2KAiYYNUy5o0ll2sdgG35lSb-dc",
        body: JSON.stringify(parameters),
        headers: headerObj
    })

    window.close()

}

/*********************************************** PRINTING SHIPPING DOCS *******************************************************************/

//Opens the script _h5_sl_render_print_ship_docs
function shipDocPrinter(locationId, employeeName){

    console.log("locationId", locationId)
    console.log("employeeName", employeeName)


    let printingURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4535&deploy=1&compid=4973611&ns-at=AAEJ7tMQ2hcA4AtqwN4uCD6vz-TktOFjnM6xI9QMq6kXe9IOHAE&locationid=" + locationId + "&employee=" + employeeName

    location.replace(printingURL)

}

//Prints the shipping documents for shipments selected
function printDocs(shipRecIds){
    console.log("ShipRecIds", shipRecIds)

    let ns = loadModules();

    let labelPrintSelect = document.getElementById('labelPrinters').value;
    console.log("label printer", labelPrintSelect)

    let laserPrinter = document.getElementById('laserPrinters').value;
    console.log("laser printer", laserPrinter)

    let shipmentsToSend = {
        ships: shipRecIds,
        labelPrinter: labelPrintSelect,
        bolPrinter: laserPrinter
    }

    console.log(shipmentsToSend)

    // let suiteletURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_submit_print_jobs",
    //     deploymentId: "customdeploy_h5_sl_submit_print_jobs",
    //     returnExternalUrl: true
    // });

    let headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let response = ns.https.post({
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4265&deploy=1&compid=4973611&ns-at=AAEJ7tMQ5ycUfiw54zfXouc3j_02MewnA2Qmh-IAdxNO9geC7Gw",
        headers: headerObj,
        body: JSON.stringify(shipmentsToSend)
    })

    location.reload()
}

/******************************************************* SHIPMENT PHOTOS *******************************************************************/

//Opens the script _h5_sl_render_shipment_photo_list
function shipmentPictures(warehouseLocation, employeeName){

    console.log("Warehouse Location", warehouseLocation)
    console.log("employeeName", employeeName)

    let shipmentPhotoListURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4534&deploy=1&compid=4973611&ns-at=AAEJ7tMQb7u0Ukd_mX5I2otGHIey7ZRgOYIZ2kEMQwK8oGwOyGk&warehouselocation=" + warehouseLocation + "&employee=" + employeeName

    location.replace(shipmentPhotoListURL)

}

//renders script _h5_sl_render_shipment_photo
function takePhotos(shipmentId){

    let locationId = document.getElementById('locationId').innerHTML;
    let employeeName = document.getElementById('employeeName').innerHTML;


    console.log("ShipmentId | LocationId", shipmentId + " | " + locationId)
    console.log("employeeName", employeeName)

    let renderShipPhotoURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4538&deploy=1&compid=4973611&ns-at=AAEJ7tMQmV4GUIXqifzhaslmXD80Ea6PmjNc41G7AcbLKL-djQo&shipmentId=" + shipmentId + '&locationId=' + locationId + "&employee=" + employeeName
    location.replace(renderShipPhotoURL)
}

//saves the photos taken in the "Shipment Photo" script
function savePhoto(data, photoNum){
    console.log("Take Photo Button")

    console.log("picture data", data)
    console.log("picture Num", photoNum)

    let ns = loadModules();

    let location = document.getElementById('locationID').innerHTML;
    console.log(location)

    let shipmentId = document.getElementById('shipRecID').innerHTML;
    console.log(shipmentId)

    let parameters = {
        dataFile: data,
        photoNum: photoNum,
        shipId: shipmentId,
        locationId: location
    }

    console.log(parameters)

    // let suiteletPhotoURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_shipment_photo_save",
    //     deploymentId: "customdeploy_h5_sl_shipment_photo_save",
    //     returnExternalUrl: true
    // });

    let headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let photo = ns.https.post({
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4539&deploy=1&compid=4973611&ns-at=AAEJ7tMQd0Te3Diz4NbmdUXF3W3ZAiWmYr18_b75InW9ooWjbNU",
        body: JSON.stringify(parameters),
        headers: headerObj
    })

}

function deletePhotos(shipId){
    console.log("Delete Photo Button")
    console.log("shipId", shipId)

    const deleteDone = document.getElementById('deleted');
    const deleteActive = document.getElementById('delete');
    const canvas = document.getElementById('canvas');
    const snap = document.getElementById("snap");
    const snapRedo = document.getElementById("snapAgain");
    const cameraDiv = document.getElementById('cameraDiv');

    let ns = loadModules();

    let parameters = {
        shipId: shipId,
    }


    canvas.style.display = 'none';
    snapRedo.style.display = 'none';
    deleteActive.style.display = 'none';

    cameraDiv.style.display = 'block';
    snap.style.display = 'block';
    deleteDone.style.display = 'block';


    console.log(parameters)

    // let suiteletPhotoURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_shipment_photo_delete",
    //     deploymentId: "customdeploy_h5_sl_shipment_photo_delete",
    //     returnExternalUrl: true
    // });

    let headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let photoDelete = ns.https.post({
        url: "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4621&deploy=1&compid=4973611&ns-at=AAEJ7tMQsfYkEuhqdXYLA7MzH0givQQVQtjAK1JBbh23sBTmtvc",
        body: JSON.stringify(parameters),
        headers: headerObj
    })

}

/**************************************************** BOL SEARCH ******************************************************************/

//_h5_sl_render_bol_search
function bolSearch(locationId, employeeName){

    console.log("locationId", locationId)
    console.log("employeeName", employeeName)


    location.replace("https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=5201&deploy=1&compid=4973611&ns-at=AAEJ7tMQB2tCk_GcBJvHfJgmqi7HHEJUCLsvzKx8OMHayzM3y0I&locationId=" + locationId + "&employee=" + employeeName)
}

function searchSpin(){
    $("#searchButtonText").hide('fast');
    $("#searchSpinner").show('fast');
    $("#searchButton").animate({ width: '-=100px !important' }, 300);
    setTimeout(searchBOL, 100)
}

function searchBOL(){

    let soNum = document.getElementById('printchatbox').innerHTML;
    let locationId = document.getElementById('h5ShipRecId').innerHTML;
    let employeeName = document.getElementById('employeeName').innerHTML;
    let chatbox = document.getElementById('printchatbox');
    let error = document.getElementById('notFound');

    console.log(soNum + "| " + locationId + "| " + employeeName)

    //Get Employee ID
    let objToSend = {
        soNum: soNum,
    }

    let ns = loadModules()

    // let suiteletURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_validate_bol",
    //     deploymentId: "customdeploy_h5_sl_validate_bol",
    //     returnExternalUrl: true
    // });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let response = ns.https.post({
        url:"https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=5200&deploy=1&compid=4973611&ns-at=AAEJ7tMQW3jQHFYEHHEN0cMHFYtBS8-7E6Ypn8SOGTJMj4hwEKM",
        headers: headerObj,
        body: JSON.stringify(objToSend)
    });

    console.log(JSON.parse(response.body))
    let shipmentData = JSON.parse(response.body);

    if(shipmentData.code == 201){
        console.log("Success!")

        openBOL(shipmentData.shipmentId, locationId, employeeName)
    }else{
        console.log("not a shipment")

        chatbox.style.border = '10px solid red';
        error.style.display = "block"

        let searchButtonText = document.getElementById('searchButtonText');
        searchButtonText.style.display = "block"
        let searchSpinner = document.getElementById('searchSpinner');
        searchSpinner.style.display = "none"


        return;
    }
}

//Opens the script _h5_sl_render_bol_signature
function openBOL(shipmentId, locationId, employeeName){

    console.log("shipmentId", shipmentId)

    let bolURL = 'https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4528&deploy=1&compid=4973611&ns-at=AAEJ7tMQh7En6ZYooeNtapKW4UFw1EfewV5m-TsSs0aX5x31oXk&shipId=' + shipmentId + '&locationId=' + locationId + "&employee=" + employeeName
    window.open(bolURL)
    location.reload()
}

/******************************************************* Section 321 *******************************************************************/

function section321(locationId, employeeName){

    console.log("locationId", locationId)
    console.log("employeeName", employeeName)


    let sectionURL = "https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6796&deploy=1&compid=4973611&ns-at=AAEJ7tMQ-DwGZ54Ri74IPwUW6Dc4uDQuS49U8aFyoNIWmggOwLo&locationid=" + locationId + "&employee=" + employeeName

    location.replace(sectionURL)

}

function create321Spinner(){
    createWaiter();
    setTimeout(create321, 50);
}

function create321(){

    let carrier, carrierScac, carrierId
    if(document.getElementById("carrier").value == 1){ //Danby
        carrier = "DANBY TRUCK"
        carrierScac = "DPLH"
        carrierId = "209"
    }else if(document.getElementById("carrier").value == 2){ //Pony
        carrier = "PONY EXPRESS LTD"
        carrierScac = "PYXD"
        carrierId = "320"
    }else{
        alert("No Carrier Selected.")
        return
    }

    let sendObj = {
        carrierName: carrier,
        carrierScac: carrierScac,
        carrier: carrierId,
        fedEx: document.getElementById("fedexSkids").value,
        ups: document.getElementById("upsSkids").value
    }

    console.log("sendObj", sendObj)

    let ns = loadModules();

    // let suiteletURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_sec321_bol",
    //     deploymentId: "customdeploy_h5_sl_sec321_bol",
    //     returnExternalUrl: true
    // });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let response = ns.https.post({
        url:"https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6795&deploy=1&compid=4973611&ns-at=AAEJ7tMQTREpFpqHRAV-f_rNxQHfMPnjfMlcQej3gVvkqtv_XwE",
        headers: headerObj,
        body: JSON.stringify(sendObj)
    });

    console.log("response", JSON.parse(response.body))
    if (JSON.parse(response.body).code == 201) {
        let message = JSON.parse(response.body).message

        alert(message)
        location.reload();

    } else {
        let message = JSON.parse(response.body).message
        alert(message)
        location.reload();
    }
}

/******************************************************* MODALS *******************************************************************/

let modalData = []

function getShipData(shipModelData){
    let shipId = shipModelData.id
    console.log(shipId)

    let ns = loadModules();

    // let suiteletURL = ns.url.resolveScript({
    //     scriptId: "customscript_h5_sl_get_shipment_data_mod",
    //     deploymentId: "customdeploy_h5_sl_get_shipment_data_mod",
    //     returnExternalUrl: true
    // });

    var headerObj = {
        name: "User-Agent",
        value: "Mozilla/5.0"
    };

    let response = ns.https.post({
        url:"https://4973611.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4620&deploy=1&compid=4973611&ns-at=AAEJ7tMQ6zgNYYunSlYV4lVT667gOWp9jeW4Tzh_2TIjyj4C1R0",
        headers: headerObj,
        body: shipId
    });

    console.log(response.body)

    modalData = JSON.parse(response.body)

    buildModal()

}

function buildModal() {

    console.log("buildModal")
    let modalContainer = document.getElementById('modalBodyContainer')

    let modalBody = '<p><b>Shipment Name: </b>' + modalData[0].shipName + '</p> <p><b>Sales Orders: </b> ' + modalData[0].soId + '</p> <p><b>Ref at Pickup: </b> ' + modalData[0].pickupRef + '</p> <p><b>Carrier: </b> ' + modalData[0].carrier + '</p> <p><b>Pro Number: </b> ' + modalData[0].proNumber + '</p> <p><b>Shipment Type: </b> ' + modalData[0].shipType + '</p>'

    modalContainer.innerHTML = modalBody;
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