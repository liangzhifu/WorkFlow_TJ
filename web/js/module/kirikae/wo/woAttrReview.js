var woAttrReviewApp = angular.module("woAttrReview", []);
woAttrReviewApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
woAttrReviewApp.controller("woAttrReviewController", ["$scope", "$location", function ($scope, $location) {
    if(!($location.search().id == undefined || $location.search().id == null)){
        $("#id").val($location.search().id);
    }

    $scope.systemUserList = [];
    $scope.woAttrList = [];
    $scope.kirikaeWoOrderAttr = {};
    $scope.questionList = null;

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

    $scope.submitWoAttrReview = function () {
        if(!$.html5Validate.isAllpass($("#spareColumn"))){
            return false;
        }
        if(!$.html5Validate.isAllpass($("#fileId"))){
            return false;
        }
        for(var index = 0; index < $scope.woAttrList.length; index++){
            //判断对象外
            if($scope.woAttrList[index].questionId == 1){
                var orgId = $scope.woAttrList[index].orgId;
                for(var j = 0; j < $scope.woAttrList.length; j++){
                    if(orgId == $scope.woAttrList[j].orgId && $scope.woAttrList[j].questionId != 1){
                        alert("部门("+$scope.woAttrList[j].parentOrgName+")--科室("+$scope.woAttrList[j].orgName+")选择了对象外，不能选择其他项目！");
                        return false;
                    }
                }
            }else {
                if (!$.html5Validate.isAllpass($("#kirikaeWoOrderAttrList\\["+index+"\\]\\.preparedUser"))) {
                    return false;
                }
                if (!$.html5Validate.isAllpass($("#kirikaeWoOrderAttrList\\["+index+"\\]\\.reviewResult"))) {
                    return false;
                }
            }
        }
        var con = confirm("确定提交评审结果！");
        if (con == true){
            $("#woAttrReviewForm").ajaxSubmit({
                type: "post",
                dataType : "json",
                url : BASE_URL + "/kirikae/woOrderAttr/review.do",
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

    //删除确认项目
    $scope.deleteConfirm = function (index) {
        //只剩一条，不能删除
        var orgId = $scope.woAttrList[index].orgId;
        var num = 0;
        for(var i = 0; i < $scope.woAttrList.length; i++){
            if(orgId == $scope.woAttrList[i].orgId){
                num += 1;
            }
        }
        if(num == 1){
            alert("部门("+$scope.woAttrList[index].parentOrgName+")--科室("+$scope.woAttrList[index].orgName+")只有一条确认项目，不能删除！");
            return false;
        }

        var id = $scope.woAttrList[index].id;
        var con = confirm("确定删除！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/woOrderAttr/reviewDelete.do",
                data:{"id":id},
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        $scope.woAttrList.splice(index, 1);
                        $scope.calRowSpan();
                        $scope.$apply();
                    }
                }
            });
        }
    };

    $scope.addConfirmDialg =function(index){
        $scope.kirikaeWoOrderAttr = {};
        $scope.kirikaeWoOrderAttr.index = index;
        $scope.kirikaeWoOrderAttr.orgId = $scope.woAttrList[index].orgId;
        $scope.kirikaeWoOrderAttr.woOrderId = $scope.woAttrList[index].woOrderId;
        $scope.kirikaeWoOrderAttr.parentOrgId = $scope.woAttrList[index].parentOrgId;
        $scope.kirikaeWoOrderAttr.orgName = $scope.woAttrList[index].orgName;
        $scope.kirikaeWoOrderAttr.parentOrgName = $scope.woAttrList[index].parentOrgName;
        $.ajax({
            method: 'post',
            url: BASE_URL + "/kirikae/orgQuestion/queryAddWoOrderOrgList.do",
            data:{"orgId":$scope.kirikaeWoOrderAttr.orgId,
                "woOrderId":$scope.kirikaeWoOrderAttr.woOrderId},
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.questionList = result.dataMapList;
                    $("#orgName").val($scope.woAttrList[index].parentOrgName+"->"+$scope.woAttrList[index].orgName);
                    $scope.$apply();
                    $("#confirmAddModal").modal("show");
                }
            }
        });
    };

    $scope.addConfirm = function () {
        var questionId = $("#questionId").val();
        if(questionId == null || questionId == ""){
            alert("请选择确认项目！");
            return;
        }
        var con = confirm("确定添加！");
        if (con == true){
            $scope.kirikaeWoOrderAttr.questionId = questionId;
            for(var i = 0; i < $scope.questionList.length; i++){
                if(questionId == $scope.questionList[i].id){
                    $scope.kirikaeWoOrderAttr.confirmProject = $scope.questionList[i].confirmProject;
                    $scope.kirikaeWoOrderAttr.confirmContent = $scope.questionList[i].confirmContent;
                }
            }
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/woOrderAttr/reviewAdd.do",
                data:$scope.kirikaeWoOrderAttr,
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        $scope.kirikaeWoOrderAttr.id = result.id;
                        $scope.woAttrList.splice($scope.kirikaeWoOrderAttr.index, 0, $scope.kirikaeWoOrderAttr);
                        $scope.calRowSpan();
                        $scope.$apply();
                        $("#confirmAddModal").modal("hide");
                        $("input[data-type='date']").each(function () {
                            $(this).datetimepicker({
                                timepicker: false,
                                format: 'Y-m-d'
                            });
                        });
                    }
                }
            });
        }
    };

    //上传会议纪要，显示上传控件
    $scope.uploadFileModal = function (index) {
        $("#uploadFile").val('');
        $("#fileUploadModal").modal("show");
    };

    //上传会议纪要文件
    $scope.uplodFile = function () {
        if($("#uploadFile").val()){
            $("#excelForm").ajaxSubmit({
                success:function(resultJson){
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        $("#fileId").val(result.fileId);
                        $("#fileName").val(result.fileName);
                        $("#fileUploadModal").modal("hide");
                    }
                }
            });
            $("#uploadFile").val('');
        }
    };

    $scope.closeWoAttrReview = function () {
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
            url: BASE_URL + "/kirikae/woOrderAttr/getListByOrderId.do",
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
woAttrReviewApp.filter('attrFilter', function() {
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
angular.bootstrap(document, [ 'woAttrReview' ]);