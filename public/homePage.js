let exitButton = new LogoutButton(); 
let currencyBoard = new RatesBoard();
let money = new MoneyManager();
let favorites = new FavoritesWidget();

function exitResultCallback(response) {
   if (response.success) {
      location.reload();
   }
 }

function exitButtonPressed() {
   ApiConnector.logout(exitResultCallback)
}

exitButton.action = exitButtonPressed;

function currentUserCallback(response) {
   if (response.success) {
      ProfileWidget.showProfile(response.data);
   }
}

function getCurrentUser() {
   ApiConnector.current(currentUserCallback);
}

getCurrentUser();

function currencyRatesCallback(response) {
   if (response.success) {
      currencyBoard.clearTable();
      currencyBoard.fillTable(response.data)
   }
}

function getCurrencyRates() {
   ApiConnector.getStocks(currencyRatesCallback);
}

getCurrencyRates();
setInterval (getCurrencyRates, 60000);

function additionResultCallback(response) {
   if (response.success) {
      ProfileWidget.showProfile(response.data); 
      money.setMessage(response.success, "Баланс успешно пополнен");
   } else {
      money.setMessage(response.success, response.error);
   }
}

function addMoneyAttempt(data) {
   ApiConnector.addMoney(data, additionResultCallback)
}

money.addMoneyCallback = addMoneyAttempt;

function conversionResultCallback(response) {
   if (response.success) {
      ProfileWidget.showProfile(response.data); 
      money.setMessage(response.success, "Конвертация прошла успешно");
   } else {
      money.setMessage(response.success, response.error);
   }
}

function conversionMoneyAttempt(data) {
   ApiConnector.convertMoney(data, conversionResultCallback);
}

money.conversionMoneyCallback = conversionMoneyAttempt;

function transferResultCallback(response) {
   if (response.success) {
      ProfileWidget.showProfile(response.data); 
      money.setMessage(response.success, "Перевод средств прошел успешно");
   } else {
      money.setMessage(response.success, response.error);
   }
}

function sendMoneyAttempt(data) {
   ApiConnector.transferMoney(data, transferResultCallback);
}

money.sendMoneyCallback = sendMoneyAttempt;

function getFavoritesCallback(response) {
   if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      money.updateUsersList(response.data);
   } 
}

function getFavoritesList() {
   ApiConnector.getFavorites(getFavoritesCallback);
}

getFavoritesList();

function addUserResultCallback(response) {
   if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      money.updateUsersList(response.data);
      favorites.setMessage(response.success, "Пользователь добавлен в список избранных");
   }  else {
      favorites.setMessage(response.success, response.error);
   }
}

function addUserAttempt(data) {
   ApiConnector.addUserToFavorites(data, addUserResultCallback);
}

favorites.addUserCallback = addUserAttempt;

function removeUserResultCallback(response) {
   if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      money.updateUsersList(response.data);
      favorites.setMessage(response.success, "Пользователь удалён из списка избранных");
   }  else {
      favorites.setMessage(response.success, response.error);
   }
}

function removeUserAttempt(data) {
   ApiConnector.removeUserFromFavorites(data, removeUserResultCallback);
}

favorites.removeUserCallback = removeUserAttempt;
