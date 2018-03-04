var kirikaeConfirmationCheckedApp = angular.module("kirikaeConfirmationChecked", []);
kirikaeConfirmationCheckedApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
kirikaeConfirmationCheckedApp.controller("kirikaeConfirmationCheckedController", ["$scope", "$location", function ($scope, $location) {
    $scope.kirikaeConfirmation = {};

    if(!($location.search().orderId == undefined || $location.search().orderId == null)){
        $scope.kirikaeConfirmation.orderId = $location.search().orderId;
    }

    $scope.checkedKirikaeConfirmation = function () {
        var con = confirm("确定确认确认书！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/confirmation/checked.do",
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
angular.bootstrap(document, [ 'kirikaeConfirmationChecked' ]);