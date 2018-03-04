var alterationOrderDetailApp = angular.module("alterationOrderDetail", []);
alterationOrderDetailApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
alterationOrderDetailApp.controller("alterationOrderDetailController", ["$scope", "$location", function ($scope, $location) {
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
    $scope.downloadFile = function (fileId) {
        window.open("/WorkFlow/fileUpload/download.do?fileId="+fileId);
    };

    $(document).ready(function () {
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
angular.bootstrap(document, [ 'alterationOrderDetail' ]);