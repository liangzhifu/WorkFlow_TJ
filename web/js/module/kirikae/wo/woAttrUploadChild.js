var woAttrUploadChildApp = angular.module("woAttrUploadChild", []);
woAttrUploadChildApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
woAttrUploadChildApp.controller("woAttrUploadChildController", ["$scope", "$location", function ($scope, $location) {
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

    $scope.file = {"fileIndex" : ""};

    $scope.uploadNewFile = function (index) {
        $("#uploadFile").val('');
        $("#fileUploadModal").modal("show");
        $scope.file.fileIndex = index;
    };

    $scope.uplodFile = function () {
        if($("#uploadFile").val()){
            $("#excelForm").ajaxSubmit({
                success:function(resultJson){
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        $scope.woAttrList[$scope.file.fileIndex].fileId = result.fileId;
                        $scope.woAttrList[$scope.file.fileIndex].fileName = result.fileName;
                        $("#fileUploadModal").modal("hide");
                        $scope.$apply();
                    }
                }
            });
            $("#uploadFile").val('');
        }
    };

    $scope.submitWoAttrUpload = function () {
        if (!$.html5Validate.isAllpass($(".class-required"))) {
            return false;
        }
        var con = confirm("确定提交！");
        if (con == true){
            $("#woAttrUploadChildForm").ajaxSubmit({
                type: "post",
                dataType : "json",
                url : BASE_URL + "/kirikae/woOrderAttr/upload.do",
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

    $scope.closeWoAttrUpload = function () {
        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
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
        $.ajax({
            method: 'post',
            url: BASE_URL + "/kirikae/woOrderAttr/getListByUserId.do",
            data:{"orderId":$("#id").val(), "stateType":"upload"},
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.woAttrList = result.dataMapList;
                    $scope.calRowSpan();
                    $scope.$apply();
                    $("input[data-type='date']").each(function () {
                        $(this).datetimepicker({
                            timepicker: false,
                            format: 'Y-m-d'
                        });
                    });
                }
            }
        });
    });
}]);
angular.bootstrap(document, [ 'woAttrUploadChild' ]);