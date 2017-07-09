//Animacion titulo
function titulo1(elemento){
  $(elemento).animate(
    {
      color: "yellow"
    }, 500, "linear",function(){
      titulo2(elemento)
    }
  )
};
function titulo2(elemento){
  $(elemento).animate(
    {
      color: "lime" 
    }, 500, 'linear', function(){
      titulo1(elemento)
    }
  )
};
//Llenar o vaciar tablero
function fill() {
    var dulces = $("img");
    for (var i = 0; i < dulces.length; i++) {
        var nA = Math.floor((Math.random() * 4) + 1);
        var imgAleatoria = "image/"+nA+".png";
        $(dulces[i]).attr("src", imgAleatoria);   
    }
}
function unfill() {
    var dulces = $("img");
    for (var i = 0; i < dulces.length; i++) {
        $(dulces[i]).attr("src", "");   
    }
}
//Timer
function timer() {
    if (segs > 0) {
        if (segs < 10) {
            hora = "0"+mins+":0"+segs;        
        }else{
            hora = "0"+mins+":"+segs;
        }
        $("#timer").text(hora);
        segs--; 
        setTimeout(function(){
            timer(); 
        }, 1000);
    }else if (segs == 0 && mins == 1){
        hora = "0"+mins+":0"+segs;
        $("#timer").text(hora);
        mins--; 
        segs = 59;
        setTimeout(function(){
            timer(); 
        }, 1000);
    }else if(segs == 0 && mins == 0){
        hora = "0"+mins+":0"+segs;
        $("#timer").text(hora);
        unfill();
        setTimeout(function(){
            gameOver();            
        }, 1500);
    }
}
function gameOver() {
    $(".panel-tablero").hide();
    $("#time").hide();
    $(".panel-score").animate({
        width: "100%"
    }, 3000, function() {
        $("#gameOver").text("GAME OVER!");
  });
};
function reset() {
    $(".panel-tablero").show();
    $("#time").show();
    $(".panel-score").css("width", "25%")
    $("#gameOver").empty();
};
/////////////////////////////////////////////
//////////////////////////////////
//Varificar match
var newDiv = ""; 
var columnasPadre = [];
var erasables = []; 
var col1 = 0, col2 = 0, col3 = 0, col4 = 0, col5 = 0, col6 = 0, col7 = 0; 

function checkMatches() {
    erasables = []; 
    columnasPadre = [];
    col1 = 0, col2 = 0, col3 = 0, col4 = 0, col5 = 0, col6 = 0, col7 = 0; 
    var drops = $(".dropCol img");
    for (var i = 0; i < drops.length; i++) {
        var first = drops[i];
        var next1 = drops[i+1];
        var next2 = drops[i+2];
        var next1C = drops[i+7];
        var next2C = drops[i+14];
       //Cuando marca tres en columna
        if ( ($(first).attr("src") == $(next1).attr("src") && $(first).attr("src") == $(next2).attr("src")) && 
        !(i == 6 || i == 13 || i == 20 || i == 27 || i == 34 || i == 41 || i == 48) &&
        !(i == 5 || i == 12 || i == 19 || i == 26 || i == 33 || i == 40 || i == 47) ) {
            //Write erasables
            if( !($(first).hasClass("done")) ) {
                erasables[erasables.length] = $(first).parent();  
            }
            if( !($(next1).hasClass("done")) ) {
                erasables[erasables.length] = $(next1).parent();
            }
            if( !($(next2).hasClass("done")) ) {
                erasables[erasables.length] = $(next2).parent();
            }
            //Write checked classes
            $(first).addClass("done");
            $(next1).addClass("done");
            $(next2).addClass("done");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if( $(first).attr("src") == $(next1C).attr("src") && $(first).attr("src") == $(next2C).attr("src") ){
            //Write erasables
            if( !($(first).hasClass("done")) ) {
                erasables[erasables.length] = $(first).parent();  
            }
            if( !($(next1C).hasClass("done")) ) {
                erasables[erasables.length] = $(next1C).parent();
            }
            if( !($(next2C).hasClass("done")) ) {
                erasables[erasables.length] = $(next2C).parent();
            }
            //Write checked classes
            $(first).addClass("done");
            $(next1C).addClass("done");
            $(next2C).addClass("done");
            }
       //Cuando marca tres en fila
        }else if( $(first).attr("src") == $(next1C).attr("src") && $(first).attr("src") == $(next2C).attr("src") ){
            //Write erasables
            if( !($(first).hasClass("done")) ) {
                erasables[erasables.length] = $(first).parent();  
            }
            if( !($(next1C).hasClass("done")) ) {
                erasables[erasables.length] = $(next1C).parent();
            }
            if( !($(next2C).hasClass("done")) ) {
                erasables[erasables.length] = $(next2C).parent();
            }
            //Write checked classes
            $(first).addClass("done");
            $(next1C).addClass("done");
            $(next2C).addClass("done");
        }
    }
    //Marcar eresables
    for (var j = 0; j < erasables.length; j++) {
        var add = ""; 
        columnasPadre[j] = erasables[j].parent();
        erasables[j].addClass("erase");
    }
return columnasPadre
};

