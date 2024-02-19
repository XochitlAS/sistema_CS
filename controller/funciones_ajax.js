$(document).ready(function(){

    Musuarios();
    notisTerminadas();

    guardar_notificacion();

    $("#formServicio").submit(function(e) {
        const dataPost = {
            nombre:$("#nombre").val(),
            telefono:$("#telefono").val(),
            direc:$("#direc").val(),
            rdirec:$("#redirec").val(), 
           tservicio:$("#tservicio").val(),
            probleP:$("#probleP").val(),
            agente:$("#agente").val(),
        };

        $.ajax({
            url:"../model/guardar_servicio.php",
            data:dataPost,
            type:"POST",    
            success:function(response){
                if(!response.error){ 
                    $("#formServicio").trigger("reset");
                    console.log(dataPost);
                }               
            }
        });
        e.preventDefault();
    });

        $("#formUsuario").submit(function(e){
            const datap = {
                nombre:$("#nombrec").val(),
                telefono:$("#telefono").val(),
                nivel:$("#nivelusuario").val(),
                estatus:$("#status").val(),
                usuario:$("#usuario").val(),
                password:$("#password").val(),

            };
            $.ajax({
                url:"../model/guardar_usuario.php",
                data:datap,
                type:"POST",
                success: function(response){
                    if(!response.error){
                        Musuarios();
                        $("#formUsuario").trigger("reset");
                        $("#agUsuario").modal("toggle");
                    } 
                }
            });
            e.preventDefault();
        });

  
        function Musuarios(){
            $.ajax({
                url:"../model/mostrar_usuarios.php",
                type:"GET",
                success:function(response){
                    if(!response.error){
                    const usuarios = JSON.parse(response);
                    let plantilla ="";
                    usuarios.forEach(usuario => {
                        plantilla +=` <tr Id_usuario=${usuario.id}>
                                <td>${usuario.id}</td>
                                <td>${usuario.nombre}</td>
                                <td>${usuario.telefono}</td>
                                <td>${usuario.registro}</td>
                                <td>${usuario.estatus}</td>
                                <td>
                            <button name="s" class="btn btn-warning cliente-item " data-toggle="modal" data-target="#infoUsuario">
                                <i class="fa-solid fa-info"></i>
                            </button>
                            <button class="btn btn-danger persona-delete">
                                <i class="fa-solid fa-xmark"></i>                            
                            </button>
                        </td>
                    </tr>`
                });
                $("#registros").html(plantilla);
                }
            }
            });
        }


             let servId;
   
            $.ajax({
                url:"../model/mostrar_servicios.php",
                type:"GET",
                success:function(response){
                    if(!response.error){
                        const servicio = JSON.parse(response);
                        let tabla ="";
                        servicio.forEach(servicio =>{
                            tabla +=`<tr> <td>${servicio.id}</td>
                            <td>${servicio.name}</td>
                            <td>${servicio.direc}</td>
                            <td>${servicio.tipo}</td>
                            <td>${servicio.prop}</td>
                            <td>${servicio.agente}</td>
                            <td>
                            <button type="button" id="servi" data-id="${servicio.id}" class="btn btn-primary" data-toggle="modal" data-target="#asgTec">
                            ASIGNAR TECNICO(S)</button>
                             </td>
                            </tr>`
                        });
                        $("#serv").html(tabla);

                        $("#serv").on("click", "#servi", function () {
                            servId = $(this).attr("data-id");
                            guardar_notificacion(servId); 
                        });
                        
                        $("#asgTec").on("show.bs.modal", function(){
                            $.ajax({
                                url:"../model/mostrar_tecnicos.php",
                                type:"GET",
                                success:function(response){
                                    if(!response.error){
                                        const tecnico = JSON.parse(response);
                                        let tab ="";
                                        tecnico.forEach(tecnico =>{
                                            tab +=`<tr>
                                            <td>${tecnico.id}</td>
                                            <td>${tecnico.name}</td>
                                            <td>${tecnico.estatus}</td>
                                            <td>
                                            <button id="noti" data-id="${tecnico.id}" type="button" class="btn btn-primary" >
                                            ASIGNAR TRABAJO</button>
                                             </td>
                                            </tr>`
                                        });
                                        $("#tec").html(tab);
                                      
                                    }
                                }
                            });          
                        });            
                    }  
                    
                    
                }
                
            }); 
            function guardar_notificacion(servId){
                $("#tec").on("click","#noti",function(){
                    var botonId = $(this).attr("data-id");
                    $.ajax({
                        url:"../model/notificaciones.php",
                        type:"POST",
                        data:{botonId: botonId, servId: servId},
                        success: function(response){
                            console.log(response);
                        },
                        error: function(error){
                            console.error("Error en la solicitud AJAX", error);
                        }
                    })
                   
                });
            }
            
            

                /*$.get("../model/mostrar_tecnicos.php", function(data){
                    console.log(data);
                    
                    const tab = $(`
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Estatus</th>
                        <tr>
                    </table>`);
        
                    data.forEarch(d =>{ //<-- ME MARCA ERROR EN ESTA LINEA POR QUE DICE QUE NO ES UNA FUNCION
                        tab.append(`
                        <tr>
                            <td>${d.id}</td>
                            <td>${d.nombre}</td>
                            <td>${d.estatus}</td>
                        <td><button type="button" class="btn btn-primary">ASIGNAR TRABAJO</button></td>
                        </tr>`);
        
                    });
                    tab.appendTo("modal-body");
                });

                $.ajax({
                    url: "../model/mostrar_tecnicos.php",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        if (!data.error) {
                            for (var i = 0; i < data.length; i++) {
                                $("#tec").html("<tr><td>" + data[i].id + "</td><td>" + data[i].nombre + "</td><td>" + data[i].estatus + "</td></tr>");
                            }
                        }
                    }
                });*/

           // }); 

           
           //mostrar notificaciones al usuario que ingreso a la pagina
           $("#notis").on("show.bs.modal", function(){
            $.ajax({
                url:"../model/mostrar_notis.php",
                type:"GET",
                success:function(response){
                    if(!response.error){
                        const noti = JSON.parse(response);
                        let tab ="";
                        noti.forEach(notis =>{
                            tab +=`<tr>
                            <td>${notis.id}</td>
                            <td>${notis.nombre}</td>
                            <td>${notis.telefono}</td>
                            <td>${notis.direc}</td>
                            <td>${notis.rdirec}</td>
                            <td>${notis.tipos}</td>
                            <td>${notis.problep}</td>
                            <td>
                            <button id="nt" data-id="${notis.id}" type="button" onclick="notisTerminadas()" class="btn btn-primary" >
                            TRABAJO TERMINADO</button>
                            </td>
                            </tr>`
                            //agregar un boton que indique que al servicio esta completo/terminado
                        });
                        $("#noti").html(tab);
                      
                    }
                }
            });          
        }); 

        function notisTerminadas(){ 
            $("#noti").on("click","#nt",function(){
            var btn = $(this).attr("data-id");
            $.ajax({
                url:"../model/notis_terminadas.php",
                type:"POST",
                data:{btn: btn},
                success: function(response){
                    console.log(response);
                },
                error: function(error){
                    console.error("Error en la solicitud AJAX", error);
                }
            });
        })
       }

           
        //mostrar notificaciones al usuario ingresado que esten ya terminadas
        $("#notis").on("show.bs.modal", function(){
            $.ajax({
                url:"../model/mostrar_notisT.php",
                type:"GET",
                success:function(response){
                    if(!response.error){
                        const noti = JSON.parse(response);
                        let tab ="";
                        noti.forEach(notis =>{
                            tab +=`<tr>
                            <td>${notis.id}</td>
                            <td>${notis.nombre}</td>
                            <td>${notis.telefono}</td>
                            <td>${notis.direc}</td>
                            <td>${notis.rdirec}</td>
                            <td>${notis.tipos}</td>
                            <td>${notis.problep}</td>
                            </tr>`
                        });
                        $("#not").html(tab);
                      
                    }
                }
            });          
        }); 




    });