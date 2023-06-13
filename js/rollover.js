// let back = document.getElementById("back");
// console.log(back.getAttribute("src"));

// back.addEventListener("mouseover", function(){
//     back.setAttribute("src","img/MG.png");
// });

// back.addEventListener("mouseout", function(){
//     back.setAttribute("src","img/back.png");
// });

const card_text=document.getElementById("text-card");

$(document).ready(function () {
    $("#back").hover(function () {
            // over
            $("#back").attr("src","img/MG.png");
            card_text.innerHTML="¡ Es la Maga Oscura !";
            
        }, function () {
            // out
            $("#back").attr("src","img/back.png");
            card_text.innerHTML="Pase su mouse por la carta para ver que monstruo hay detrás";
        }
    );
});