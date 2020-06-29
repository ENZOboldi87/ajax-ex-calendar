// Creare un calendario dinamico con le festività.
 // Partiamo dal gennaio 2018 dando la possibilità di cambiare mese,
  // gestendo il caso in cui l’API non possa ritornare festività.
   // Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).

// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all’api quali sono le festività per il mese scelto
// Evidenziare le festività nella lista


$(document).ready(function() {
// template per i giorni


// template per i mesi
var sourceMese = $("#mesi-template").html();
var templateMese = Handlebars.compile(sourceMese);
var contenuto = {
  mese: "Gennaio"
};
var htmlMesi = templateMese(contenuto);
$('.mese').append(htmlMesi);
// fine template mesi


// parte moment js
var dateJanuary = moment("2018-01", "YYYY-MM").daysInMonth() // 31
var mese = "Gennaio";
// fine parte moment js

// ciclo for per stampare i giorni del mese (in base al mese)
for (var i = 1; i < dateJanuary + 1; i++) {
  var singoliGiorni = i;
  var context = {
      giorni: singoliGiorni + ' ' + mese
      };
      var sourceGiorni = $("#giorni-template").html();
      var templateGiorni = Handlebars.compile(sourceGiorni);
      var htmlGiorni = templateGiorni(context);
      $('ul').append(htmlGiorni);
};

$.ajax({
  url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
  type: 'GET',
  success: function (data) {
    var data = data.response;
    console.log(data);
  },

  error:(function() {
    alert('errore');
  })

})




// funzione che stampa il mese nel container debug







  // fine funzione debug


});
