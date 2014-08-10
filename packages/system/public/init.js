'use strict';

angular.element(document).ready(function() {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';

  //Then init the app
  angular.bootstrap(document, ['mean']);

});

// Dynamically add angular modules declared by packages
var packageModules = [];
for (var index in window.modules) {
  angular.module(window.modules[index].module, window.modules[index].angularDependencies || []);
  packageModules.push(window.modules[index].module);
}

// Default modules
var modules = [
  'ngCookies',
  'ngResource',
  'ui.bootstrap',
  'ui.router',
  'restangular',
  'angularFileUpload'
  ];

modules = modules.concat(packageModules);

// Combined modules
angular.module('mean', modules)

  /* Application Start Listener
  ----------------------------- */
  .run(function ($rootScope, $state, $stateParams) {

      // Give easy access to states on all modules via rootScope.
      $rootScope.$state = $rootScope.$prevState = $state;
      $rootScope.$stateParams = $rootScope.$prevStateParams = $stateParams;

      // Track state changes.
      $rootScope.$on('$stateChangeSuccess', function (e, to, toParams, from, fromParams) {
        
        // Update previous state info.
        $rootScope.$prevState = to;
        $rootScope.$prevStateParams = toParams;
      });
    });
