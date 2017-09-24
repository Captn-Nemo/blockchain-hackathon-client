function selectPatient(event) {
    console.log(event);
}

function getPatients() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://10.66.116.98:3000/api/composers.participants.Patient", false);
    xhttp.send();
    var res = xhttp.responseText;
    res = JSON.parse(res);
    for (var person in res) {
        $("#patient-dropdown").append("<li onselect=selectPatient(event)>" + res[person].firstname + " " +
            res[person].lastname + "</li>");
    }

    xhttp.open("GET", "http://10.66.116.98:3000/api/composers.healthrecords.updateMedication", false);
    xhttp.send();
    var res = xhttp.responseText;
    res = JSON.parse(res);

    // pretend there's only one patient
    var medArr = res[0].medicationArray;
    console.log(medArr);
    for (var i = 0; i < medArr.length; i++) {
        $('#med-desc').append("<tr><td>" + medArr[i] + "</td></tr>");
    }

}

$('#patient-dropdown').on('click', '.btn-select', function(e) {
    e.preventDefault();
    var ul = $(this).find("ul");
    if ($(this).hasClass("active")) {
        if (ul.find("li").is(e.target)) {
            var target = $(e.target);
            target.addClass("selected").siblings().removeClass("selected");
            var value = target.html();
            $(this).find(".btn-select-input").val(value);
            $(this).find(".btn-select-value").html(value);
        }
        ul.hide();
        $(this).removeClass("active");
    } else {
        $('.btn-select').not(this).each(function() {
            $(this).removeClass("active").find("ul").hide();
        });
        ul.slideDown(300);
        $(this).addClass("active");
    }
});

$('#updateMeds').submit(function(e) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://10.66.116.98:3000/api/composers.healthrecords.updateMedication", false);
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send(JSON.stringify({
        "$class": "composers.healthrecords.updateMedication",
        "medicationArray": [$('#medicine').val()],
        "patientInfo": {
            "$class": "composers.healthrecords.PatientInfo",
            "patientID": $('#patientID').val(),
            "name": {
                "$class": "composers.healthrecords.Name",
                "firstName": "",
                "lastName": ""
            },
            "medicationArray": [],
            "pastVisitsArray": []
        }
    }));
    //hello
    var res = xhttp.responseText;
    res = JSON.parse(res);

    // var medArr = res[0].medicationArray;
    // console.log(medArr);
    // for (var i = 0; i < medArr.length; i++) {
    //     $('#med-desc').append("<tr><td>" + medArr[i] + "</td></tr>");
    // }
});

window.onload = getPatients();