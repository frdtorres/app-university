'use strict';

angular.module('mean.students').config(['$stateProvider',
  function($stateProvider) {

    $stateProvider
      .state('students example page', {
        url: '/students/example',
        templateUrl: 'students/views/index.html'
      })

      .state('create student', {
            url: '/students/create',
            templateUrl: 'students/views/create.html'
        })
      .state('students', {
            url: '/students',
            templateUrl: 'students/views/list.html'
        })
      .state('edit students',{
            url: '/students/edit/:studentId',
            templateUrl: 'students/views/edit.html'
        })
      // Define project settings form sub-state.
    .state('students.view', {
      url: '/:studentId',
      resolve: {
        $prevState: function($rootScope) {
          return $rootScope.$prevState;
        },
        $prevStateParams: function($rootScope) {
          return $rootScope.$prevStateParams;
        }
      },
      onEnter: function($state, $stateParams, $modal, $prevState, $prevStateParams) {

        var modal = $modal.open({
          templateUrl: 'students/views/view.html',
          controller: 'StudentViewController'
        });

        /**
         * After modal's closure
         */
        modal.result.finally(function() {

          // Parse variables.
          var to = $prevState.name ? $prevState.name : 'students';
          var toParams = $prevState.name ? $prevStateParams : {};

          // Move to previous state or to project listing.
          $state.go(to, toParams);
        });

        /**
         * Bootstrap 3.0 adjusment to modal's behaviors.
         */
        modal.opened.finally(function() {
          // Bootstrap 3.0 adjustment.
          jQuery('body').addClass('modal-open');
        });

        modal.result.finally(function() {
          // Bootstrap 3.0 adjustment.
          jQuery('body').removeClass('modal-open');
        });
      }
    })
      ;
        ;
  }
]);
