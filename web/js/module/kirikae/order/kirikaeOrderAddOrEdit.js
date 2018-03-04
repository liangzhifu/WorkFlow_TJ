var kirikaeOrderAddOrEditApp = angular.module("kirikaeOrderAddOrEdit", []);
kirikaeOrderAddOrEditApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
kirikaeOrderAddOrEditApp.controller("kirikaeOrderAddOrEditController", ["$scope", "$location", function ($scope, $location) {
    if(!($location.search().id == undefined || $location.search().id == null)){
        $("#id").val($location.search().id);
    }
    if(!($location.search().orderChannel == undefined || $location.search().orderChannel == null)){
        $("#orderChannel").val($location.search().orderChannel);
    }

    $scope.systemUserList = [];
    $scope.alterationOrder = {
        "kirikaeOrder" : {
            "kirikaeOrderChangeContentList" : [],
            "kirikaeOrderPartsNumberList" : []
        }
    };

    $scope.validKirikaeOrder = function () {
        return true;
    };

    $scope.closeKirikaeOrder = function () {
        window.location.href = BASE_URL + "/kirikae/order/getPageInfoDialog.do";
    };

    $scope.addKirikaeOrder = function () {
        if(!$scope.validKirikaeOrder()){
            return;
        }
        var id = $("#id").val();
        var url = "";
        var comment = "";
        if(id == undefined || id == null || id == ""){
            url = "/kirikae/order/add.do";
            comment = "确定新增变更单！";
        }else {
            url = "/kirikae/order/edit.do";
            comment = "确定修改变更单！";
        }
        var con = confirm(comment);
        if (con == true){
            $("#kirikaeOrderAddOrEditForm").ajaxSubmit({
                type: "post",
                dataType : "json",
                url : BASE_URL + url,
                success : function(resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        window.location.href = BASE_URL + "/kirikae/order/getPageInfoDialog.do";
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

    $scope.addKirikaeOrderChangeContent = function () {
        $scope.alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList[$scope.alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList.length] = {};
    };

    $scope.delKirikaeOrderChangeContent = function (index) {
        $scope.alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList.splice(index, 1);
    };

    $scope.file = {
        "uploadFile" : "",
        "fileType" : "",
        "fileIndex" : ""
    };

    $scope.uploadBeforeFile = function (index) {
        $("#uploadFile").val('');
        $("#fileUploadModal").modal("show");
        $scope.file.fileType = "beforeFile";
        $scope.file.fileIndex = index;
    };

    $scope.uploadNewFile = function (index) {
        $("#uploadFile").val('');
        $("#fileUploadModal").modal("show");
        $scope.file.fileType = "newFile";
        $scope.file.fileIndex = index;
    };

    $scope.uplodFile = function () {
        if($("#uploadFile").val()){
            $("#excelForm").ajaxSubmit({
                success:function(resultJson){
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        if($scope.file.fileType == "beforeFile"){
                            $scope.alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList[$scope.file.fileIndex].beforeFileId = result.fileId;
                            $("#kirikaeOrder\\.kirikaeOrderChangeContentList\\["+$scope.file.fileIndex+"\\]\\.beforeFileId").val(result.fileId);
                            $scope.alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList[$scope.file.fileIndex].beforeFileName = result.fileName;
                        }else {
                            $scope.alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList[$scope.file.fileIndex].newFileId = result.fileId;
                            $("#kirikaeOrder\\.kirikaeOrderChangeContentList\\["+$scope.file.fileIndex+"\\]\\.newFileId").val(result.fileId);
                            $scope.alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList[$scope.file.fileIndex].newFileName = result.fileName;
                        }
                        $("#fileUploadModal").modal("hide");
                    }
                    $scope.$apply();
                    alert(result.message);
                }
            });
            $("#uploadFile").val('');
        }
    };

    $scope.addKirikaeOrderPartsNumber = function () {
        $scope.alterationOrder.kirikaeOrder.kirikaeOrderPartsNumberList[$scope.alterationOrder.kirikaeOrder.kirikaeOrderPartsNumberList.length] = {};
    };

    $scope.delKirikaeOrderPartsNumber = function (index) {
        $scope.alterationOrder.kirikaeOrder.kirikaeOrderPartsNumberList.splice(index, 1);
    };

    $scope.getAlterAtionOrder = function () {
        var id = $("#id").val();
        if(!(id == undefined || id == null || id == "")){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/order/detail.do",
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
    };

    $(document).ready(function () {
        $("input[data-type='date']").each(function(){
            $(this).datetimepicker({
                timepicker:false,
                format:'Y-m-d'
            });
        });

        $("input[data-type='dateTime']").datetimepicker({
            timepicker:true,
            minDate : new Date(),
            format:'Y-m-d H:i:s'
        });

        $scope.getAlterAtionOrder();

    });
}]);

kirikaeOrderAddOrEditApp.filter('attrFilter', function() {
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
angular.bootstrap(document, [ 'kirikaeOrderAddOrEdit' ]);