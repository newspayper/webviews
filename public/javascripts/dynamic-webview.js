// This function is called when the extensions are loaded and ready
console.log("En attente de MessengerExtensions");

window.extAsyncInit = function() {
    console.log('MessengerExtensions are ready');

    // Handle button click
    $('#preferencesForm').submit(function(event) {
        console.log('Pressed submit button');
        //empêche le comportement par défaut, i.e. fermeture de la fenêtre immédiate lors du submit
        event.preventDefault(); 

        // Get the form data to send to our endpoint
        const formData = $('#preferencesForm').serialize();

        // Post to our server endpoint to broadcast back to the user
        $.post('/dynamic-webview', formData, (data) => {
            MessengerExtensions.requestCloseBrowser(function success() {
                // webview closed
                console.log('Closed the window!');
            }, function error(error) {
                // an error occurred
                console.log('Error closing browser window!');
                console.log(error);
                $('#infoMessage').text(`requestCloseBrowser error : ${error}`);
            });
        });
    });
};


$.post('./dynamic-webview', formData, (data) => {
                  MessengerExtensions.requestCloseBrowser(function success() {
                      // webview closed
                      console.log('Closed the window!');
                  }, function error(error) {
                      // an error occurred
                      console.log('Error closing browser window!');
                      console.log(error);
                      $('#infoMessage').text(`requestCloseBrowser error : ${error}`);
                  })
              })
                  .done(function(msg){console.log("Réussite du POST : " + msg)})
                  .fail(function(xhr, status, error) {
                      console.log("POST error : " + error);
                      console.log("status : " + status);
                      console.log("xhr : " + xhr);
                  }
                  );

$.post('some.php', {name: 'John'})
    .done(function(msg){  })
    .fail(function(xhr, status, error) {
        // error handling
    });              