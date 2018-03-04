var standCloseApprovedApp = angular.module("standCloseApproved", []);
standCloseApprovedApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
standCloseApprovedApp.controller("standCloseApprovedController", ["$scope", "$location", function ($scope, $location) {
    if(!($location.search().id == undefined || $location.search().id == null)){
        $("#id").val($location.search().id);
    }

    $scope.woAttrList = [];

    //计算合并单元格
    $scope.calRowSpan = function () {
        var index = null;
        var preParentOrgId = null;
        for(var i = 0; i < $scope.woAttrList.length; i++){
            var parentOrgId = $scope.woAttrList[i].parentOrgId;
            if(preParentOrgId == null){
                preParentOrgId = parentOrgId;
                index = i;
                $scope.woAttrList[index].parentRowSpan = 1;
            }else {
                if(parentOrgId == preParentOrgId){
                    $scope.woAttrList[index].parentRowSpan += 1;
                    $scope.woAttrList[i].parentRowSpan = 0;
                }else {
                    preParentOrgId = parentOrgId;
                    index = i;
                    $scope.woAttrList[index].parentRowSpan = 1;
                }
            }
        }
        index = null;
        var preOrgId = null;
        for(var i = 0; i < $scope.woAttrList.length; i++){
            var orgId = $scope.woAttrList[i].orgId;
            if(preOrgId == null){
                preOrgId = orgId;
                index = i;
                $scope.woAttrList[index].rowSpan = 1;
            }else {
                if(orgId == preOrgId){
                    $scope.woAttrList[index].rowSpan += 1;
                    $scope.woAttrList[i].rowSpan = 0;
                }else {
                    preOrgId = orgId;
                    index = i;
                    $scope.woAttrList[index].rowSpan = 1;
                }
            }
        }
    };

    $scope.submitStandCloseApproved = function () {
        var con = confirm("确定提交！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/stand/approved.do",
                data:{"orderId":$("#id").val()},
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        if (result.success) {
                            window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
                        }else {
                            alert("系统出现异常!!");
                        }
                    }
                }
            });
        }
    };

    $scope.closeStandCloseApproved = function () {
        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
    };

    $(document).ready(function () {
        $.ajax({
            method: 'post',
            url: BASE_URL + "/kirikae/woOrderAttr/getListByOrderId.do",
            data:{"orderId":$("#id").val()},
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.woAttrList = result.dataMapList;
                    $scope.calRowSpan();
                    $scope.$apply();
                }
            }
        });
    });
}]);
angular.bootstrap(document, [ 'standCloseApproved' ]);