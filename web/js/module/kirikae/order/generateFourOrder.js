var generateFourOrderApp = angular.module("generateFourOrder", []);
generateFourOrderApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
generateFourOrderApp.controller("generateFourOrderController", ["$scope", "$location", function ($scope, $location) {
    $scope.carNameList = [];
    $scope.systemUserList = [];
    $scope.templateAttrList = [];
    $scope.fourOrder = {};
    if(!($location.search().id == undefined || $location.search().id == null)){
        $("#id").val($location.search().id);
    }

    $scope.validFourOrder = function () {
        var reg = /^[-,a-zA-Z0-9]*$/;
        var changeBeforProductNo = $("#fourOrder\\.changeBeforProductNo").val();
        if(!reg.test(changeBeforProductNo)){
            alert("变更前品号不正确，请检查！");
            return false;
        }
        var changeAfterProductNo = $("#fourOrder\\.changeAfterProductNo").val();
        if(!reg.test(changeAfterProductNo)){
            alert("变更后品号不正确，请检查！");
            return false;
        }
        if(!$.html5Validate.isAllpass($("#fourOrder\\.productLine"))){
            return false;
        }
        if(!$.html5Validate.isAllpass($("#fourOrder\\.carName"))){
            return false;
        }
        if(!$.html5Validate.isAllpass($("#fourOrder\\.installationMat"))){
            return false;
        }
        if(!$.html5Validate.isAllpass($("#fourOrder\\.changeContent"))){
            return false;
        }
        if(!$.html5Validate.isAllpass($("#fourOrder\\.estimateChangeTime"))){
            return false;
        }
        var order_quality_confirm_staff_name = $("#order_quality_confirm_staff_name").val();
        if(order_quality_confirm_staff_name == null || order_quality_confirm_staff_name == undefined || order_quality_confirm_staff_name == ""){
            alert("请选择承认人！");
            return false;
        }
        var order_group_confirm_staff_name = $("#order_group_confirm_staff_name").val();
        if(order_group_confirm_staff_name == null || order_group_confirm_staff_name == undefined || order_group_confirm_staff_name == ""){
            alert("请选择确认人！");
            return false;
        }
        var flag = true;
        for(var i = 0; i < $scope.templateAttrList.length; i++){
            var data = $scope.templateAttrList[i];
            if($("#order_attr_checkbox_"+data.attrType+"_"+data.id).is(":checked")){
                flag = false;
                if(data.attrOther == 1){
                    var otherValue = $("#order_attr_checkbox_"+data.attrType+"_"+data.id+"_value").val();
                    if(otherValue == null || otherValue == ""){
                        alert("您选择了其他，输入框不能为空！");
                        return false;
                    }
                }
            }
        }
        if(flag){
            alert("必须选择一个复选框！");
            return false;
        }
        return true;
    };

    $scope.addFourOrder = function () {
        var flag = $scope.validFourOrder();
        if(!flag){
            return;
        }
        var con = confirm("确定生成4M单！");
        if (con == true){
            $("#generateFourOrderForm").ajaxSubmit({
                type: "post",
                dataType : "json",
                url : BASE_URL + "/kirikae/order/generateFour.do",
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

    $scope.closeFourOrder = function () {
        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
    };

    $(document).ready(function () {
        $("input[data-type='date']").each(function () {
            $(this).datetimepicker({
                timepicker: false,
                format: 'Y-m-d'
            });
        });
        $("input[data-type='dateTypeTime']").each(function () {
            $(this).datetimepicker({
                timepicker: true,
                format: 'Y-m-d H:i:s'
            });
        });
        $.ajax({
            method: 'post',
            url: BASE_URL + "/system/user/queryAllUser.do",
            async: false,
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.systemUserList = result.dataMapList;
                    $scope.$apply();
                    $(".chosen").chosen({
                        no_results_text : "没有找到结果！",//搜索无结果时显示的提示
                        search_contains : true,   //关键字模糊搜索，设置为false，则只从开头开始匹配
                        allow_single_deselect : true, //是否允许取消选择
                        max_selected_options : 5,  //当select为多选时，最多选择个数
                        placeholder_text_multiple : "请选择",
                        max_shown_results : 5,
                        width : "70%"
                    });
                }else {
                    alert("请联系系统管理员！");
                }
            }
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
        $.ajax({
            method: 'post',
            url: BASE_URL + "/four/template/getTemplateAttrList.do",
            async: false,
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.templateAttrList = result.dataMapList;
                    $scope.$apply();
                }else {
                    alert("请联系系统管理员！");
                }
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
                        $("#fourOrder\\.id").val($scope.alterationOrder.fourOrder.id);
                        $("#kirikaeOrder\\.id").val($scope.alterationOrder.kirikaeOrder.id);
                        for(var i = 0; i < $scope.alterationOrder.fourOrderAttrList.length; i++){
                            var fourOrderAttr = $scope.alterationOrder.fourOrderAttrList[i];
                            if(fourOrderAttr.attrChecked == 1){
                                for(var j = 0; j < $scope.templateAttrList.length; j++){
                                    if(fourOrderAttr.attrId == $scope.templateAttrList[j].id){
                                        var templateAttr = $scope.templateAttrList[j];
                                        $("#order_attr_checkbox_"+templateAttr.attrType+"_"+fourOrderAttr.attrId).prop("checked",true);
                                        if(templateAttr.attrOther == 1){
                                            $("#order_attr_checkbox_"+templateAttr.attrType+"_"+fourOrderAttr.attrId+"_value").val(fourOrderAttr.attrValue);
                                        }
                                    }
                                }
                            }
                        }
                        $scope.$apply();
                    }else {
                        alert("请联系系统管理员！");
                    }
                }
            });
        }
    });
}]);

generateFourOrderApp.filter('attrFilter', function() {
    return function(inputArray, attrType) {
        var array = [];
        for(var i = 0; i < inputArray.length ; i++){
            var obj = inputArray[i];
            var id = obj.attrType;
            if(id == attrType){
                array.push(obj);
            }
        }
        return array;
    };
});
angular.bootstrap(document, [ 'generateFourOrder' ]);