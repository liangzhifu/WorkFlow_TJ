var kirikaeConfirmationApprovedApp = angular.module("kirikaeConfirmationApproved", []);
kirikaeConfirmationApprovedApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
kirikaeConfirmationApprovedApp.controller("kirikaeConfirmationApprovedController", ["$scope", "$location", function ($scope, $location) {
    $scope.kirikaeConfirmation = {};

    if(!($location.search().orderId == undefined || $location.search().orderId == null)){
        $scope.kirikaeConfirmation.orderId = $location.search().orderId;
    }

    $scope.approvedKirikaeConfirmation = function () {
        var con = confirm("确定承认确认书！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/confirmation/approved.do",
                data: {"orderId":$scope.kirikaeConfirmation.orderId},
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

    $scope.closeKirikaeConfirmation = function () {
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
angular.bootstrap(document, [ 'kirikaeConfirmationApproved' ]);