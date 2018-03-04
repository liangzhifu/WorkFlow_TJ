var kirikaeConfirmationApp = angular.module("kirikaeConfirmation", []);
kirikaeConfirmationApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
kirikaeConfirmationApp.controller("kirikaeConfirmationController", ["$scope", "$location", function ($scope, $location) {
    $scope.kirikaeConfirmation = {};

    if(!($location.search().orderId == undefined || $location.search().orderId == null)){
        $scope.kirikaeConfirmation.orderId = $location.search().orderId;
    }

    $scope.addKirikaeConfirmation = function () {
        $scope.kirikaeConfirmation.releaseDate = $("#releaseDate").val();
        var con = confirm("确定提交确认书！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/confirmation/add.do",
                data: $scope.kirikaeConfirmation,
                async: false,
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
    });

}]);
angular.bootstrap(document, [ 'kirikaeConfirmation' ]);