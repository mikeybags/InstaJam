(function () {
  angular
    .module('app')
    .directive('player', player);

  function player () {
    return {
      restrict: 'EA',
      templateUrl: '../partials/player.html',
      controller: 'mediaPlayerController'
    };
  }

})();
