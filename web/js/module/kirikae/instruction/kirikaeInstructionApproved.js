var kirikaeInstructionApprovedApp = angular.module("kirikaeInstructionApproved", []);
kirikaeInstructionApprovedApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
kirikaeInstructionApprovedApp.controller("kirikaeInstructionApprovedController", ["$scope", "$location", function ($scope, $location) {
    $scope.kirikaeInstruction = {};

    if(!($location.search().orderId == undefined || $location.search().orderId == null)){
        $scope.kirikaeInstruction.orderId = $location.search().orderId;
    }

    $scope.kirikaeInstructionApproved = function () {
        var con = confirm("确定承认指示书！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/instruction/approved.do",
                data: {"orderId":$scope.kirikaeInstruction.orderId},
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
                    }else {
                        alert(result.message);
                    }
                }
            });
        }
    };

    $scope.closeKirikaeInstruction = function () {
        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
    };

    $(document).ready(function () {
        $("input[data-type='date']").each(function(){
            $(this).datetimepicker({
                timepicker:false,
                format:'Y-m-d'
            });
        });

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

    });

}]);
angular.bootstrap(document, [ 'kirikaeInstructionApproved' ]);