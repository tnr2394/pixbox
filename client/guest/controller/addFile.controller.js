angular.module('studentMang')
.controller('addStudentCtrl', ['$scope','$state','$rootScope','studentManagementFactory','$localStorage',function($scope,$state,$rootScope,studentManagementFactory,$localStorage){
	// console.log($localStorage.user.college_id);

	$scope.getSem = function(std){
		console.log(std);
		$scope.stdId = std.id;
		$scope.standard=std.standard;
		studentManagementFactory.getDivisions($scope.stdId)
		.then(function(response){
			$scope.semester=response.data;
			console.log($scope.std);
		},function(error){
			console.log(error);
		});	
		}




		$scope.addStudent = function(x,adharCard,dobc,tc,revelant,bankDoc,PR){
		x['grno'] = x['grno'];
		x['standard']=x['standard']['standard'];
		x['name'] = x['lname']+' '+x['fname']+' '+x['mname'];
		x['dob'] =x['fdate'].getFullYear() + "/" +
		(x['fdate'].getMonth()+1) + "/" +
		x['fdate'].getDate();
		var p="images/students/"+x['fname']+x['lname']+'.jpg';
		x['path']=p.toLowerCase();
		x['sphone']=parseInt(x['sphone']);
		x['fphone']=parseInt(x['fphone']);
		x['rphone']=parseInt(x['rphone']);
		x['ophone']=parseInt(x['ophone']);
		studentManagementFactory.addStudent(x,$scope.myPhoto,adharCard,dobc,tc,revelant,bankDoc,PR)
		.then(function(response){
			$scope.sid = response.data;
				// $scope.x=null;
			//	console.log($scope.myPhoto);
			$("button[type=submit]").removeAttr('disabled');
			alert("Student had been added");
			$state.go('admin.addParents', {referer: $scope.sid});
		},function(error){
			console.log(error);
			console.error(error);
		});
	}

}]);
