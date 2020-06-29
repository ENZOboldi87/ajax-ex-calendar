
$(document).ready(function() {

  // data di riferimento
  var date = moment({
    'year': '2018',
    'month': '0'
  })

// template handlebars per i mesi
var sourceMese = $("#mesi-template").html();
var templateMese = Handlebars.compile(sourceMese);
var contenuto = {
  mese: "Gennaio"
};
var htmlMesi = templateMese(contenuto);
$('.mese').append(htmlMesi);
// fine template mesi



var giorniInUnMese = date.daysInMonth();

// fine parte moment js

// ciclo for per stampare i giorni del mese (in base al mese)
for (var i = 1; i < giorniInUnMese + 1; i++) {
  var singoliGiorni = i;
  var mese = "Gennaio";
  var formatoData = date.format('YYYY-MM' + '-' + AggiungiZero(i));
  var context = {
      data: formatoData,
      giorni: singoliGiorni + ' ' + mese
      };
      // template handlebars per i giorni
      var sourceGiorni = $("#giorni-template").html();
      var templateGiorni = Handlebars.compile(sourceGiorni);
      var htmlGiorni = templateGiorni(context);
      $('ul').append(htmlGiorni);
      // fine template handlebars per i giorni
};

// chiamata ajax per confrontare i giorni con le festivita
$.ajax({
  url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
  type: 'GET',
  success: function (data) {
    var data = data.response;
    // con un ciclo for stampo i dati ricevuti dall API
    for (var i = 0; i < data.length; i++) {
      // per ogni elemento della lista confronto i dati
      $('.calendario ul li').each(function() {
        var giorni = $(this).attr('data-element');
        // console.log(giorni);
        var nomiFestivita = data[i].name;
        var dateFestivita = data[i].date;
        // se il giorno equivale ai giorni festivi provenienti dall API
        // aggiungo classe e festivita
        if (giorni == dateFestivita) {
          $(this).addClass('rosso');
          $(this).append(' <span>' + nomiFestivita + '</span>');
        }
      });


    }
  },

  error:(function() {
    alert('errore');
  })

})

// funzione che aggiunge uno zero se un numero e minore di 10
function AggiungiZero(number) {
  if (number < 10) {
    return '0' + number;
  } else {
    return number;
  }
}

});
