$(document).ready(function(){

    $("#update").hide();
    assignDataToTable();

    // Delete
    $('table').on('click', 'button[id="delete"]', function(e){
        var id = $(this).closest('tr').children('td:first').text();

        $.ajax({
            type:"DELETE",
            url:"http://localhost:8081/api/v1/tasks/" + id,
            success: function(data){
                assignDataToTable();
            },
            error: function(err) {
                console.log(err);
                alert(err);
            }
        });
    })

    //Edit
    $('table').on('click', 'button[id="edit"]', function(e){
        var id = $(this).closest('tr').children('td:first').text();
        var title = $(this).closest('tr').children('td:nth-child(2)').text();

        $("#title").val(id);
        $("#content").val(title);

        $("#update").show();
        $("#save").hide();

        $("#update").click(function() {

            var jsonVar = {
                title: $("#title").val(),
                content: $("#content").val(),
            };

            var id = $("#title").val()
            const params = new URLSearchParams({
                title: $("#title").val(),
                content: $("#content").val(),
            })

            const url = "http://localhost:8081/api/v1/tasks/" +"?" + params;

            $.ajax({
                type:"PUT",
                data: JSON.stringify(jsonVar),
                contentType: "application/json",
                url: url,
                success: function(data){
                    $("#update").hide();
                    $("#save").show();
                    $("#title").val("");
                    $("#content").val("");
                    assignDataToTable();
                },
                error: function(err) {
                    console.log(err);
                    alert(err);
                }

            });

        });

    })

    var age = $("#age");

    age.keypress(function(key){
        if(key.charCode > 48 && key.charCode < 57){
            if(age.val().length < 3){
                return true;
            }else{
                alertUsing("3 Haneyi Aştınız.", false);
                return false;
            }
        }else{
            alertUsing("Sayı Giriniz.", false);
            return false;
        }
    });

    $("#save").click(function() {

        var jsonVar = {
            title: $("#title").val(),
            content: $("#content").val(),
        };

        const params = new URLSearchParams({
            title: $("#title").val(),
            content: $("#content").val(),
        })

        const url = "http://localhost:8081/api/v1/tasks/" +"?" + params;

        $.ajax({
            type:"POST",
            url:url,
            data: JSON.stringify(jsonVar),
            contentType: "application/json",
            success: function(data){
                assignDataToTable();
            },
            error: function(err) {
                console.log(err);
                alert(err);
            }
        });

    });

    function assignDataToTable() {
        $("tbody").empty();
        $.ajax({
            type:"GET",
            contentType: "application/json",
            url:"http://localhost:8081/api/v1/tasks",
            success: function(data) {
                var tasks = JSON.parse(JSON.stringify(data));
                for (var i in tasks) {
                    $("tbody").
                    append("<tr> \
                            <td>" +  tasks[i].id + "</td> \
                            <td>" +  tasks[i].title + "</td> \
                            <td>" +  tasks[i].content + "</td> \
                            <td> \ <button id='delete' class='btn btn-danger'>Delete</button> \
                           <button id='edit' class='btn btn-warning'>Edit</button> \ </td> \
                        </tr>");
                }
            },
            error: function(data) {
                console.log(data);
            }
        });

    }

    function alertUsing(text, flag) {

        var alert = $(".alert");

        if(flag){
            alert.removeClass("alert-danger").addClass("alert-success");
        }else{
            alert.removeClass("alert-success").addClass("alert-danger");

        }

        alert.fadeIn(400);
        alert.css("display", "block");
        alert.text(text);
        setTimeout(function() {
            alert.fadeOut();
        }, 2000);

    }

});