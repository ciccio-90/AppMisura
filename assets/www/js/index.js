var pictureSource;   
var destinationType; 
var altezzaPattern;
var larghezzaPattern;
var y;
var x;
var patternY;
var patternX;
var oggettoY;
var oggettoX;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	navigator.splashscreen.show();
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {
	$('#sceltaFoto').hide();
	$('#misurazioni').show();
	$('#image').attr('src', "data:image/jpeg;base64," + imageData);
	$('#btnOggettoSelezionato').hide();
}

function onPhotoURISuccess(imageURI) {
	$('#sceltaFoto').hide();
	$('#misurazioni').show();
	$('#image').attr('src', imageURI);
	$('#btnOggettoSelezionato').hide();
}

function onFail(message) {
	alert(message);
}

$(document).ready(function() {
	$('#btnFotocamera').click(function() {
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 45, destinationType: destinationType.DATA_URL });
		alert("Seleziona nella foto l'oggetto con il quale hai scelto di effettuare le misurazioni e premi il pulsante 'Pattern selezionato'");
	});
});

$(document).ready(function() {
	$('#btnGalleria').click(function() {
		navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 45, destinationType: destinationType.FILE_URI, sourceType: pictureSource.PHOTOLIBRARY });
		alert("Seleziona nella foto l'oggetto con il quale hai scelto di effettuare le misurazioni e premi il pulsante 'Pattern selezionato'");
	});
});

$(document).ready(function() {
	$('#btnFatto').click(function() {
		var patternValue = $('input[name="pattern"]:checked').val();
		if (patternValue == 'patente') {
	 		altezzaPattern = 0.053;
	  		larghezzaPattern = 0.085;
	  		alert('Hai scelto la patente o la tessera sanitaria');
		}
		else if (patternValue == 'pacchetto') {
	  		altezzaPattern = 0.088;
	  		larghezzaPattern = 0.055;
	  		alert('Hai scelto il pacchetto di sigarette da venti');
		}
		else if (patternValue == 'cdRom') {
	  		altezzaPattern = 0.125;
	  		larghezzaPattern = 0.125;
	  		alert('Hai scelto il CD-ROM');
		}
		else if (patternValue == 'foglioA4') {
	  		altezzaPattern = 0.297;
	  		larghezzaPattern = 0.210;
	  		alert('Hai scelto il foglio A4');
		}
		$('#sceltaPattern').hide();
		$('#sceltaFoto').show();
		alert('Scegli se fare una nuova foto o selezionarne una dalla galleria');
	});
});

$(document).ready(function() {	      
	$('#image').imgAreaSelect({
		handles: true,
		onSelectEnd: function(img, selection) {
			if (!selection.width || !selection.height) {
				return;
			}
		  	y = selection.height;
		  	x = selection.width;
		}
	});
});

$(document).ready(function() {
	$('#btnPatternSelezionato').click(function() {
		patternY = y;
		patternX = x;
		$('#image').imgAreaSelect({ hide: true });
		$('#btnPatternSelezionato').hide();
		$('#btnOggettoSelezionato').show();
		alert("Seleziona nella foto l'oggetto da misurare e premi il pulsante 'Oggetto selezionato'");	
	});
});

$(document).ready(function() {
	$('#btnOggettoSelezionato').click(function() {
		oggettoY = y;
		oggettoX = x;
		$('#image').imgAreaSelect({ hide: true });
		$('#btnOggettoSelezionato').hide();
		$('#btnPatternSelezionato').show();
		$('#misurazioni').hide();
		$('#risultati').show();
		$('#h').text('Altezza = ' + ((oggettoY / patternY) * altezzaPattern).toFixed(2) + ' m');
		$('#w').text('Larghezza = ' + ((oggettoX / patternX) * larghezzaPattern).toFixed(2) + ' m');
	});
});

function login() {
	var mail = document.forms["loginForm"]["mail"].value;
	var pwd = document.forms["loginForm"]["pwd"].value;
    if (mail == null || mail == "" || pwd == null || pwd == "") {
        alert("Compilare i campi contrassegnati da *");
    }
    else {
    	$('#login').hide();
    	$('#home').show();
    }
}

$(document).ready(function() {
	$('#btnRegistrazione').click(function() {
		$('#login').hide();
		$('#registrazione').show();
	});
});

function registrazione() {
	var nome = document.forms["registrazioneForm"]["nome"].value;
	var cognome = document.forms["registrazioneForm"]["cognome"].value;
	var email = document.forms["registrazioneForm"]["email"].value;
	var indirizzo = document.forms["registrazioneForm"]["indirizzo"].value;
	var cap = document.forms["registrazioneForm"]["cap"].value;
	var citta = document.forms["registrazioneForm"]["citta"].value;
	var provincia = document.forms["registrazioneForm"]["provincia"].value;
	var password = document.forms["registrazioneForm"]["password"].value;
	if (nome == null || nome == "" || cognome == null || cognome == "" || email == null || email == "" ||
		indirizzo == null || indirizzo == "" || cap == null || cap == "" || citta == null || citta == "" ||
		provincia == null || provincia == "" || password == null || password == "") {
		alert("Compilare i campi contrassegnati da *");
	}
	else {
		$('#registrazione').hide();
		$('#login').show();
	}
}

$(document).ready(function() {
	$('#boxnews').feedreader({
		targeturl: 'http://www.mrwebmaster.it/rss/news.xml'
	});
});

$(document).ready(function() {
	$('#btnNuovoPreventivo').click(function() {
		$('#home').hide();
		$('#sceltaPattern').show();
	});
});

$(document).ready(function() {
	$('#btnNuovaMisura').click(function() {
		$('#risultati').hide();
		$('#sceltaFoto').show();
	});
});

$(document).ready(function() {
	$('#btnChiudiPreventivo').click(function() {
		$('#risultati').hide();
		$('#home').show();
	});
});