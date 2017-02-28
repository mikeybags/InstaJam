app.controller("userController", ["$scope", "userFactory", "$location", "$cookies", function($scope, userFactory, $location, $cookies){
  if ($cookies.get("user")){
    $location.url('/success');
  }

  $scope.user = {}
  $scope.userLogin = {}
  $scope.register = function(){
    userFactory.create($scope.user, function(data){
      console.log("Hello");
      if (data.err){
        $scope.errors = [];
        for (key in data.err.errors){
          $scope.errors.push(data.err.errors[key].message)
        }
      }
      else if (data.badPass){
        $scope.errors = [];
        $scope.errors.push(data.badPass)
      }
      else {
        $cookies.put("user", data.user.firstName);
        $location.url('/success')
      }
    })
  }
  $scope.login = function(){
    userFactory.login($scope.userLogin, function(data){
      if(data.user){
        $cookies.put("user", data.user[0].firstName);
        $location.url('/success');
      }
      else {
        $scope.error = "Incorrect email or password";
      }
    })
  }
}])
