$(document).ready(function() {

 // variabili delle date da cui bisogna partire il calendario
 var anno = 2018;
 var mese = 0;
 var giorno = 1;

stampaMese(mese);
giorniDiVacanze(mese);


// $(document).on('click', '.successivo', function(){
// /
//
//
//
// })

// mesi(date);

// --------------FUNZIONI ---------------

// funzione che aggiunge uno zero se un numero e minore di 10
function AggiungiZero(number) {
  if (number < 10) {
    return '0' + number;
  } else {
    return number;
  }
}

// funzione che stampa i mesi
function stampaMese(meseDiRiferimento) {

  // data di riferimento
  var date = moment({
    'month': meseDiRiferimento,
    'year' : anno
  })

  // quanti giorni ci sono in un mese
  var giorniInUnMese = date.daysInMonth();

  // ciclo for per stampare i giorni del mese (in base al mese)
  for (var i = 1; i < giorniInUnMese + 1; i++) {
    var singoliGiorni = i;
    var formatoData = date.format('YYYY-MM' + '-' + AggiungiZero(i));
    var context = {
        data: formatoData,
        giorni: singoliGiorni
        };
    // template handlebars per i giorni
    var sourceGiorni = $("#giorni-template").html();
    var templateGiorni = Handlebars.compile(sourceGiorni);
    var htmlGiorni = templateGiorni(context);
    $('ul').append(htmlGiorni);
    // fine template handlebars per i giorni
  };
  // template handlebars per i mesi
  var contenuto = {
    mese: moment(date).format('MMMM')
  };
  var sourceMese = $("#mesi-template").html();
  var templateMese = Handlebars.compile(sourceMese);
  var htmlMesi = templateMese(contenuto);
  $('.mese').append(htmlMesi);
  // fine template mesi

};

// funzione per confrontare i dati con quelli ricevuti dall API
function giorniDiVacanze(meseDiRiferimento) {
  // chiamata ajax per confrontare i giorni con le festivita
  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
    type: 'GET',
    success: function (data) {

      // dati ricevuti dall API
      var data = data.response;
      // con un ciclo for stampo i dati ricevuti dall API
      for (var i = 0; i < data.length; i++) {
        // per ogni elemento della lista confronto i dati
        $('.calendario ul li').each(function() {
          var giorni = $(this).attr('data-element');
          console.log(giorni);
          var nomiFestivita = data[i].name;
          var dateFestivita = data[i].date;
          // console.log(nomiFestivita);
          // se il giorno equivale ai giorni festivi provenienti dall API
          // aggiungo classe e festivita
          if (giorni === dateFestivita) {
            $(this).addClass('rosso');
            $(this).append('<span>' + nomiFestivita + '</span>');
            console.log('sono nel if');
          }
        });

      }
    },

    error:(function() {
      alert('errore');
    })

  })


}


});
