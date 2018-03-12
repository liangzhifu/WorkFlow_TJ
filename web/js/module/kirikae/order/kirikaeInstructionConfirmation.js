var kirikaeInstructionConfirmationApp = angular.module("kirikaeInstructionConfirmation", []);
kirikaeInstructionConfirmationApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
kirikaeInstructionConfirmationApp.controller("kirikaeInstructionConfirmationController", ["$scope", "$location", function ($scope, $location) {
    $scope.kirikaeInstruction = {};
    $scope.kirikaeConfirmation = {};

    if(!($location.search().orderId == undefined || $location.search().orderId == null)){
        $scope.kirikaeInstruction.orderId = $location.search().orderId;
    }
    if(!($location.search().orderId == undefined || $location.search().orderId == null)){
        $scope.kirikaeConfirmation.orderId = $location.search().orderId;
    }

    $(document).ready(function () {
        $.ajax({
            method: 'post',
            url: BASE_URL + "/kirikae/instruction/get.do",
            data: {"orderId":$scope.kirikaeInstruction.orderId},
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.kirikaeInstruction = result.kirikaeInstruction;
                    $scope.$apply();
                }else {
                    alert(result.message);
                }
            }
        });
        $.ajax({
            method: 'post',
            url: BASE_URL + "/kirikae/confirmation/get.do",
            data: {"orderId":$scope.kirikaeConfirmation.orderId},
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.kirikaeConfirmation = result.kirikaeConfirmation;
                    $scope.$apply();
                }else {
                    alert(result.message);
                }
            }
        });
    });

}]);
angular.bootstrap(document, [ 'kirikaeInstructionConfirmation' ]);