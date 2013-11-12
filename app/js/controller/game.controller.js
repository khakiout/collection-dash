'use strict';

game.controller('GameCtrl', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.tiles = [];
	$scope.score = 0;
	
	function randomizeTiles() {
		for (var i = 0; i < 16; i++) {
			var goods = Math.floor((Math.random()*4));
			var tile = {
					received: false,
					goods: goods
			};
			
			$scope.tiles.push(tile);
		}
	}
	randomizeTiles();
	
	$scope.receive = function(tile) {
		if (tile.goods != 0) {
			$scope.score++;
			tile.goods = 0;
		}
		tile.received = true;
	};
}]);