var woAttrConfirmApp = angular.module("woAttrConfirm", []);
woAttrConfirmApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
woAttrConfirmApp.controller("woAttrConfirmController", ["$scope", "$location", function ($scope, $location) {
    if(!($location.search().id == undefined || $location.search().id == null)){
        $("#id").val($location.search().id);
    }

    $scope.systemUserList = [];
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

    $scope.validChecked = function (orgId) {
        var flag = false;
        $('input[name="woAttrChecked"]:checked').each(function() {
            var index = $(this).val();
            if(orgId == $scope.woAttrList[index].orgId){
                flag = true;
            }
        });
        return flag;
    };

    $scope.submitWoAttrConfirm = function () {
        if (!$.html5Validate.isAllpass($(".class-required"))) {
            return false;
        }
        var con = confirm("确定提交！");
        if (con == true){
            $("#woAttrConfirmForm").ajaxSubmit({
                type: "post",
                dataType : "json",
                url : BASE_URL + "/kirikae/woOrderAttr/confirm.do",
                success : function(resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
                    }else {
                        alert(result.message);
                    }
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    alert("系统出现异常!!");
                }
            });
        }
    };

    $scope.closeWoAttrConfirm = function () {
        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
    };

    $scope.getAlterationOrder = function () {
        $.ajax({
            method: 'post',
            url: BASE_URL + "/alteration/order/getOrder.do",
            data:{"orderId":$("#id").val()},
            async: false,
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.alterationOrder = result.alterationOrder;
                    $scope.getWoOrderAttrList();
                }else {
                    alert("请联系系统管理员！");
                }
            }
        });
    };

    $scope.getWoOrderAttrList = function () {
        $.ajax({
            method: 'post',
            url: BASE_URL + "/kirikae/woOrderAttr/getListByUserId.do",
            data:{"orderId":$("#id").val(), "stateType":"confirm"},
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.woAttrList = result.dataMapList;
                    $scope.calRowSpan();
                    $scope.$apply();
                    //判断量产前，还是量产后，量产后的预计完成时间不能晚于切替时间
                    if($scope.alterationOrder.kirikaeOrder.kirikaeOrderType == 1){
                        $("input[data-type='date']").each(function () {
                            $(this).datetimepicker({
                                timepicker: false,
                                format: 'Y-m-d'
                            });
                        });
                    }else {
                        $("input[data-type='date']").each(function () {
                            $(this).datetimepicker({
                                timepicker: false,
                                maxDate: $scope.alterationOrder.kirikaeOrder.designChangeTiming,
                                format: 'Y-m-d'
                            });
                        });
                    }
                }
            }
        });
    };

    $(document).ready(function () {
        $.ajax({
            method: 'post',
            url: BASE_URL + "/system/userOrg/getUserOrgList.do",
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.systemUserList = result.mapList;
                    $scope.$apply();
                }
            }
        });
        $scope.getAlterationOrder();
    });
}]);
angular.bootstrap(document, [ 'woAttrConfirm' ]);