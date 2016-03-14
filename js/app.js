var app = angular.module('schedulerApp', ['oi.select']);

app.controller('SchedulerCtrl', function ($scope, $http){

		$scope.orgUnits = {};
		$scope.skills = {};
		$scope.employees = {};

	var dummyJson = {
		orgUnits: [
	  	{'id':'o1', 'name':'Odjel 1'},
	  	{'id':'o2', 'name':'Odjel 2'},
		{'id':'o3', 'name':'Odjel 3'},
		{'id':'o4', 'name':'Odjel 4'},
		{'id':'o5', 'name':'Odjel 5'}
	  ],
	  skills : [
	  	{'id':'s1', 'name':'Pranje Prozora'},
	    {'id':'s2', 'name':'Skok s motkom'},
	    {'id':'s3', 'name':'Bacanje pogleda u vis'},
	    {'id':'s4', 'name':'Kopanje ruda i gubljenje vremena'},
	    {'id':'s5', 'name':'Tehnolog'}
	  ],
	  employee : [
	  	{'id':'e1', name: 'Pero Perić', 'tasks': [
	      {id: 't1', 'orgUnit' : 'o1', 'skill' : 's2', start: '2016-01-07T02:00:00', end: '2016-01-07T07:00:00', title: 'Task 1'},
	      {id: 't2', 'orgUnit' : 'o1', 'skill' : 's1', start: '2016-01-07T05:00:00', end: '2016-01-07T13:00:00', title: 'Task 6'},
	      {id: 't8', 'orgUnit' : 'o1', 'skill' : 's3', start: '2016-01-07T14:00:00', end: '2016-01-07T16:00:00', title: 'Task 6'}
	    ]},
	    {'id':'e2', name: 'Tajni Petokolonaš','tasks': [
	      {id: 't3', 'orgUnit' : 'o2', 'skill' : 's5', start: '2016-01-07T02:00:00', end: '2016-01-07T15:00:00', title: 'Task 2'}
	    ]},
	    {'id':'e3', name: 'Hunny Bunny aka Dražen Zečić','tasks': [
	      {id: 't4', 'orgUnit' : 'o3', 'skill' : 's4', start: '2016-01-07T02:00:00', end: '2016-01-07T11:00:00', title: 'Task 3'},
	      {id: 't7', 'orgUnit' : 'o5', 'skill' : 's5', start: '2016-01-07T10:00:00', end: '2016-01-07T17:00:00', title: 'Task 7'}
	    ]},
	    {'id':'e4', name: 'Lovac na Jelene','tasks': [
	      {id: 't5', 'orgUnit' : 'o4', 'skill' : 's3', start: '2016-01-07T02:00:00', end: '2016-01-07T07:00:00', title: 'Task 4'}
	    ]},
	    {'id':'e5', name: 'Mali Ivica','tasks': [
	      {id: 't6', 'orgUnit' : 'o5', 'skill' : 's1', start: '2016-01-07T02:00:00', end: '2016-01-07T06:00:00', title: 'Task 5'}
	    ]}                
	  ]
	};	

	$scope.employees["e0"] = {'name': 'Svi zaposlenici', id : 'e0'};
	angular.forEach(dummyJson.employee, function(value, key) {
	    $scope.employees[value.id] = {'name': value.name, 'id' : value.id};
	});

	$scope.orgUnits["o0"] = {'name': 'Svi odjeli', id : 'o0'};
	angular.forEach(dummyJson.orgUnits, function(value, key) {
	    $scope.orgUnits[value.id] = {'name': value.name, 'id' : value.id};
	});

	$scope.skills["s0"] = {'name': 'Sve vještine', id : 's0'};
	angular.forEach(dummyJson.skills, function(value, key) {
	    $scope.skills[value.id] = {'name': value.name, 'id' : value.id};
	});

	$scope.$watch("employee", function(newValue, oldValue){
		if(newValue !== undefined && newValue !== null) {				
			$scope.buildClassicView(newValue);
			$scope.orgUnit = null;
			$scope.skill = null;
		}				
	});

	$scope.$watch("orgUnit", function(newValue, oldValue){
		if(newValue !== undefined && newValue !== null) {
			$scope.buildOrganizationView(newValue);
			$scope.employee = null;
			$scope.skill = null;					
		}
	});

	$scope.$watch("skill", function(newValue, oldValue){
		if(newValue !== undefined) {
			
		}
	});

	$scope.generateSimpleCalendar = function(calResources, calEvents, lebelText, simpleDisplay) {

		$('#calendar-container').empty();
		$('#calendar-container').append('<div id="calendar"></div>');

		var options = {
			lang: 'hr',
			titleFormat: 'DD. MMM YYYY',
			slotLabelFormat: 'HH',
			now: '2016-01-07',
			editable: false, // enable draggable events
			schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
			aspectRatio: 1.8,
			scrollTime: '00:00', // undo default 6am scrollTime
			header: {
				left: 'today prev,next',
				center: 'title',
				right: 'timelineDay,timelineThreeDays,agendaWeek,month'
			},
			defaultView: 'timelineDay',
			views: {
				timelineThreeDays: {
					type: 'timeline',
					duration: { days: 3 }
				}
			},
			resourceLabelText: lebelText,
			resources: calResources,
			events: calEvents
		};

		if(!simpleDisplay) {
			options.resourceGroupField = 'group';
		}

		$('#calendar').fullCalendar(options);
	}			

	$scope.buildClassicView = function(employee) {

		$scope.calResources = [];
		$scope.calEvents = [];
		$scope.calInnerElements = 0;

		angular.forEach(dummyJson.employee, function(value, key) {
			if((employee === undefined || employee === null) || (employee !== undefined && employee !== null && (employee.id == value.id || employee.id == 'e0'))) {
				$scope.calResources.push({id : value.id, title : value.name, eventColor: $scope.colorGenerator()});	
			}
		});

		angular.forEach(dummyJson.employee, function(value, key) {
			if((employee === undefined || employee === null) || (employee !== undefined && employee !== null && (employee.id == value.id || employee.id == 'e0'))) {
			    angular.forEach(value.tasks, function(innerValue, innerKey) {
				    $scope.calEvents.push({id :$scope.calInnerElements++, resourceId : value.id, start : innerValue.start, end : innerValue.end, title: innerValue.title});
				});	
			}
		});				

		$scope.generateSimpleCalendar($scope.calResources, $scope.calEvents, 'Zaposlenici', true);				
	};

	$scope.buildOrganizationView = function(organization) {

		$scope.calResources = [];
		$scope.calEvents = [];
		$scope.calInnerElements = 0;

		angular.forEach(dummyJson.orgUnits, function(value, key) {
			if((organization === undefined || organization === null) || (organization !== undefined && organization !== null && (organization.id == value.id || organization.id == 'o0'))) {
			    angular.forEach(dummyJson.employee, function(innerValue, innerKey) {
				    angular.forEach(innerValue.tasks, function(taskValue, taskKey) {
				    	if(value.id == taskValue.orgUnit && $scope.checkIfResourceExists(innerValue.name, value.name, $scope.calResources)) {
							$scope.calResources.push({id : taskValue.id, title : innerValue.name, group: value.name, eventColor: $scope.colorGenerator()});
				    	}
					});
				});
			}
		});

		angular.forEach(dummyJson.employee, function(value, key) {
		    angular.forEach(value.tasks, function(innerValue, innerKey) {
		    	if((organization === undefined || organization === null) || (organization !== undefined && organization !== null && (organization.id == innerValue.orgUnit || organization.id == 'o0'))) {
			    	var resId = innerValue.id;
			    	resId = $scope.getCorrectTaskId(resId, innerValue.orgUnit, value.tasks);
				    $scope.calEvents.push({id : $scope.calInnerElements++, resourceId : resId, start : innerValue.start, end : innerValue.end, title: innerValue.title});
				}
			});
		});

		$scope.generateSimpleCalendar($scope.calResources, $scope.calEvents, 'Odjeli', false);				
	};

	$scope.checkIfResourceExists = function(title, group, resources) {

		var dontExist = true;

	    angular.forEach(resources, function(value, key) {
		    if(value.title == title && value.group == group) {
				dontExist = false;
		    }
		});	

		return dontExist;			
	}	

	$scope.getCorrectTaskId = function(resId, group, events) {

		var keepGoing = true;
	    angular.forEach(events, function(innerValue, innerKey) {
		    if(innerValue.orgUnit == group && keepGoing) {
		    	resId = innerValue.id;
		    	keepGoing = false;
		    }
		});	

		return resId;
	}

	$scope.colorGenerator = function() {
		var colorArray = ['#00bd9f','#01cc7b','#f4c343','#9f59b1','#54afde','#1781b3','#00ae69','#da511d','#2e414f','#01a187','#9444a7'];

		return colorArray[Math.floor((Math.random() * 11) + 1)];
	}					

	//$scope.buildClassicView(null);
	$scope.buildOrganizationView(null);
});