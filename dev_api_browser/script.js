var app = angular.module('OnePageCRM-API-interaction', ['ngPrettyJson', 'localStorage']);

app.config([
  '$interpolateProvider', function($interpolateProvider) {
    return $interpolateProvider.startSymbol('{(').endSymbol(')}');
  }
]);

app.run(function($rootScope, $store) {
  $rootScope.apiKey = $store.get('auth_key');
  $rootScope.user_id = $store.get('user_id');
  $rootScope.responseData = '';
  $rootScope.firstname = $store.get('first_name');
  $rootScope.lastname = $store.get('last_name');
  $rootScope.headers = {};
  $rootScope.baseURL = "http://dev.onepagecrm.com/api/v3/"
})
app.controller("AuthController", function($scope, $rootScope, $http, $store) {
        $http.defaults.useXDomain = true;
        $scope.username = "";
        $scope.password = "";
        $scope.user = {'firstname': $rootScope.firstname,
                       'lastname': $rootScope.lastname,
                       'apiKey': $rootScope.apiKey};
        // Try to get user from local storage
        $scope.userData = {};
        $scope.userData.login = function(item, event) {

        var responsePromise = $http({
          method: 'post',
          url: $rootScope.baseURL + 'login.json',
          data: {
            login: $scope.username,
            password: $scope.password
          }
        }).success(function(response) {
                  // Store login details
                  $rootScope.user_id = response.data.user_id;
                  $rootScope.apiKey = response.data.auth_key;
                  $rootScope.firstname = response.data.user.user.first_name;
                  $rootScope.lastname = response.data.user.user.last_name;
                  $scope.user.apiKey = $rootScope.apiKey;
                  $scope.user.firstname = $rootScope.firstname;
                  $scope.user.lastname = $rootScope.lastname;
                  $store.set('first_name', $rootScope.firstname);
                  $store.set('last_name', $rootScope.lastname);
                  $store.set('auth_key', $rootScope.apiKey);
                  $store.set('user_id', $rootScope.user_id);
                  $rootScope.responseData = response;
                  console.log($rootScope.responseData);
          }).error(function(response) {
                // Show errors
                $rootScope.responseData = response;
                console.log($rootScope.responseData);
          });
        }

        $scope.userData.logout = function() {
          //Delete local storage info
          $rootScope.user_id = null;
          $rootScope.apiKey = null;
          $rootScope.firstname = null;
          $rootScope.lastname = null;
          $scope.user.apiKey = null;
          $scope.user.firstname = $rootScope.firstname;
          $scope.user.lastname = $rootScope.lastname;
          $store.remove('first_name');
          $store.remove('last_name');
          $store.remove('auth_key');
          $store.remove('user_id');
        }

    });
app.controller("APIRequestController", function($scope, $rootScope, $http) {
        $scope.responseData = {data: $rootScope.responseData};
        $scope.baseURL = $rootScope.baseURL; //"http://app.onepagecrm.com/api/v3/"
        $scope.$watch(function() { return $rootScope.responseData; },
                      function() {
                        $scope.responseData.data = $rootScope.responseData;
        });
        $scope.responseData.getData = function(item, event) {

            var responsePromise = $http({
              method: "get",
              url: $scope.baseURL + $scope.requestPath
            }).success(function(response) {
                // Store response data, headers, status etc..s
                $scope.responseData.data = response;
            }).error(function(response) {
                // Show Error, Mention suppress?
                $scope.responseData.data = response;

            });
        }


    });
app.factory('apirequestInterceptor', function ($q, $rootScope) {
  return {
      request: function (config) {
          if ($rootScope.apiKey) {
              var sendTime = parseInt(Date.now()/1000)
              var signature  = onepagecrmSignature($rootScope.user_id,
                                                   $rootScope.apiKey,
                                                   sendTime,
                                                   config.method,
                                                   config.url,
                                                   '')
              config.headers['X-OnePageCRM-UID'] = $rootScope.user_id;
              config.headers['X-OnePageCRM-TS'] =  sendTime;
              config.headers['X-OnePageCRM-Auth'] = signature;
              config.headers['X-OnePageCRM-Source'] = 'dev_api_browser';
              config.headers['Content-Type'] = 'application/json';
              config.headers['accept'] = 'application/json';
          }
          return config || $q.when(config);
      },
      response: function (response) {
        // do something on success
        $rootScope.data = response
        return response;
    },
    responseError: function (response) {
        // do something on error
        return $q.reject(response);
    }
  };
});
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('apirequestInterceptor');
});


onepagecrmSignature = function (UID, APIKey, timestamp, requestMethod, requestURL, requestBody) {
    var decodedAPIKey, requestURLHash, requestBodyHash, signatureMessage;
    decodedAPIKey = Crypto.util.base64ToBytes(APIKey);
    requestURLHash = Crypto.SHA1(requestURL);
    signatureMessage = UID + "." + timestamp + "." + requestMethod + "." + requestURLHash;

    if (requestBody){
        requestBodyHash = Crypto.SHA1(requestBody);
        signatureMessage += "." + requestBodyHash;
    }
    return Crypto.HMAC(Crypto.SHA256, signatureMessage, Crypto.util.base64ToBytes(APIKey) );
}

var ls = angular.module('localStorage',[]);

ls.factory("$store",function($parse){
  var storage = (typeof window.localStorage === 'undefined') ? undefined : window.localStorage,
    supported = !(typeof storage == 'undefined' || typeof window.JSON == 'undefined');

  var privateMethods = {
    parseValue: function(res) {
      var val;
      try {
        val = JSON.parse(res);
        if (typeof val == 'undefined'){
          val = res;
        }
        if (val == 'true'){
          val = true;
        }
        if (val == 'false'){
          val = false;
        }
        if (parseFloat(val) == val && !angular.isObject(val) ){
          val = parseFloat(val);
        }
      } catch(e){
        val = res;
      }
      return val;
    }
  };
  var publicMethods = {
    set: function(key,value){
      if (!supported){
        try {
          $.cookie(key, value);
          return value;
        } catch(e){
          console.log('Local Storage not supported, make sure you have the $.cookie supported.');
        }
      }
      var saver = JSON.stringify(value);
       storage.setItem(key, saver);
      return privateMethods.parseValue(saver);
    },
    get: function(key){
      if (!supported){
        try {
          return privateMethods.parseValue($.cookie(key));
        } catch(e){
          return null;
        }
      }
      var item = storage.getItem(key);
      return privateMethods.parseValue(item);
    },
    remove: function(key) {
      if (!supported){
        try {
          $.cookie(key, null);
          return true;
        } catch(e){
          return false;
        }
      }
      storage.removeItem(key);
      return true;
    }
  };
  return publicMethods;
});
