var btnAbrirPopUp = document.getElementById("btn-info"),
    overlay = document.getElementById("overlay"),
    popup = document.getElementById("popup"),
    btnCerrarPopUp = document.getElementById("btn-cerrar-popup");
    
btnAbrirPopUp.addEventListener("click",function(){

        overlay.classList.add("active");
    
}); 

btnCerrarPopUp.addEventListener("click",function(){

    overlay.classList.remove("active");

}); 

var btnAbrirPopUpAyuda = document.getElementById("btn-ayuda"),
    overlay_ayuda = document.getElementById("overlay-ayuda"),
    popup_ayuda = document.getElementById("popup-ayuda"),
    btnCerrarPopUpAyuda = document.getElementById("btn-cerrar-popup-ayuda");

 btnAbrirPopUpAyuda.addEventListener("click",function(){

    overlay_ayuda.classList.add("active");



    }); 

btnCerrarPopUpAyuda.addEventListener("click",function(){

    overlay_ayuda.classList.remove("active");

});  