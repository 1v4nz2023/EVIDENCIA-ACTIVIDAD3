let fecha = new Date();

let mes=fecha.getMonth()+1;
let dia= fecha.getDate();

let output = (dia<10 ? '0' : '') + dia + '/' +
    (mes<10 ? '0' : '') + mes + '/' +
    fecha.getFullYear();
let fecha_actual = document.getElementById("fecha-actual");
fecha_actual.innerHTML = output

let clock = document.getElementById("hora-actual");


setInterval(time,1000);

function time(){
let date = new Date();
let h = date.getHours();
let m = date.getMinutes();
let s = date.getSeconds();
let session ="AM";
if(h==0){
    h = 12;
}

if (h>12){
    h = h -12;
    session="PM";
}

h = (h<10) ? "0" + h:h;
m = (m<10) ? "0" + m:m;
s = (s<10) ? "0" + s:s;

let digitaltime = h + ":" + m + ":" + s + "  " + session;
clock.innerHTML = digitaltime;

}


