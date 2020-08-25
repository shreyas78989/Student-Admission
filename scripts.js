(function () {
var app = angular.module('myApp', []);

app.controller('customersCtrl', function($scope, $http) {
  $http.get("data.json")
  .then(function (response) {
	  
		$scope.tab = 1;
		$scope.setTab = function (tabId) {
			console.log("setTab::", tabId);
			$scope.tab = tabId;
		};
		$scope.isSet = function (tabId) {
			console.log("isSet::", tabId);
			return $scope.tab === tabId;
		};
		
		$scope.funcSave = function () {
			console.log("save::", $scope.user);
			alert("Student Details Saved");
			$scope.user = {};
		};
		
		
		$scope.data = response.data;
		console.log($scope.data);
		var topper = 0;
		var topperIndex = 0;
		$scope.finalData = [];
		for(var i=0;i<$scope.data.length;i++) {
		  var temp = {};
		  temp.name = $scope.data[i].name.substring(0,1).toUpperCase() + $scope.data[i].name.substring(1);
		  temp.rollNumber = $scope.data[i].rollNumber;
		  temp.totalMarks = $scope.data[i].marks.Maths + $scope.data[i].marks.English + $scope.data[i].marks.Science;
		  
		  if($scope.data[i].marks.Maths<20 || $scope.data[i].marks.English<20 || $scope.data[i].marks.Science<20) {
			temp.status = "Fail";  
		  } else {
			 temp.status = "Pass";  
		  }
		  
		  if(temp.totalMarks>topper && temp.status !="Fail") {
			  topper = temp.totalMarks;
			  topperIndex = i;
		  }
		  
		  $scope.finalData.push(temp);
		  
		}

		$scope.finalData[topperIndex].status = "Topper";  

		});
	});
})();