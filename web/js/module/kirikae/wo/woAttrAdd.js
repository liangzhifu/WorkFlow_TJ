var woAttrAddApp = angular.module("woAttrAdd", []);
woAttrAddApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
woAttrAddApp.controller("woAttrAddController", ["$scope", "$location", function ($scope, $location) {
    if(!($location.search().id == undefined || $location.search().id == null)){
        $("#id").val($location.search().id);
    }

    $scope.alterationOrder = {"kirikaeOrder":{}};
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

    //判断组织选择了对象外，不能选择其他确认项目
    $scope.confirmOtherProject = function (orgId) {
        var flag = false;
        var num = 0;
        $('input[name="woAttrChecked"]:checked').each(function() {
            var index = $(this).val();
            if(orgId == $scope.woAttrList[index].orgId){
                if($scope.woAttrList[index].questionId == 1){
                    flag = true;
                }
                num += 1;
            }
        });
        if(flag && num > 1){
            return false;
        }else {
            return true;
        }
    };

    $scope.submitWoAttrAdd = function () {
        //判断每个科室必须选择一项
        var preOrgId = null;
        for(var i = 0; i < $scope.woAttrList.length; i++) {
            var orgId = $scope.woAttrList[i].orgId;
            if(preOrgId == null){
                //判断是否有选中
                if(!$scope.validChecked(orgId)){
                    alert("部门("+$scope.woAttrList[i].parentOrgName+")--科室("+$scope.woAttrList[i].orgName+")没有选择！请选择！");
                    return;
                }
                if(!$scope.confirmOtherProject(orgId)){
                    alert("部门("+$scope.woAttrList[i].parentOrgName+")--科室("+$scope.woAttrList[i].orgName+")选择了对象外，不能选择其他项目！");
                    return;
                }
                preOrgId = orgId;
            }else {
                if(preOrgId != orgId){
                    //判断是否有选中
                    if(!$scope.validChecked(orgId)){
                        alert("部门("+$scope.woAttrList[i].parentOrgName+")--科室("+$scope.woAttrList[i].orgName+")没有选择！请选择！");
                        return;
                    }
                    if(!$scope.confirmOtherProject(orgId)){
                        alert("部门("+$scope.woAttrList[i].parentOrgName+")--科室("+$scope.woAttrList[i].orgName+")选择了对象外，不能选择其他项目！");
                        return;
                    }
                    preOrgId = orgId;
                }
            }
        }
        var flag = true;
        $('input[name="woAttrChecked"]:checked').each(function() {
            var index = $(this).val();
            //判断对象外
            if($scope.woAttrList[index].questionId == 1){
                return true;
            }
            if (!$.html5Validate.isAllpass($("#woAttrList\\["+index+"\\]\\.preparedUser"))) {
                flag = false;
                return false;
            }
        });
        if(!flag){
            return false;
        }
        var con = confirm("确定提交！");
        if (con == true){
            var woOrderIdStr = "";
            var questionIdStr = "";
            var preparedUserStr = "";
            var changeCompleteTimeStr = "";
            $('input[name="woAttrChecked"]:checked').each(function() {
                var index = $(this).val();
                woOrderIdStr += "," + $scope.woAttrList[index].woOrderId;
                questionIdStr += "," + $scope.woAttrList[index].questionId;
                var preparedUser = $("#woAttrList\\["+index+"\\]\\.preparedUser").val();
                if(preparedUser == null || preparedUser == ""){
                    preparedUser = 0;
                }
                preparedUserStr += "," + preparedUser;
                var changeCompleteTime = $("#woAttrList\\["+index+"\\]\\.changeCompleteTime").val();
                if(changeCompleteTime == null || changeCompleteTime == ""){
                    changeCompleteTime = "1";
                }
                changeCompleteTimeStr += "," + changeCompleteTime;
            });
            woOrderIdStr = woOrderIdStr.substring(1);
            questionIdStr = questionIdStr.substring(1);
            preparedUserStr = preparedUserStr.substring(1);
            changeCompleteTimeStr = changeCompleteTimeStr.substring(1);
            $("#woAttrAddForm").ajaxSubmit({
                type: "post",
                dataType : "json",
                url : BASE_URL + "/kirikae/woOrderAttr/add.do",
                data : {
                    "woOrderIdStr" : woOrderIdStr,
                    "questionIdStr" : questionIdStr,
                    "preparedUserStr" : preparedUserStr,
                    "changeCompleteTimeStr" : changeCompleteTimeStr
                },
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

    $scope.closeWoAttrAdd = function () {
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
            url: BASE_URL + "/kirikae/woOrderAttr/getAddList.do",
            data:{"orderId":$("#id").val()},
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
woAttrAddApp.filter('attrFilter', function() {
    return function(inputArray, orgId) {
        var array = [];
        for(var i = 0; i < inputArray.length ; i++){
            var obj = inputArray[i];
            var id = obj.orgId;
            if(id == orgId){
                array.push(obj);
            }
        }
        return array;
    };
});
angular.bootstrap(document, [ 'woAttrAdd' ]);