'use strict';

game.controller('GameCtrl', ['$scope', '$timeout', 'Tiles', function($scope, $timeout, Tiles) {
	var tilesLength = 25;
	$scope.tiles = [];
	$scope.score = 0;
	$scope.time = 30;
	$scope.tiles = [];
	
	var generator = initializeGenerator();

	var stop;
	$scope.start = function() {
		$scope.time = 30;
		$scope.countdown();
		generator = initializeGenerator();
	};
	
	$scope.countdown = function() {
		$scope.tiles = Tiles.generateTiles(tilesLength);
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
	  
	$scope.receive = function(tile) {
		if ($scope.time == 0) {
			return;
		}
		if (tile.goods != 0) {
			$scope.score++;
			tile.goods = 0;
			tile.received = true;
		}
	};
	
	$scope.stop = function() {
		$scope.time = 0;
		$timeout.cancel(stop);
		clearInterval(generator);
	};

	function initializeGenerator() {
		var generator = setInterval(function(){
			$scope.tiles = Tiles.generateTiles(tilesLength);
	    }, 3000);

		return generator;
	}
}]);

game.service('Tiles', function() {
	function createTile() {
		var goods = Math.floor((Math.random()*4));
		var tile = {
				received: false,
				goods: goods
		};
		
		return tile;
	};
	
	this.generateTiles = function(length) {
		var tiles = [];
		
		for (var i = 0; i < length; i++) {
			var tile = createTile();
			tiles.push(tile);
		}
		
		return tiles;
	};
	
});