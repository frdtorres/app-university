'use strict';

angular.module('mean.schools').config(['$stateProvider',
  function($stateProvider) {
    
    $stateProvider
		.state('schools example page', {
			url: '/schools/example',
			templateUrl: 'schools/views/index.html'
		})

		.state('create school', {
		    url: '/schools/create',
		    templateUrl: 'schools/views/create.html'
		})


		.state('all schools', {
		    url: '/schools',
		    templateUrl: 'schools/views/list.html'
		})
		
		.state('edit schools',{
            url: '/schools/edit/:schoolId',
            templateUrl: 'schools/views/edit.html'
        })

        .state('school',{
            url: '/schools/:schoolId',
            controller: 'ViewSchool',
            templateUrl: 'schools/views/view.html'
        })
        ;
  }
]);