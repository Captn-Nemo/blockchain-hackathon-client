
function getTransactions() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://10.66.116.98:3000/api/composers.financial.sendBill", false);
    xhttp.send();
    var res = xhttp.responseText;
    res = JSON.parse(res);
    for(var i = 0; i < 5; i++){
        $('#transaction-sent').append("<tr><td>" + res[i].bill.amount + "</td><td>" + res[i].bill.billID + "</td><td>" +
            res[i].bill.moneyID + "</td><td>" + res[i].bill.patientID + "</td><td>" + res[i].timestamp + "</td><td>" +
            res[i].bill.paid + "</td></tr>");
    }

    xhttp.open("GET", "http://10.66.116.98:3000/api/composers.financial.PayBill", false);
    xhttp.send();
    var res = xhttp.responseText;
    res = JSON.parse(res);
    for(var i = 0; i < 5; i++){
        $('#transaction-paid').append("<tr><td>" + res[i].bill.amount + "</td><td>" + res[i].bill.billID + "</td><td>" +
            res[i].bill.moneyID + "</td><td>" + res[i].bill.patientID + "</td><td>" + res[i].timestamp + "</td><td>" +
            res[i].bill.paid + "</td></tr>");
    }
}

window.onload = getTransactions();