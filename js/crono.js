let ms=0;
let s=0;
let m=0;

var invertalId = null;
let cuenta=true;

let empezar = document.getElementById("start");
let reset =document.getElementById("reset");

empezar.addEventListener("click",function contar(){
    console.log(cuenta);

    if (cuenta){
        iniciarContador();
        empezar.innerHTML="Detener";
        cuenta=false;
    }

    else{
        detenerContador();
        empezar.innerHTML="Empezar";
        cuenta=true;
    }

});


reset.addEventListener("click", resetear);


function actualizar() {
    ms++;
    if (ms==100){
        ms=0;
        s++;
    }

    if (s==60){
        s=0;
        m++;
    }

    $("#ms").html(":" + ms.toString());
    $("#s").html(":"+ s.toString());
    $("#m").html(m.toString());

}

function iniciarContador() {
 clearInterval(invertalId);
 invertalId = setInterval(actualizar, 10); // Cada segundo

}

function detenerContador() {
    clearInterval(invertalId);
}

function resetear() {
ms=0;
s=0;
m=0;
$("#ms").html(":" + ms.toString());
$("#s").html(":"+ s.toString());
$("#m").html(m.toString());
}