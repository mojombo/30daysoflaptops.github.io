var app = angular.module("myApp", ["firebase"]);

app.controller("SampleCtrl", ["$scope", "$firebase",
  function($scope, $firebase) {
    var ref = new Firebase("https://sweltering-heat-5062.firebaseio.com/");

    $scope.pledges = $firebase(ref).$asArray();

    $scope.groupedPledges = function() {
      return _.groupBy($scope.pledges, function(pledge) {
        return moment(pledge.pledgedAt).format("MMM Do YY");
      });
    };

    $scope.addPledge = function(email, company, laptops) {
      pledge = {
        email: email,
        company: company,
        laptops: laptops,
        pledgedAt: Firebase.ServerValue.TIMESTAMP
      };
      $scope.pledges.$add(pledge).then(function() {
        $scope.email = null;
        $scope.company = null;
        $scope.laptopsPledged = null;
      });
    };

    $scope.totalLaptops = function() {
      var count = 0;
      angular.forEach($scope.pledges, function(pledge) {
        count += pledge.laptops;
      });
      return count;
    };
  }
]);
