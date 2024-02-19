<?php

include ('../core/conexion.php');

if(isset($_POST["botonId"])){
    $botonId = $_POST["botonId"];
    $servId = $_POST["servId"];
   

    $sql="INSERT INTO `notificaciones` (`id_user`,`id_servicio`)  VALUES ('$botonId','$servId')";
    $query = mysqli_query($conexion,$sql);


    echo "ID del boton recivido: $botonId";
}else{
    echo "ID del boton no recivido";

}
?>
