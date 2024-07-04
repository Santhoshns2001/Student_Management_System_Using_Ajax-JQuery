
$(document).ready(function () {
    ShowStudents();
});

function ShowStudents() {
    $.ajax({
        url: '/Student/GetStudents',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.studentId + '</td>';
                object += '<td>' + item.studentName + '</td>';
                object += '<td>' + item.gender + '</td>';
                object += '<td>' + item.class + '</td>';
                object += '<td>' + item.rollNo + '</td>';
                object += '<td>' + new Date(item.dob).toLocaleDateString('en-US') + '</td>';
                object += '<td>' + item.address + '</td>';
                object += '<td>' + item.city + '</td>';
                object += '<td>' + item.phoneNumber + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.studentId + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.studentId + ')">Delete</a></td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("student data can't get");
        }
    });
}

$('#btnAddStudent').click(function () {
    ClearTextBox();
    $('#StudentModal').modal('show');
    $('#studentId').hide();
    $('#AddStudent').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#studentHeading').text('Add Student');
});

function AddStudent() {
    var objData = {
        studentName: $('#StudentName').val(),
        gender: $('#Gender').val(),
        class: $('#Class').val(),
        rollNo: $('#RollNo').val(),
        dob: $('#DOB').val(),
        address: $('#Address').val(),
        city: $('#City').val(),
        phoneNumber: $('#PhoneNumber').val()
    };
    $.ajax({
        url: '/Student/AddStudent/',
        type: 'POST',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        dataType: 'json',
        success: function () {
            alert('Data Saved');
            ShowStudents();
            HideModalPopUp();
            ClearTextBox();
        },
        error: function () {
            alert('Data has not been saved');
        }
    });
}

function HideModalPopUp() {
    $('#StudentModal').modal('hide');
}

function ClearTextBox() {
    $('#StudentId').val('');
    $('#StudentName').val('');
    $('#Gender').val('');
    $('#Class').val('');
    $('#RollNo').val('');
    $('#DOB').val('');
    $('#Address').val('');
    $('#City').val('');
    $('#PhoneNumber').val('');
}

function Delete(studentId) {
    if (confirm('Are you sure you want to delete this record?')) {
        $.ajax({
            url: '/Student/Delete?studentId=' + studentId,
            success: function () {
                alert('Record deleted');
                ShowStudents();
            },
            error: function () {
                alert('Record cannot be deleted');
            }
        });
    }
}

function Edit(studentId) {
    $.ajax({
        url: '/Student/Edit?studentId=' + studentId,
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#StudentModal').modal('show');
            $('#StudentId').val(response.studentId);
            $('#StudentName').val(response.studentName);
            $('#Gender').val(response.gender);
            $('#Class').val(response.class);
            $('#RollNo').val(response.rollNo);
            $('#DOB').val(response.dob);
            $('#Address').val(response.address);
            $('#City').val(response.city);
            $('#PhoneNumber').val(response.phoneNumber);

            $('#AddStudent').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#studentHeading').text('Update Record');
        },
        error: function () {
            alert('Data not found');
        }
    });
}

function UpdateStudent() {
    var objData = {
        studentId: $('#StudentId').val(),
        studentName: $('#StudentName').val(),
        gender: $('#Gender').val(),
        class: $('#Class').val(),
        rollNo: $('#RollNo').val(),
        dob: $('#DOB').val(),
        address: $('#Address').val(),
        city: $('#City').val(),
        phoneNumber: $('#PhoneNumber').val()
    };
    $.ajax({
        url: '/Student/UpdateStudent',
        type: 'POST',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        dataType: 'json',
        success: function () {
            alert('Data Updated');
            ShowStudents();
            HideModalPopUp();
            ClearTextBox();
        },
        error: function () {
            alert('Data has not been saved');
        }
    });
}
