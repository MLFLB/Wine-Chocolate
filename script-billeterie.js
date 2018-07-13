$(document).ready(() => {

    $("#book-button").click(() => {
        $("#form-alert").empty();

        let missingNames = '<div class="alert alert-danger" role="alert"> \
                            Veuillez entrer votre nom et votre prénom.<br>Les chiffres\
                            ne sont pas autorisés.</div>';

        let missingEmail = '<div class="alert alert-danger" role="alert"> \
                            Veuillez entrer votre adresse mail.</div>';

        let invalidEmail = '<div class="alert alert-danger" role="alert"> \
                            Veuillez entrer une adresse email valide.</div>';

        let invalidQtt = '<div class="alert alert-danger" role="alert"> \
                            La quantité de pass doit être comprise entre 0 et 50.\
                            Pour des réservations de plus de 50 personnes, veuillez \
                            nous contacter par téléphone.</div>';
        
        let invalidChar = '<div class="alert alert-danger" role="alert"> \
                            Caractère(s) invalide(s) : la quantité de pass doit être comprise entre 0 et 50.\</div>';

        // Retrieve values from inputs
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let email = $("#email").val();
        let handicap = $("#handicap").is(':checked') ? "oui" : "non";

        let pass = [
            { name: "Pass 1 (tarif plein)", number: $("#pass-1-TP").val() },
            { name: "Pass 1 (tarif réduit)", number: $("#pass-1-TR").val() },
            { name: "Pass 2 (tarif plein)", number: $("#pass-2-TP").val() },
            { name: "Pass 2 (tarif réduit)", number: $("#pass-2-TR").val() },
            { name: "Pass 3 (tarif plein)", number: $("#pass-3-TP").val() },
            { name: "Pass 3 (tarif réduit)", number: $("#pass-3-TR").val() },
        ];

        let filteredPass = pass.filter(p => p.number > 0)

        let total = $("#pass-1-TP").val() * 20 + $("#pass-1-TR").val() * 15 + $("#pass-2-TP").val() * 39
            + $("#pass-2-TR").val() * 29 + $("#pass-3-TP").val() * 55 + $("#pass-3-TR").val() * 40

        // Returns an array, empty is everything is ok, > 0 if there are some NaN values
        let notANumber = pass.map(p => Number.isNaN(parseInt(p.number)) ? true : false).filter((bool) => bool === true ? true : false);

        // If fields are empty, prevent modal
        if (!firstName || !lastName || /\d/.test(firstName) || /\d/.test(lastName)) {
            $("#recap").modal('hide');
            $("#form-alert").html(missingNames);
        }
        else if (!email) {
            $("#recap").modal('hide');
            $("#form-alert").html(missingEmail);
        }

        else if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.\[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            $("#recap").modal('hide');
            $("#form-alert").html(invalidEmail);
        }

        else if(notANumber.length > 0){
            $("#recap").modal('hide');
            $("#form-alert").html(invalidChar);
        }

        else if (($("#pass-1-TP").val() <= 0 || $("#pass-1-TP").val() > 50) &&
                 ($("#pass-1-TR").val() <= 0 || $("#pass-1-TR").val() > 50) && 
                 ($("#pass-2-TP").val() <= 0 || $("#pass-2-TP").val() > 50) &&
                 ($("#pass-2-TR").val() <= 0 || $("#pass-2-TR").val() > 50) &&
                 ($("#pass-3-TP").val() <= 0 || $("#pass-3-TP").val() > 50) &&
                 ($("#pass-3-TR").val() <= 0 || $("#pass-3-TR").val() > 50)){
            $("#recap").modal('hide');
            $("#form-alert").html(invalidQtt);
        }

        // If success, render modal
        else {
            $("#recap").modal('show');
            // Change spans in modal
            $("#recap-firstName").text(firstName);
            $("#recap-lastName").text(lastName);
            $("#recap-email").text(email);
            $("#recap-pass").html(filteredPass.map(pass => pass.name + " : " + pass.number + "<br>"));
            $("#recap-total").text(total);
            $("#recap-handicap").text(handicap);
        }
    })
});