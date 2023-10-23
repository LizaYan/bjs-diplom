let exitButton = new LogoutButton(); 

function exitResultCallback(response) {
   if (response.success) {
      location.reload();
   }
 }

function exitButtonPressed() {
    ApiConnector.logout(exitResultCallback)
}

exitButton.action = exitButtonPressed;