function removeMatches () {
    $(".erase").effect("pulsate", "linear", 1000, function () {
        $(".erase").remove();
        score += (erasables.length*25);
        $("#score-text").text(score);

    });        
    $(".done").removeClass("done");
    //Obtener padres de erasables    
};
var selectorCol = "";
function fillErased () {
    //Verificar cuantos se eliminaron por columna
    for (var k = 0; k < columnasPadre.length; k++) {
      numRandom = Math.floor((Math.random() * 4) + 1);
      newDiv = "<div class='dropCol ui-droppable'><img src='image/"+numRandom
      +".png' class='elemento ui-draggable ui-draggable-handle' style='position: relative; left: auto; top: auto; height: 100%;'></div>";
        if (columnasPadre[k].hasClass("col-1")) {
            col1++
            $(".col-1").prepend(newDiv);
        } else if( columnasPadre[k].hasClass("col-2")){
            col2++
            $(".col-2").prepend(newDiv);
        } else if( columnasPadre[k].hasClass("col-3")){
            col3++
            $(".col-3").prepend(newDiv);
        } else if( columnasPadre[k].hasClass("col-4")){
            col4++
            $(".col-4").prepend(newDiv);
        } else if( columnasPadre[k].hasClass("col-5")){
            col5++
            $(".col-5").prepend(newDiv);
        } else if( columnasPadre[k].hasClass("col-6")){
            col6++
            $(".col-6").prepend(newDiv);
        } else if( columnasPadre[k].hasClass("col-7")){
            col7++
            $(".col-7").prepend(newDiv);
        }
    }
    // Añadir en cada columna la cantidad eliminada con un numero aleatorio
    console.log("col1: "+col1+" col2: "+col2+" col3: "+col3+" col4: "+col4+
    " col5: "+col5+" col6: "+col6+" col7: "+col7)
    all();
};

//Cambiar posiciones Drag&Drop
function dragndrop() {
    //Asignar clases a los divs por columnas
    //Asignar clases a los elementos por columnas
    $( "img" ).draggable();
    $( ".dropCol" ).droppable({
    accept: ".elemento",
    tolerance: "pointer",
    drop: function( event, ui ) {
        var prevDad = $(ui.draggable).parent()
        $(ui.draggable)
        .css({
            height: "100%",
            position: "relative",
            left: "auto",
            top: "auto"
        }).appendTo($(this))
        //This is current dad
        //prevDad is previousDad
        var removed = $(this).find("img:first-child").detach();
        removed.appendTo(prevDad).animate("bounce");
        contador++
        $("#movimientos-text").text(contador);
        all();
    }
    });        
}

function all(){
    if(segs == 0 && mins == 0){
    }else{
        checkMatches();
        if (erasables.length != 0) {
            setTimeout(function(){
                removeMatches(); 
            }, 500);
            setTimeout(function(){
                fillErased(); 
            }, 2000);
            setTimeout(function(){
                dragndrop(); 
            }, 2100);
        }
    }
};

//Variables
var contador = 0, clickInicio = 0, segs = 59, mins=1, score=0;
//Onload JQuery
$(function (){
    alert("En consola se muestra el historial de juego.")
    //Color titulo
    titulo1($("h1"));

    $("#inicio").on("click", function (){
        if (clickInicio == 0) {
            console.log("////////////////// HISTORIAL DE JUEGO //////////////////")
            contador = 0;
            $("#movimientos-text").text(contador);
            $("#score-text").text(contador);
            fill();
            reset();
            mins=1;
            segs = 59;
            score = 0;
            timer();
            $(this).text("Reiniciar");
            clickInicio++
            all();            
        }else{
            contador = 0;
            $("#movimientos-text").text(contador);
            $("#score-text").text(contador);
            $("#timer").text("02:00");
            unfill();
            reset();
            segs = "k";
            $(this).text("Iniciar");
            clickInicio = 0;
        }
    })
});
