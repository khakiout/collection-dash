'use strict';

game.controller('GameCtrl', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.tiles = [];
	$scope.score = 0;
	$scope.time = 10;
	
	function randomizeTiles() {
		$scope.tiles = [];
		
		for (var i = 0; i < 16; i++) {
			var goods = Math.floor((Math.random()*4));
			var tile = {
					received: false,
					goods: goods
			};
			
			$scope.tiles.push(tile);
		}
	}
	
	function clearTiles() {
		for (var i = 0; i < 16; i++) {
			var tile = $scope.tiles[i];
			tile.goods = 0;
		}
	}
	randomizeTiles();
	
	var generator = setInterval(function(){
		randomizeTiles();
    }, 3000);

	var stop;
	$scope.countdown = function() {
	    stop = $timeout(function() {
	      if ($scope.time >= 1) {
	    	  $scope.time--;
	          $scope.countdown();
	      } else {
	    	  $scope.stop();
	          $timeout.cancel(stop);
	      }
	    }, 1000);
	  };
    $scope.countdown();
	$scope.receive = function(tile) {
		if ($scope.time == 0) {
			return;
		}
		if (tile.goods != 0) {
			$scope.score++;
			tile.goods = 0;
		}
		tile.received = true;
	};
	
	$scope.stop = function() {
//		clearTiles();
		$scope.time = 0;
		$timeout.cancel(stop);
		clearInterval(generator);
	};
}]);
