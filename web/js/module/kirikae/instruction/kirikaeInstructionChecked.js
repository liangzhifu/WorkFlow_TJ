var kirikaeInstructionCheckedApp = angular.module("kirikaeInstructionChecked", []);
kirikaeInstructionCheckedApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
kirikaeInstructionCheckedApp.controller("kirikaeInstructionCheckedController", ["$scope", "$location", function ($scope, $location) {
    $scope.kirikaeInstruction = {};

    if(!($location.search().orderId == undefined || $location.search().orderId == null)){
        $scope.kirikaeInstruction.orderId = $location.search().orderId;
    }

    $scope.kirikaeInstructionChecked = function () {
        var con = confirm("确定确认指示书！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/instruction/checked.do",
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
angular.bootstrap(document, [ 'kirikaeInstructionChecked' ]);