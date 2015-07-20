/**
 * Service modules
 * 
 * @author Federico Baron
 */
var appServices = angular.module('rockPaperScissorServices', []);

appServices.factory('RockPaperScissor', ['$http', function($http) {
        return {
            // Start the game
            play: function(playerChoice) {
                return $http.post('/api/play', playerChoice);
            }
        };
    }]);