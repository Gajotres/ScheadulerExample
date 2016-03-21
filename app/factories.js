app.factory('Backend', function($http) {
  var cachedData;
 
  function getData(callback) {
 
    var url = 'http://api.themoviedb.org/3/';
 
    $http.get(url).success(function(data) {
 
      cachedData = data;
      callback(data);
    });
  }
 
  return {
    query: getData,
    queryCache: function(callback) {
      callback(cachedData);
    }
  };
});