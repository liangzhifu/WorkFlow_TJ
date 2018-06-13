var myModal;

updateFileExcelChange = function (fileTimeInput, fileIdInput){
    if($("#uploadFile").val()){
        $("#excelForm").ajaxSubmit({
            success:function(data){
                alert(data.message);
                $("#"+fileTimeInput).val(data.fileDate);
                $("#"+fileIdInput).val(data.fileId);
                myModal.destroy();
            }
        });
        $("#uploadFile").val('');
    }
};

updateFileExcelChange2 = function (fileIdInput){
    if($("#uploadFile").val()){
        $("#excelForm").ajaxSubmit({
            success:function(data){
                alert(data.message);
                $("#"+fileIdInput).val(data.fileDate);
                if ("standardBook" == fileIdInput) {
                    $("#alwaysList").val(data.fileDate);
                }
                myModal.destroy();
            }
        });
        $("#uploadFile").val('');
    }
};

var rrProblemEditApp = angular.module("rrProblemEdit", []);
rrProblemEditApp.controller("rrProblemEditController", function ($scope) {
    $scope.action = action;
    $scope.rrProblemEdit = {};
    $scope.dpcoiConfigVehicleList = [];
    $scope.rrProblemEdit.persionLiableList = [{
        "userId" : "",
        "userName" : ""
    }]
    $scope.rrProblemEdit.dpcoiConfigList = [{
        "configId" : "",
        "configCodeId" : "",
        "configValue" : ""
    }];
    $scope.rrProblemEdit.rrProblem = {
        "id":"",
        "problemStatus" : "",
        "problemNo" : "",
        "problemType" : "",
        "engineering" : "",
        "problemProgress" : "",
        "trackingLevel" : "",
        "happenDate" : "",
        "happenDateStr" : "",
        "customer" : "",
        "vehicle" : "",
        "productNo" : "",
        "badContent" : "",
        "persionLiable" : "",
        "reportDate" : "",
        "reportDateStr" : "",
        "speedOfProgress" : "",
        "reasonForDelay" : "",
        "firstDate" : "",
        "secondDate" : "",
        "thirdDate" : "",
        "fourthDate" : "",
        "firstDateStr" : "",
        "secondDateStr" : "",
        "thirdDateStr" : "",
        "fourthDateStr" : "",
        "closeConfirm" : "",
        "productLine" : "",
        "severity" : "",
        "occurrenceFrequency" : "",
        "badQuantity" : "",
        "batch" : "",
        "happenShift" : "白班",
        "responsibleDepartment" : "",
        "recordPpm" : "",
        "recordNum" : "N/A",
        "temporary" : "",
        "rootCause" : "",
        "permanentGame" : "",
        "effectVerification" : "",
        "qualityWarningCardNumberFileId" : "",
        "qualityWarningCardNumber" : "N/A",
        "pfmea" : "",
        "cp" : "",
        "standardBook" : "",
        "alwaysList" : "",
        "inspectionReferenceBookFileId" : "",
        "inspectionReferenceBook" : "",
        "inspectionBookFileId" : "",
        "inspectionBook" : "",
        "containmentWorksheetFileId" : "",
        "containmentWorksheet" : "",
        "expandTrace" : "N/A",
        "artificial" : "N/A",
        "materiel" : "N/A",
        "analyticReport" : "",
        "layeredAudit" : "",
        "checkResult" : "",
        "naPending" : "",
        "otherInformation" : "",
        "analyticReportFileId" : "",
        "layeredAuditFileId" : "",
        "checkResultFileId" : "",
        "naPendingFileId" : "",
        "otherInformationFileId" : "",
        "firstDelay" : "0",
        "secondDelay" : "0",
        "thirdDelay" : "0",
        "fourthDelay" : "0",
        "delayLevel" : "0",
        "isDelay" : "0",
        "delayApplication" : "0"
    };

    $scope.validData = function(){
        var flag = true;
        if(!$.html5Validate.isAllpass($("#problemStatus"))){//状态
            return false;
        }
        if(!$.html5Validate.isAllpass($("#problemType"))){//问题类型
            return false;
        }
        if(!$.html5Validate.isAllpass($("#engineering"))){//工程
            return false;
        }
        if(!$.html5Validate.isAllpass($("#problemProgress"))){//问题进展
            return false;
        }
        if(!$.html5Validate.isAllpass($("#happenDate"))){//发生日期
            return false;
        }
        if(!$.html5Validate.isAllpass($("#vehicle"))){//车型
            return false;
        }
        if(!$.html5Validate.isAllpass($("#productNo"))){//品名
            return false;
        }
        if(!$.html5Validate.isAllpass($("#badContent"))){//不良内容
            return false;
        }
        if(!$.html5Validate.isAllpass($("#reportDate"))){//下次汇报时间
            return false;
        }
        var trackingLevel = $("#trackingLevel").val();
        if(!(trackingLevel == undefined || trackingLevel == null || trackingLevel == ""|| trackingLevel == "V")){
            if(!$.html5Validate.isAllpass($("#reasonForDelay"))){//延期原因及进展
                return false;
            }
        }
        if(!$.html5Validate.isAllpass($("#productLine"))){//生产线
            return false;
        }
        if(!$.html5Validate.isAllpass($("#severity"))){//严重度
            return false;
        }
        if(!$.html5Validate.isAllpass($("#occurrenceFrequency"))){//occurrenceFrequency
            return false;
        }
        if(!$.html5Validate.isAllpass($("#badQuantity"))){//不良数量
            return false;
        }
        if(!$.html5Validate.isAllpass($("#batch"))){//批次
            return false;
        }
        if(!$.html5Validate.isAllpass($("#happenShift"))){//发生班次
            return false;
        }
        if(!$.html5Validate.isAllpass($("#responsibleDepartment"))){//责任部门
            return false;
        }
        if(!$.html5Validate.isAllpass($("#recordPpm"))){//客户是否记录PPM
            return false;
        }
        if(!$.html5Validate.isAllpass($("#recordNum"))){//记录数量
            return false;
        }
        return flag;
    };

    $("#rrProblemEditConfirm").click(function () {
        var flag = $scope.validData();
        if(!flag){
            return ;
        }

        var url = "/WorkFlow/rrProblem/updateRRProblem2.do";
        $scope.rrProblemEdit.rrProblem.persionLiable = $("#persionLiable").val();
        $scope.rrProblemEdit.rrProblem.dpcoi4M = $("#dpcoi4M").val();
        $scope.rrProblemEdit.rrProblem.vehicle = $("#vehicle").val();
        $scope.rrProblemEdit.rrProblem.productNo = $("#productNo").val();
        $scope.rrProblemEdit.rrProblem.happenDate = $("#happenDate").val();
        $scope.rrProblemEdit.rrProblem.reportDate = $("#reportDate").val();
        $scope.rrProblemEdit.rrProblem.alwaysList = $("#alwaysList").val();
        $scope.rrProblemEdit.rrProblem.inspectionReferenceBook = $("#inspectionReferenceBook").val();
        $scope.rrProblemEdit.rrProblem.inspectionBook = $("#inspectionBook").val();
        $scope.rrProblemEdit.rrProblem.containmentWorksheet = $("#containmentWorksheet").val();
        $scope.rrProblemEdit.rrProblem.firstDate = $("#firstDate").val();
        $scope.rrProblemEdit.rrProblem.secondDate = $("#secondDate").val();
        $scope.rrProblemEdit.rrProblem.thirdDate = $("#thirdDate").val();
        $scope.rrProblemEdit.rrProblem.fourthDate = $("#fourthDate").val();
        $scope.rrProblemEdit.rrProblem.closeConfirmTime = "";
        $scope.rrProblemEdit.rrProblem.badContent = $("#badContent").val();
        $scope.rrProblemEdit.rrProblem.reasonForDelay = $("#reasonForDelay").val();
        $scope.rrProblemEdit.rrProblem.temporary = $("#temporary").val();
        $scope.rrProblemEdit.rrProblem.rootCause = $("#rootCause").val();
        $scope.rrProblemEdit.rrProblem.permanentGame = $("#permanentGame").val();
        $scope.rrProblemEdit.rrProblem.effectVerification = $("#effectVerification").val();
        $scope.rrProblemEdit.rrProblem.productLine = $("#productLine").val().toUpperCase();

        $scope.rrProblemEdit.rrProblem.serialNumber = "N/A";
        $scope.rrProblemEdit.rrProblem.productScale = "N/A";
        $scope.rrProblemEdit.rrProblem.changePoint = "N/A";
        $scope.rrProblemEdit.rrProblem.equipmentChecklist = "N/A";
        $scope.rrProblemEdit.rrProblem.inspectionBook = "N/A";
        $scope.rrProblemEdit.rrProblem.education = "N/A";

        $scope.rrProblemEdit.rrProblem.qualityWarningCardNumber = $("#qualityWarningCardNumber").val();
        $scope.rrProblemEdit.rrProblem.qualityWarningCardNumberFileId = $("#qualityWarningCardNumberFileId").val();
        $scope.rrProblemEdit.rrProblem.inspectionReferenceBook = $("#inspectionReferenceBook").val();
        $scope.rrProblemEdit.rrProblem.inspectionReferenceBookFileId = $("#inspectionReferenceBookFileId").val();
        $scope.rrProblemEdit.rrProblem.containmentWorksheet = $("#containmentWorksheet").val();
        $scope.rrProblemEdit.rrProblem.containmentWorksheetFileId = $("#containmentWorksheetFileId").val();
        $scope.rrProblemEdit.rrProblem.analyticReport = $("#analyticReport").val();
        $scope.rrProblemEdit.rrProblem.analyticReportFileId = $("#analyticReportFileId").val();
        $scope.rrProblemEdit.rrProblem.layeredAudit = $("#layeredAudit").val();
        $scope.rrProblemEdit.rrProblem.layeredAuditFileId = $("#layeredAuditFileId").val();
        $scope.rrProblemEdit.rrProblem.checkResult = $("#checkResult").val();
        $scope.rrProblemEdit.rrProblem.checkResultFileId = $("#checkResultFileId").val();
        $scope.rrProblemEdit.rrProblem.naPending = $("#naPending").val();
        $scope.rrProblemEdit.rrProblem.naPendingFileId = $("#naPendingFileId").val();
        $scope.rrProblemEdit.rrProblem.otherInformation = $("#otherInformation").val();
        $scope.rrProblemEdit.rrProblem.otherInformationFileId = $("#otherInformationFileId").val();

        $scope.rrProblemEdit.rrProblem.pfmea = $("#pfmea").val();
        $scope.rrProblemEdit.rrProblem.cp = $("#cp").val();
        $scope.rrProblemEdit.rrProblem.standardBook = $("#standardBook").val();
        $scope.rrProblemEdit.rrProblem.alwaysList = $("#alwaysList").val();

        $.ajax({
            method:'post',
            url:url,
            data:$scope.rrProblemEdit.rrProblem,
            success: function(resultJson) {
                var result = angular.fromJson(resultJson);
                if(result.success){
                    var message = result.message;
                    if(!(message == undefined || message == null || message == "")){
                        alert(result.message);
                    }
                    window.location.href = "/WorkFlow/rrProblem/getRRProblemListDlg2.do";
                }else {
                    alert(result.message);
                }
            },
            error : function() {
                alert("系统出现异常!!");
            }
        });
    });

    $("#rrProblemDelayConfirm").click(function () {
        if($scope.rrProblemEdit.rrProblem.isDelay == "1"){
            alert("已延期，不能再次延期申请！");
            return ;
        }
        var flag = $scope.validData();
        if(!flag){
            return ;
        }

        var url = "/WorkFlow/rrProblem/updateDelayRRProblem.do";
        $scope.rrProblemEdit.rrProblem.persionLiable = $("#persionLiable").val();
        $scope.rrProblemEdit.rrProblem.dpcoi4M = $("#dpcoi4M").val();
        $scope.rrProblemEdit.rrProblem.vehicle = $("#vehicle").val();
        $scope.rrProblemEdit.rrProblem.productNo = $("#productNo").val();
        $scope.rrProblemEdit.rrProblem.happenDate = $("#happenDate").val();
        $scope.rrProblemEdit.rrProblem.reportDate = $("#reportDate").val();
        $scope.rrProblemEdit.rrProblem.alwaysList = $("#alwaysList").val();
        $scope.rrProblemEdit.rrProblem.inspectionReferenceBook = $("#inspectionReferenceBook").val();
        $scope.rrProblemEdit.rrProblem.containmentWorksheet = $("#containmentWorksheet").val();
        $scope.rrProblemEdit.rrProblem.firstDate = $("#firstDate").val();
        $scope.rrProblemEdit.rrProblem.secondDate = $("#secondDate").val();
        $scope.rrProblemEdit.rrProblem.thirdDate = $("#thirdDate").val();
        $scope.rrProblemEdit.rrProblem.fourthDate = $("#fourthDate").val();
        $scope.rrProblemEdit.rrProblem.closeConfirmTime = "";
        $scope.rrProblemEdit.rrProblem.badContent = $("#badContent").val();
        $scope.rrProblemEdit.rrProblem.reasonForDelay = $("#reasonForDelay").val();
        $scope.rrProblemEdit.rrProblem.temporary = $("#temporary").val();
        $scope.rrProblemEdit.rrProblem.rootCause = $("#rootCause").val();
        $scope.rrProblemEdit.rrProblem.permanentGame = $("#permanentGame").val();
        $scope.rrProblemEdit.rrProblem.effectVerification = $("#effectVerification").val();
        $scope.rrProblemEdit.rrProblem.productLine = $("#productLine").val().toUpperCase();

        $scope.rrProblemEdit.rrProblem.serialNumber = "N/A";
        $scope.rrProblemEdit.rrProblem.productScale = "N/A";
        $scope.rrProblemEdit.rrProblem.changePoint = "N/A";
        $scope.rrProblemEdit.rrProblem.equipmentChecklist = "N/A";
        $scope.rrProblemEdit.rrProblem.inspectionBook = "N/A";
        $scope.rrProblemEdit.rrProblem.education = "N/A";

        $scope.rrProblemEdit.rrProblem.qualityWarningCardNumber = $("#qualityWarningCardNumber").val();
        $scope.rrProblemEdit.rrProblem.qualityWarningCardNumberFileId = $("#qualityWarningCardNumberFileId").val();
        $scope.rrProblemEdit.rrProblem.inspectionReferenceBook = $("#inspectionReferenceBook").val();
        $scope.rrProblemEdit.rrProblem.inspectionReferenceBookFileId = $("#inspectionReferenceBookFileId").val();
        $scope.rrProblemEdit.rrProblem.containmentWorksheet = $("#containmentWorksheet").val();
        $scope.rrProblemEdit.rrProblem.containmentWorksheetFileId = $("#containmentWorksheetFileId").val();
        $scope.rrProblemEdit.rrProblem.analyticReport = $("#analyticReport").val();
        $scope.rrProblemEdit.rrProblem.analyticReportFileId = $("#analyticReportFileId").val();
        $scope.rrProblemEdit.rrProblem.layeredAudit = $("#layeredAudit").val();
        $scope.rrProblemEdit.rrProblem.layeredAuditFileId = $("#layeredAuditFileId").val();
        $scope.rrProblemEdit.rrProblem.checkResult = $("#checkResult").val();
        $scope.rrProblemEdit.rrProblem.checkResultFileId = $("#checkResultFileId").val();
        $scope.rrProblemEdit.rrProblem.naPending = $("#naPending").val();
        $scope.rrProblemEdit.rrProblem.naPendingFileId = $("#naPendingFileId").val();
        $scope.rrProblemEdit.rrProblem.otherInformation = $("#otherInformation").val();
        $scope.rrProblemEdit.rrProblem.otherInformationFileId = $("#otherInformationFileId").val();

        $scope.rrProblemEdit.rrProblem.pfmea = $("#pfmea").val();
        $scope.rrProblemEdit.rrProblem.cp = $("#cp").val();
        $scope.rrProblemEdit.rrProblem.standardBook = $("#standardBook").val();
        $scope.rrProblemEdit.rrProblem.alwaysList = $("#alwaysList").val();

        $.ajax({
            method:'post',
            url:url,
            data:$scope.rrProblemEdit.rrProblem,
            success: function(resultJson) {
                var result = angular.fromJson(resultJson);
                if(result.success){
                    window.location.href = "/WorkFlow/rrProblem/getRRProblemListDlg2.do";
                }else {
                    alert(result.message);
                }
            },
            error : function() {
                alert("系统出现异常!!");
            }
        });
    });

    $("#rrProblemEditCancle").click(function () {
        window.location.href = "/WorkFlow/rrProblem/getRRProblemListDlg2.do";
    });

    $scope.editInput = function(id){
        $("#inputModal").modal("show");
        $("#textAreaId").val(id);
        $("#inputText").val($("#"+id).val());
        $('#inputText').foucs();
    };

    $scope.completTextArea = function () {
        var id = $("#textAreaId").val();
        $("#"+id).val($("#inputText").val());
        $("#inputModal").modal("hide");
        $('#inputText').blur();
    };

    $scope.uploadFile = function (fileTimeInput, fileIdInput) {
        var path=$("#path").val();
        var html="<form method='post' id='excelForm' enctype='multipart/form-data' action='/WorkFlow/rrProblem/uploadFile.do'>"+
            "<a class='uploadFile button button-primary button-rounded button-small' href='#'>" +
            "<input type='file' onchange='updateFileExcelChange(\""+fileTimeInput+"\",\""+fileIdInput+"\")' name='uploadFile' id='uploadFile'/><i class='glyphicon glyphicon-search'></i>浏览" +
            "</a>"+
            "<input type='hidden' name='rrProblemId' value='"+rrProblemId+"'/>"+
            "<input type='hidden' name='fileAttr' value='"+fileTimeInput+"'/>"+
            "</form>";
        myModal = new jBox('Modal', {
            width: 150,
            title: '上传文件',
            content: html,
            onCloseComplete:function(){
                myModal.destroy();
            }
        }).open();
    };

    $scope.uploadFile2 = function (fileIdInput) {
        var path=$("#path").val();
        var html="<form method='post' id='excelForm' enctype='multipart/form-data' action='/WorkFlow/rrProblem/uploadFile2.do'>"+
            "<a class='uploadFile button button-primary button-rounded button-small' href='#'>" +
            "<input type='file' onchange='updateFileExcelChange2(\""+fileIdInput+"\")' name='uploadFile' id='uploadFile'/><i class='glyphicon glyphicon-search'></i>浏览" +
            "</a>"+
            "<input type='hidden' name='rrProblemId' value='"+rrProblemId+"'/>"+
            "<input type='hidden' name='fileAttr' value='"+fileIdInput+"'/>"+
            "</form>";
        myModal = new jBox('Modal', {
            width: 150,
            title: '上传文件',
            content: html,
            onCloseComplete:function(){
                myModal.destroy();
            }
        }).open();
    };

    $scope.problemTypeChange = function () {
        var problemType = $("#problemType").val();
        if(problemType == "部品"){
            $scope.rrProblemEdit.rrProblem.qualityWarningCardNumber = "N/A";
            $scope.rrProblemEdit.rrProblem.pfmea = "N/A";
            $scope.rrProblemEdit.rrProblem.cp = "N/A";
            $scope.rrProblemEdit.rrProblem.standardBook = "N/A";
            $scope.rrProblemEdit.rrProblem.alwaysList = "N/A";
            $scope.rrProblemEdit.rrProblem.inspectionReferenceBook = "N/A";
            $scope.rrProblemEdit.rrProblem.containmentWorksheet = "N/A";
            $scope.rrProblemEdit.rrProblem.analyticReport = "N/A";
            $scope.rrProblemEdit.rrProblem.layeredAudit = "N/A";
            $scope.rrProblemEdit.rrProblem.checkResult = "N/A";
            $scope.rrProblemEdit.rrProblem.naPending = "N/A";
            $scope.rrProblemEdit.rrProblem.otherInformation = "N/A";
            $scope.$apply();
        }else {
            $scope.rrProblemEdit.rrProblem.qualityWarningCardNumber = "";
            $scope.rrProblemEdit.rrProblem.pfmea = "";
            $scope.rrProblemEdit.rrProblem.cp = "";
            $scope.rrProblemEdit.rrProblem.standardBook = "";
            $scope.rrProblemEdit.rrProblem.alwaysList = "";
            $scope.rrProblemEdit.rrProblem.inspectionReferenceBook = "";
            $scope.rrProblemEdit.rrProblem.containmentWorksheet = "";
            $scope.rrProblemEdit.rrProblem.analyticReport = "";
            $scope.rrProblemEdit.rrProblem.layeredAudit = "";
            $scope.rrProblemEdit.rrProblem.checkResult = "";
            $scope.rrProblemEdit.rrProblem.naPending = "";
            $scope.rrProblemEdit.rrProblem.otherInformation = "";
            $scope.$apply();
        }
    };

    $("#happenDate").on('change', function(e, params) {
        var happenDate = $("#happenDate").val();
        if(happenDate == null || happenDate == ""){
            $("#firstDate").val("");
            $("#secondDate").val("");
            $("#thirdDate").val("");
            $("#fourthDate").val("");
        }else {
            $.ajax({
                method: 'post',
                url: "/WorkFlow/rrProblem/getFourDate.do?happenDate=" + happenDate,
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        $("#firstDate").val(result.firstDate);
                        $("#secondDate").val(result.secondDate);
                        $("#thirdDate").val(result.thirdDate);
                        $("#fourthDate").val(result.fourthDate);
                    }
                }
            });
        }
    });

    $("#vehicle").on('change', function(e, params) {
        for(var i = 0; i < $scope.dpcoiConfigVehicleList.length; i ++){
            if($scope.dpcoiConfigVehicleList[i].value == $("#vehicle").val()){
                $scope.rrProblemEdit.rrProblem.customer = $scope.dpcoiConfigVehicleList[i].configValue;
                $scope.$apply();
            }
        }
    });

    $(document).ready(function() {

        $("input[data-type='dateType1']").each(function () {
            $(this).datetimepicker({
                timepicker: false,
                format: 'Y-m-d'
            });
        });

        $("input[data-type='dateType2']").each(function () {
            $(this).datetimepicker({
                timepicker: false,
                minDate : endDate,
                format: 'Y-m-d'
            });
        });

        $("input[data-type='dateType3']").each(function () {
            $(this).datetimepicker({
                timepicker: false,
                scrollMonth:false,
                showApplyButton: true,
                prevButton : true,
                applyButtonName:'N/A',
                format: 'Y-m-d'
            });
        });

        $.ajax({
            method: 'post',
            url: "/WorkFlow/dpcoiConfig/getDpcoiConfigList.do",
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.rrProblemEdit.dpcoiConfigList = result.dpcoiConfigList;
                    $scope.$apply();
                    $.ajax({
                        method: 'post',
                        url: "/WorkFlow/rrProblem/getRRProblem.do?id="+rrProblemId,
                        success: function (resultJson) {
                            var result = angular.fromJson(resultJson);
                            if (result.success) {
                                $scope.rrProblemEdit.rrProblem = result.rrProblem;
                                $scope.$apply();
                            }
                        }
                    });
                }
            }
        });
    });
});

rrProblemEditApp.filter('myFilter', function() {
    return function(inputArray, configCodeId) {
        var array = [];
        for(var i = 0; i < inputArray.length ; i++){
            var obj = inputArray[i];
            var id = obj.configCodeId;
            if(id == configCodeId){
                array.push(obj);
            }
        }
        return array;
    };
});

angular.bootstrap(document, [ 'rrProblemEdit' ]);