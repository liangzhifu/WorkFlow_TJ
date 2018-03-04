var designChangeTimingApp = angular.module("designChangeTiming", []);
designChangeTimingApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
designChangeTimingApp.controller("designChangeTimingController", ["$scope", "$location", function ($scope, $location) {
    $scope.carNameList = [];
    $scope.alterationOrder = {
        "kirikaeOrder" : {},
        "kirikaeOrderPartsNumberList" : [],
        "kirikaeOrderChangeContentList" : [],
        "kirikaeResumeList" : []
    };
    if(!($location.search().id == undefined || $location.search().id == null)){
        $("#id").val($location.search().id);
    }

    $scope.confirmDesignChangeTiming = function () {
        if (!$.html5Validate.isAllpass($("#kirikaeOrder\\.designChangeTiming"))) {
            return;
        }
        var con = confirm("确定确认切替时间！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/order/designChangeTiming.do",
                data: {"orderId": $("#id").val(),
                    "designChangeTiming":$("#kirikaeOrder\\.designChangeTiming").val()},
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
                    }else {
                        alert("请联系管理员！");
                    }
                }
            });
        }
    };

    $scope.closeDesignChangeTiming = function () {
        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
    };

    $(document).ready(function () {
        $("input[data-type='date']").each(function () {
            $(this).datetimepicker({
                timepicker: false,
                format: 'Y-m-d'
            });
        });
        $.ajax({
            method: 'post',
            url: BASE_URL + "/vehicle/getVehicleList.do",
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                $scope.carNameList = result;
                $scope.$apply();
            }
        });
        var id = $("#id").val();
        if(!(id == undefined || id == null || id == "")){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/alteration/order/getOrder.do",
                data:{"orderId":id},
                async: false,
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        $scope.alterationOrder = result.alterationOrder;
                        $("#kirikaeOrder\\.id").val($scope.alterationOrder.kirikaeOrder.id);
                        $scope.$apply();
                    }else {
                        alert("请联系系统管理员！");
                    }
                }
            });
        }
    });
}]);
angular.bootstrap(document, [ 'designChangeTiming' ]);