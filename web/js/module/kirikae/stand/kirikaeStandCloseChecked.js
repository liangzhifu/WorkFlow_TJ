var standCloseCheckedApp = angular.module("standCloseChecked", []);
standCloseCheckedApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
standCloseCheckedApp.controller("standCloseCheckedController", ["$scope", "$location", function ($scope, $location) {
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

    $scope.submitStandCloseChecked = function () {
        var con = confirm("确定确认立合结果！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/stand/checked.do",
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

    $scope.refuseStandCloseChecked = function () {
        var flag = true;
        var woOrderIdstr = "";
        $('input[name="woCheckbox"]:checked').each(function() {
            woOrderIdstr += "," + $(this).val();
            //判断该组织下是否有对象外，对象外组织不能选择
            for(var i = 0; i < $scope.woAttrList.length; i++) {
                var woOrderId = $scope.woAttrList[i].woOrderId;
                var questionId = $scope.woAttrList[i].questionId;
                if(woOrderId == $(this).val() && questionId == 1){
                    flag = false;
                }
            }
        });
        if (!flag){
            alert("不能选择对象外组织！");
            return false;
        }
        if (woOrderIdstr == ""){
            alert("请选择一个拒绝的科室！！");
            return false;
        } else {
            woOrderIdstr = woOrderIdstr.substring(1);
        }
        var con = confirm("确定拒绝立合结果！");
        if (con == true) {
            var refuseReason = "";
            while (refuseReason == ""){
                refuseReason = prompt("请输入拒绝原因！");
            }
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/stand/refuse.do",
                data:{"orderId":$("#id").val(), "woOrderIdstr":woOrderIdstr, "refuseReason":refuseReason},
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

    $scope.closeStandCloseChecked = function () {
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
angular.bootstrap(document, [ 'standCloseChecked' ]);