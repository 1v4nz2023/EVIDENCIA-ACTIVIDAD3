let score_game = 0;
let intentos = 3;
let tiempo = 15;
let bandera = false;
let card_op_1 = "";
let card_op_2 = "";
let cod_card1;
let cod_card2;

var invertalId = null;

let card_array = [
  { id: "card1", nombre: "maga oscura", url: "img/MG.png" },
  { id: "card2", nombre: "mago oscuro", url: "img/Mago oscuro.png" },
  { id: "card3", nombre: "mago del caos", url: "img/Mago del caos.png" },
  { id: "card4", nombre: "maga oscura", url: "img/MG.png" },
  { id: "card5", nombre: "mago oscuro", url: "img/Mago oscuro.png" },
  { id: "card6", nombre: "mago del caos", url: "img/Mago del caos.png" },
];

$(document).ready(function () {
  startGame();
});

function generarNuevoOrden() {
  for (let i = 0; i < card_array.length; i++) {
    card_array = card_array.sort(function () {
      // 1 y 0 - 0.5  -0.5 <  -0.4 0 0.1 .. 4 3 5 < 0.5
      return Math.random() - 0.5;
    });
  }
}

function generarCard() {
  generarNuevoOrden();

  for (let i = 0; i < card_array.length; i++) {
    let item = `<div class="col-xxl-4 col-sm-4 col-6 mb-3">
        <div class="card-game" id="${card_array[i].id}" name="${
      card_array[i].nombre
    }">
        <img src="img/back.png" class="cartas-img" id="${
          "img" + card_array[i].id
        }">
        </div>
        </div>`;

    $(".row-game").append(item);
  }
}

$("#row-game").on("click", ".card-game", function click() {
  let id_card = $(this).attr("id");

  for (let i = 0; i < card_array.length; i++) {
    if (id_card == card_array[i].id) {
      $(this).find("img").attr("src", card_array[i].url);
    }
  }

  if (!bandera) {
    card_op_1 = $(this).attr("name");
    cod_card1 = $(this).attr("id");
    $("#" + cod_card1).addClass("active");
    bandera = true;
  } else {
    card_op_2 = $(this).attr("name");
    cod_card2 = $(this).attr("id");
    $("#" + cod_card2).addClass("active");

    if (card_op_1 == card_op_2) {
      score_game++;
      $("#score_game").html(score_game);
    } else {
      setTimeout(() => {
        $("#" + "img" + cod_card1).attr("src", "img/back.png");
        $("#" + "img" + cod_card2).attr("src", "img/back.png");
      }, 500);

      $("#" + cod_card1).removeClass("active");
      $("#" + cod_card2).removeClass("active");
      intentos--;
      $("#intentos_game").html(intentos);
      gameOver();
    }
    bandera = false;
  }
  gameWin();
});

function gameWin() {
  if (score_game == 3) {
    detenerContador();
    Swal.fire({
      title: "Ganaste!",
      text:
        "Puntos: " +
        score_game +
        " y tu tiempo restante fue de " +
        parseInt(tiempo + 1) + " segundos",
      imageUrl: "img/win.png",
      imageWidth: 300,
      imageHeight: 300,
	  allowOutsideClick: false,
      confirmButtonText: "Jugar nuevamente",
      confirmButtonColor: "green",
      imageAlt: "Custom image",
    }).then((result) => {
      if (result.isConfirmed) {
        $(".card-game").removeClass("active");
        reinicio();
        window.location.reload();
      }
    });
  }
}

function gameOver() {
  if (intentos == 0) {
    detenerContador();
    Swal.fire({
      title: "Perdiste!",
      text: "Inténtalo otra vez, tú puedes!",
      imageUrl:
        "https://www.pngplay.com/wp-content/uploads/6/Game-Over-Yellow-Transparent-PNG.png",
      imageWidth: 300,
      imageHeight: 300,
	  allowOutsideClick: false,
      confirmButtonText: "Reintentar",
      confirmButtonColor: "#FF0000",
      imageAlt: "Custom image",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
}

function reinicio() {
  score_game = 0;
  intentos = 3;
  tiempo = 15;
  $("#score_game").html(score_game);
  $("#intentos_game").html(intentos);
  $("#tiempo_game").html(tiempo);
  countDown();
}

function countDown() {
  document.getElementById("tiempo_game").innerHTML = tiempo;
  if (tiempo == 0) {
    Swal.fire({
      title: "Perdiste!",
      text: "Tiempo agotado, Sé más rápido!",
      imageUrl:
        "https://www.pngplay.com/wp-content/uploads/6/Game-Over-Yellow-Transparent-PNG.png",
      imageWidth: 300,
      imageHeight: 300,
	  allowOutsideClick: false,
      confirmButtonText: "Reintentar",
      confirmButtonColor: "#FF0000",
      imageAlt: "Custom image",
    }).then((result) => {
      if (result.isConfirmed) {
       window.location.reload();
      }
    });
  } else {
    tiempo -= 1;

    clearTimeout(invertalId);
    invertalId = setTimeout(countDown, 1000);
  }
}

function detenerContador() {
  clearTimeout(invertalId);
}

function startGame() {
  Swal.fire({
    title: "MemoryYugi",
    text: "Presiona Iniciar para jugar",
    imageUrl:
      "https://www.konami.com/kde_cms/eu_publish/uploads/ygo-logo-with-copyright-600x279.png",
    imageWidth: 300,
    imageHeight: 300,
    allowOutsideClick: false,
    confirmButtonText: "Iniciar",
    confirmButtonColor: "#FF0000",
    imageAlt: "Custom image",
  }).then((result) => {
    if (result.isConfirmed) {
      reinicio();
      generarCard();
      appearCards();
      setTimeout(desappearCards, 2000);
    }
  });
}

function appearCards() {
  for (let i = 0; i < card_array.length; i++) {
    $("#" + card_array[i].id)
      .find("img")
      .attr("src", card_array[i].url);
  }
  $(".card-game").addClass("active");
}

function desappearCards() {
  for (let i = 0; i < card_array.length; i++) {
    $("#" + card_array[i].id)
      .find("img")
      .attr("src", "img/back.png");
  }
  $(".card-game").removeClass("active");
}
