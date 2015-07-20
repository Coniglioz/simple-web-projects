/**
 * Controller modules
 * 
 * @author Federico Baron
 */
var appControllers = angular.module('rockPaperScissorControllers', []);

appControllers.controller('MainController', ['$scope', '$window', '$filter', 'RockPaperScissor', function($scope, $window, $filter, RockPaperScissor) {

        $scope.shapes = [{
                name: 'ROCK',
                url: 'img/rock.png'
            }, {
                name: 'PAPER',
                url: 'img/paper.png'
            }, {
                name: 'SCISSORS',
                url: 'img/scissors.png'
            }];

        $scope.games = [];

        $scope.play = function(playerChoice) {
            RockPaperScissor.play(playerChoice).success(function(data) {
                $scope.games.splice(0, 0, data);
            }).error(function(data, status) {
                $window.alert(data.message || "System error");
            });
        };

        $scope.formatGameResult = function(gameResult) {
            return '[' + $filter('date')(new Date(gameResult.gameTimestamp), 'medium') + ']'
                    + ' - '
                    + gameResult.result.toUpperCase()
                    + ' - '
                    + 'Your choice: ' + gameResult.playerChoice
                    + ', '
                    + 'Computer choice: ' + gameResult.computerChoice;
        };
    }]);