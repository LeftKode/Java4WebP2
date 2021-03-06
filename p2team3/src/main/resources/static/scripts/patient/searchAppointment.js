$(document).ready(function () {

    var table = $('#table_id').DataTable({
        ajax:{
            url:'http://localhost:8080/patients/appointments',
            dataSrc:''
        },
        "searching": false,
        "bLengthChange": false,
        columns:[
            {data: 'dateTime'},
            {data: 'id'},
            {data: 'doctor.lastName',
            "render":function(data, type, full, meta){
                return full.doctor.lastName + ' ' + full.doctor.firstName;}
            },
            {data: 'doctor.specialty.name'},
            {data: null,
                "render":function(data, type, row, meta){
                    return "<a class='btn btn-primary' href='http://localhost:8080/pages/patient/editAppointment.html?id=" +data.id+ "'>Επεξεργασία</a>";}
            }
        ]
    });

    $.ajax({
        url: ROOT_PATH + "/specialties"
    }).then(function (specialties) {
        populateDropdown(specialties);
        $('#dp1 a').click(function () {
            $('#dropdownMenuButton1').text($(this).text());
            $('#dropdownMenuButton1').attr('data-id',$(this).attr('id'));
        });
    });

    $('#searchButton').click(function(){
        var myData={};
        if($("#dropdownMenuButton1").text().trim()!='Ειδικότητα'){
            myData.spec = $("#dropdownMenuButton1").attr('data-id');
        }
        if($('#date1').val()!=''){
            var date1 =  $('#date1').val();
            var fixedDate1 = formatDate(date1);
            myData.from = fixedDate1;
        }

        if($('#date2').val()!=''){
            var date2 =  $('#date2').val();
            var fixedDate2 = formatDate(date2);
            myData.to = fixedDate2;
        }

        if ($('#table_id').DataTable) {
            $('#table_id').DataTable().destroy()
        }

        var table = $('#table_id').DataTable({
            ajax:{
                url:'http://localhost:8080/patients/appointments',
                dataSrc:'',
                data: myData
            },
            "searching": false,
            "bLengthChange": false,
            columns:[
                {data: 'dateTime'},
                {data: 'id'},
                {data: 'doctor.lastName',
                "render":function(data, type, full, meta){
                    return full.doctor.lastName + ' ' + full.doctor.firstName;}
                },
                {data: 'doctor.specialty.name'},
                {data: null,
                    "render":function(data, type, row, meta){
                        return "<a class='btn btn-primary' href='http://localhost:8080/pages/patient/editAppointment.html?id=" +data.id+ "'>Επεξεργασία</a>";}
                }
            ]
        });

    })


});

function formatDate(initDate) {
    const splitDate = initDate.split(" ");
    const date = splitDate[0];
    let time = splitDate[1];
    const pm = splitDate[2];
    const hoursmins = time.split(":");
    let hours = hoursmins[0];
    const mins = hoursmins[1];
    if(pm=="PM"){
        const editedhours= Number(hours)+12;
        time = editedhours.toString().concat(":",mins);
    }
    const dateParts = date.split("/");
    const year = dateParts[2];
    const month = dateParts[0];
    const day = dateParts[1];
    const formattedDate = year.concat("/", month, "/", day, " ", time);
    return formattedDate;
}

function populateDropdown(specialties) {
    jQuery.each(specialties, function (i, specialty) {
        $("#dp1").append("<a class='dropdown-item' href='#' id='" + specialty.id + "'>" + specialty.name + "</a>");
    });

    $('#dp1 a').click(function () {
        $('#dropdownMenuButton1').text($(this).text());
        $('#dropdownMenuButton1').attr('data-id', $(this).attr('id'));

    });
}

