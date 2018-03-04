var alterationOrderAddOrEditApp = angular.module("alterationOrderAddOrEdit", []);
alterationOrderAddOrEditApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
alterationOrderAddOrEditApp.controller("alterationOrderAddOrEditController", ["$scope", "$location", function ($scope, $location) {
    $scope.carNameList = [];
    $scope.alterationOrder = {
        "kirikaeOrder" : {},
        "kirikaeOrderPartsNumberList" : [],
        "kirikaeOrderChangeContentList" : [],
        "kirikaeResumeList" : []
    };
    if(!($location.search().id == undefined || $location.search().id == null)){
        $("#id").val($location.search().id);
        $('#kirikaeOrder\\.kirikaeOrderType').attr("disabled",true);
        $('#kirikaeOrder\\.tkNo').attr("disabled",true);
    }
    if(!($location.search().orderChannel == undefined || $location.search().orderChannel == null)){
        $("#orderChannel").val($location.search().orderChannel);
        $scope.alterationOrder.orderChannel = $location.search().orderChannel;
    }

    $scope.addAlterationOrder = function () {
        if (!$.html5Validate.isAllpass($("#kirikaeOrder\\.kirikaeOrderType"))) {
            return;
        }
        if (!$.html5Validate.isAllpass($("#kirikaeOrder\\.kirikaeOrderState"))) {
            return;
        }
        if (!$.html5Validate.isAllpass($("#kirikaeOrder\\.tkNo"))) {
            return;
        }
        if (!$.html5Validate.isAllpass($("#kirikaeOrder\\.engineeringPrepared"))) {
            return;
        }
        if (!$.html5Validate.isAllpass($("#kirikaeOrder\\.customer"))) {
            return;
        }
        if (!$.html5Validate.isAllpass($("#kirikaeOrder\\.vehicleName"))) {
            return;
        }
        if (!$.html5Validate.isAllpass($("#kirikaeOrder\\.presenceRequired"))) {
            return;
        }
        if(!$.html5Validate.isAllpass($(".required-class"))){
            return;
        }
        //客戶技术承认
        var customerEngineering = $("#kirikaeOrder\\.customerEngineering").val();
        if(customerEngineering == "1"){
            if (!$.html5Validate.isAllpass($("#kirikaeOrder\\.customerEngineeringApproval"))) {
                return;
            }
        }else {
            $("#kirikaeOrder\\.customerEngineeringApproval").val("");
        }
        //法规关系
        var regulation = $("#kirikaeOrder\\.regulation").val();
        if(regulation == "1"){
            if (!$.html5Validate.isAllpass($("#kirikaeOrder\\.regulationApproval"))) {
                return;
            }
        }else {
            $("#kirikaeOrder\\.regulationApproval").val("");
        }
        //模具设变费
        var designCosts = $("#kirikaeOrder\\.designCosts").val();
        if(designCosts == "1"){
            if (!$.html5Validate.isAllpass($("#kirikaeOrder\\.designCostsPay"))) {
                return;
            }
        }else {
            $("#kirikaeOrder\\.designCostsPay").val("");
        }
        //判断变更内容是否有
        if( $scope.alterationOrder.kirikaeOrderChangeContentList.length == 0){
            alert("请填写变更内容！");
            return;
        }
        //判断品号变更是否有
        if( $scope.alterationOrder.kirikaeOrderPartsNumberList.length == 0){
            alert("请填写品号变更！");
            return;
        }
        var id = $("#id").val();
        var url = "";
        var comment = "";
        if(id == undefined || id == null || id == ""){
            url = "/alteration/order/add.do";
            comment = "确定新增变更单！";
            $("#isNeedInitialization").val(0);
            var con = confirm(comment);
            if (con == true){
                $("#alterationOrderAddOrEditForm").ajaxSubmit({
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
        }else {
            url = "/alteration/order/edit.do";
            comment = "确定修改变更单！";
            var con = confirm(comment);
            if (con == true){
                $.ajax({
                    method: 'post',
                    url: BASE_URL + "/kirikae/order/validRepeat.do",
                    data: {"orderId": id},
                    success: function (resultJson) {
                        var result = angular.fromJson(resultJson);
                        if (result.success) {
                            if(result.valid){
                                var con2 = confirm("是否重走流程！");
                                if (con2 == true){
                                    $("#isNeedInitialization").val(1);
                                }else {
                                    $("#isNeedInitialization").val(0);
                                }
                            }else {
                                $("#isNeedInitialization").val(0);
                            }
                            $("#alterationOrderAddOrEditForm").ajaxSubmit({
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
                        }else {
                            alert("系统出现异常!!");
                        }
                    }
                });
            }
        }
    };

    $scope.addKirikaeOrderPartsNumber = function () {
        $scope.alterationOrder.kirikaeOrderPartsNumberList[$scope.alterationOrder.kirikaeOrderPartsNumberList.length] = {};
        $scope.$apply();
    };

    $scope.delKirikaeOrderPartsNumber = function (index) {
        $scope.alterationOrder.kirikaeOrderPartsNumberList.splice(index, 1);
        $scope.$apply();
    };

    $scope.addKirikaeResume = function () {
        if($scope.alterationOrder.kirikaeResumeList.length > 3){
            alert("最多4条履历！");
            return;
        }
        $scope.alterationOrder.kirikaeResumeList[$scope.alterationOrder.kirikaeResumeList.length] = {};
        $scope.$apply();
    };

    $scope.delKirikaeResume = function (index) {
        $scope.alterationOrder.kirikaeResumeList.splice(index, 1);
        $scope.$apply();
    };

    $scope.addKirikaeOrderChangeContent = function () {
        $scope.alterationOrder.kirikaeOrderChangeContentList[$scope.alterationOrder.kirikaeOrderChangeContentList.length] = {};
        $scope.$apply();
    };

    $scope.delKirikaeOrderChangeContent = function (index) {
        $scope.alterationOrder.kirikaeOrderChangeContentList.splice(index, 1);
        $scope.$apply();
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
                            $scope.alterationOrder.kirikaeOrderChangeContentList[$scope.file.fileIndex].beforeFileId = result.fileId;
                            $("#kirikaeOrderChangeContentList\\["+$scope.file.fileIndex+"\\]\\.beforeFileId").val(result.fileId);
                            $scope.alterationOrder.kirikaeOrderChangeContentList[$scope.file.fileIndex].beforeFileName = result.fileName;
                        }else {
                            $scope.alterationOrder.kirikaeOrderChangeContentList[$scope.file.fileIndex].newFileId = result.fileId;
                            $("#kirikaeOrderChangeContentList\\["+$scope.file.fileIndex+"\\]\\.newFileId").val(result.fileId);
                            $scope.alterationOrder.kirikaeOrderChangeContentList[$scope.file.fileIndex].newFileName = result.fileName;
                        }
                        $("#fileUploadModal").modal("hide");
                    }
                    $scope.$apply();
                }
            });
            $("#uploadFile").val('');
        }
    };

    $scope.closeAlterationOrder = function () {
        window.location.href = BASE_URL + "/kirikae/order/getPageInfoDialog.do";
    };

    $scope.showVehicle = function () {
        $.ajax({
            method: 'post',
            url: BASE_URL + "/vehicle/getVehicleList.do",
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                $scope.carNameList = result;
                $scope.$apply();
                $("#kirikaeOrder\\.vehicleName").chosen({
                    no_results_text : "没有找到结果！",//搜索无结果时显示的提示
                    search_contains : true,   //关键字模糊搜索，设置为false，则只从开头开始匹配
                    allow_single_deselect : true, //是否允许取消选择
                    max_selected_options : 5,  //当select为多选时，最多选择个数
                    placeholder_text_multiple : "请选择",
                    max_shown_results : 5,
                    width : "60%"
                });
                $scope.showAlteration();
            }
        });
    };

    $scope.showAlteration = function () {
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
                        $("#kirikaeOrder\\.vehicleName option[value='"+$scope.alterationOrder.kirikaeOrder.vehicleName+"']").attr("selected","selected");
                        $("#kirikaeOrder\\.vehicleName").trigger("chosen:updated");
                        $scope.$apply();
                    }else {
                        alert("请联系系统管理员！");
                    }
                }
            });
        }
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

        $scope.showVehicle();
    });
}]);
angular.bootstrap(document, [ 'alterationOrderAddOrEdit' ]);