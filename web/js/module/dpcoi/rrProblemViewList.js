var rrProblemViewListApp = angular.module("rrProblemViewList", []);
rrProblemViewListApp.controller("rrProblemViewListController", function ($scope) {
    $scope.rrProblemViewList = {};
    $scope.rrProblemViewList.ministerJurisdiction = ministerJurisdiction;
    $scope.rrProblemViewList.dpcoiConfigList = [{
        "configId" : 0,
        "configCodeId" : "",
        "configValue" : ""
    }];
    $scope.rrProblemViewList.rrProblemViewList = [{
        "id":"",
        "problemStatus" : "",
        "problemNo" : "",
        "problemType" : "",
        "engineering" : "",
        "problemProgress" : "",
        "trackingLevel" : "",
        "happenDate" : "",
        "customer" : "",
        "vehicle" : "",
        "productNo" : "",
        "badContent" : "",
        "persionLiable" : "",
        "reportDate" : "",
        "speedOfProgress" : "",
        "reasonForDelay" : "",
        "firstDate" : "",
        "secondDate" : "",
        "thirdDate" : "",
        "fourthDate" : "",
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
        "serialNumber" : "N/A",
        "qualityWarningCardNumber" : "N/A",
        "productScale" : "N/A",
        "pfmea" : "",
        "cp" : "",
        "standardBook" : "",
        "equipmentChecklist" : "",
        "alwaysList" : "",
        "inspectionReferenceBook" : "",
        "inspectionBook" : "",
        "education" : "",
        "changePoint" : "",
        "expandTrace" : "N/A",
        "artificial" : "N/A",
        "materiel" : "N/A",
        "state" : "",
        "isDelay": "",
        isRed:false,
        isGoldenRod:false,
        isYellow:false,
        isDeepSkyBlue:false
    }];
    $scope.rrProblemViewList.pageInfo = {"url":"/WorkFlow/rrProblem/getRRProblemListPage.do"};
    $scope.rrProblemViewList.firstPage = function () {
        $scope.rrProblemViewList.pageInfo.page = 1;
        $scope.rrProblemViewList.Search();
    }
    $scope.rrProblemViewList.prevPage = function () {
        $scope.rrProblemViewList.pageInfo.page = $scope.rrProblemViewList.pageInfo.page - 1;
        $scope.rrProblemViewList.Search();
    }
    $scope.rrProblemViewList.nextPage = function () {
        $scope.rrProblemViewList.pageInfo.page = $scope.rrProblemViewList.pageInfo.page + 1;
        $scope.rrProblemViewList.Search();
    }
    $scope.rrProblemViewList.lastPage = function () {
        $scope.rrProblemViewList.pageInfo.page = $scope.rrProblemViewList.pageInfo.totalPage;
        $scope.rrProblemViewList.Search();
    }
    $scope.rrProblemViewList.searchForm = {
        "badContent": "",
        "problemProgress": "",
        "speedOfProgress": "",
        "problemStatus" : "",
        "problemType" : "",
        "engineering" : "",
        "customer" : "",
        "vehicle" : "",
        "productNo" : "",
        "happenDateBegin" : "",
        "happenDateEnd" : "",
        "persionLiable" : "",
        "productLine" : "",
        "severity" : "",
        "responsibleDepartment" : "",
        "ids":""
    }
    $scope.rrProblemViewList.Search = function () {
        $scope.rrProblemViewList.searchForm.speedOfProgress = $("#speedOfProgress").multiselect("MyValues");
        $scope.rrProblemViewList.searchForm.happenDateBegin = $("#happenDateBegin").val();
        $scope.rrProblemViewList.searchForm.happenDateEnd = $("#happenDateEnd").val();
        $scope.rrProblemViewList.searchForm.pagenum = $scope.rrProblemViewList.pageInfo.page-1;
        $scope.rrProblemViewList.searchForm.pageCount = 10;
        $scope.rrProblemViewList.searchForm.size = $scope.rrProblemViewList.searchForm.pageCount;
        $scope.rrProblemViewList.searchForm.start = $scope.rrProblemViewList.searchForm.pagenum * $scope.rrProblemViewList.searchForm.size;
        $.ajax({
            method:'post',
            url:$scope.rrProblemViewList.pageInfo.url,
            data:$scope.rrProblemViewList.searchForm,
            success: function(resultJson) {
                var result = angular.fromJson(resultJson);
                if(result.success){
                    $scope.rrProblemViewList.rrProblemViewList = result.rrProblemList;
                    $scope.rrProblemViewList.pageInfo.totalCount = result.rrProblemCount;
                    $scope.rrProblemViewList.pageInfo.totalPage =  result.pageCount;
                    if($scope.rrProblemViewList.pageInfo.page <= 1){
                        $scope.rrProblemViewList.pageInfo.firstPageDisabled = true;
                        $scope.rrProblemViewList.pageInfo.prevPageDisabled = true;
                    }else {
                        $scope.rrProblemViewList.pageInfo.firstPageDisabled = false;
                        $scope.rrProblemViewList.pageInfo.prevPageDisabled = false;
                    }
                    if($scope.rrProblemViewList.pageInfo.page >= $scope.rrProblemViewList.pageInfo.totalPage){
                        $scope.rrProblemViewList.pageInfo.nextPageDisabled = true;
                        $scope.rrProblemViewList.pageInfo.lastPageDisabled = true;
                    }else {
                        $scope.rrProblemViewList.pageInfo.nextPageDisabled = false;
                        $scope.rrProblemViewList.pageInfo.lastPageDisabled = false;
                    }
                    for(var i = 0; i < $scope.rrProblemViewList.rrProblemViewList.length; i++){
                        $scope.rrProblemViewList.rrProblemViewList[i].isRed=false;
                        $scope.rrProblemViewList.rrProblemViewList[i].isGoldenRod=false;
                        $scope.rrProblemViewList.rrProblemViewList[i].isYellow=false;
                        var obj = $scope.rrProblemViewList.rrProblemViewList[i];
                        var speedOfProgress = obj.speedOfProgress;
                        if(speedOfProgress == undefined || speedOfProgress == null || speedOfProgress == ""){

                        }else if(speedOfProgress == "delayI"){
                            var isDelay = obj.isDelay;
                            if(isDelay == undefined || isDelay == null){
                                $scope.rrProblemViewList.rrProblemViewList[i].isRed = true;
                            }else if(isDelay == 1){
                                $scope.rrProblemViewList.rrProblemViewList[i].isDeepSkyBlue = true;
                            }else {
                                $scope.rrProblemViewList.rrProblemViewList[i].isRed = true;
                            }
                        }else if(speedOfProgress == "delayII"){
                            var isDelay = obj.isDelay;
                            if(isDelay == undefined || isDelay == null){
                                $scope.rrProblemViewList.rrProblemViewList[i].isRed = true;
                            }else if(isDelay == 1){
                                $scope.rrProblemViewList.rrProblemViewList[i].isDeepSkyBlue = true;
                            }else {
                                $scope.rrProblemViewList.rrProblemViewList[i].isRed = true;
                            }
                        }else if(speedOfProgress == "delayIII"){
                            var isDelay = obj.isDelay;
                            if(isDelay == undefined || isDelay == null){
                                $scope.rrProblemViewList.rrProblemViewList[i].isGoldenRod = true;
                            }else if(isDelay == 1){
                                $scope.rrProblemViewList.rrProblemViewList[i].isDeepSkyBlue = true;
                            }else {
                                $scope.rrProblemViewList.rrProblemViewList[i].isGoldenRod = true;
                            }
                        }else if(speedOfProgress == "delayIV"){
                            var isDelay = obj.isDelay;
                            if(isDelay == undefined || isDelay == null){
                                $scope.rrProblemViewList.rrProblemViewList[i].isYellow = true;
                            }else if(isDelay == 1){
                                $scope.rrProblemViewList.rrProblemViewList[i].isDeepSkyBlue = true;
                            }else {
                                $scope.rrProblemViewList.rrProblemViewList[i].isYellow = true;
                            }
                        }else{
                        }
                    }
                    $scope.$apply();
                }else {
                    alert(result.message);
                }
            },
            error : function() {
                alert("系统出现异常!!");
            }
        });
    };

    $("#rrProblemSearch").click(function () {
        $scope.rrProblemViewList.firstPage();
    });

    $("#rrProblemAdd").click(function () {
        window.location.href = "/WorkFlow/rrProblem/getRRProblemAddDlg.do";
    });

    $("#rrProblemEdit").click(function () {
        var length = $("input[name='checkbox_records']:checked").length;
        if(length == 0 || length > 1){
            alert("请选择一条RR问题点！");
            return ;
        }
        var id;
        $("input[name='checkbox_records']:checked").each(function () {
            id = $(this).val();
        });
        var rrProblem = null;
        for(var i = 0; i < $scope.rrProblemViewList.rrProblemViewList.length; i++){
            var obj = $scope.rrProblemViewList.rrProblemViewList[i];
            var rrProblemId = obj.id;
            if(id == rrProblemId){
                rrProblem = obj;
            }
        }
        if(rrProblem != null){
            var state = rrProblem.state;
            if(state == 2){
                if($scope.rrProblemViewList.ministerJurisdiction != 1){
                    alert("已关闭，不能修改！");
                    return;
                }
            }else if(state == 3){
                alert("已作废，不能修改！");
                return;
            }
        }
        window.location.href = "/WorkFlow/rrProblem/getRRProblemEditDlg.do?id="+id;
    });

    $("#rrProblemDown").click(function () {
        var ids = "";
        $("input[name='checkbox_records']:checked").each(function () {
            ids += "," + $(this).val();
        });
        if(ids != "") ids = ids.substring(1);
        $scope.rrProblemViewList.searchForm.ids = ids;
        var fileUrl = "";
        $.ajax({
            url : '/WorkFlow/rrProblem/doExportExcel.do',
            async: false,
            data : $scope.rrProblemViewList.searchForm,
            method: "post",
            success : function(resultJson) {
                var obj =  angular.fromJson(resultJson);
                if(obj.success){
                    fileUrl = '/WorkFlow' + obj.path;
                }else {
                    alert(obj.message);
                    return;
                }
            },
            failure : function() {
                alert('导出Excel失败！');
                return;
            }
        });
        if(fileUrl != ""){
            window.open(fileUrl);
        }
    });

    $("#rrProblemClose").click(function () {
        if($scope.rrProblemViewList.ministerJurisdiction == 0){
            alert("你没有部长权限！");
            return;
        }
        var length = $("input[name='checkbox_records']:checked").length;
        if(length == 0 || length > 1){
            alert("请选择一条RR问题点！");
            return ;
        }
        var id;
        $("input[name='checkbox_records']:checked").each(function () {
            id = $(this).val();
        });
        $.ajax({
            url : '/WorkFlow/rrProblem/closeRRProblem.do?id='+id,
            method: "post",
            success : function(resultJson) {
                var obj =  angular.fromJson(resultJson);
                if(obj.success){
                    $scope.rrProblemViewList.firstPage();
                }else {
                    alert(obj.message);
                    return;
                }
            },
            failure : function() {
                alert('失败！');
                return;
            }
        });
    });

    $("#rrProblemDelay").click(function () {
        if($scope.rrProblemViewList.ministerJurisdiction == 0){
            alert("你没有部长权限！");
            return;
        }
        var length = $("input[name='checkbox_records']:checked").length;
        if(length == 0 || length > 1){
            alert("请选择一条RR问题点！");
            return ;
        }
        var id;
        $("input[name='checkbox_records']:checked").each(function () {
            id = $(this).val();
        });
        $.ajax({
            url : '/WorkFlow/rrProblem/delayRRProblem.do?id='+id,
            method: "post",
            success : function(resultJson) {
                var obj =  angular.fromJson(resultJson);
                if(obj.success){
                    $scope.rrProblemViewList.firstPage();
                }else {
                    alert(obj.message);
                    return;
                }
            },
            failure : function() {
                alert('失败！');
                return;
            }
        });
    });

    $("#rrProblemToVoid").click(function () {
        var length = $("input[name='checkbox_records']:checked").length;
        if(length == 0 || length > 1){
            alert("请选择一条RR问题点！");
            return ;
        }
        var id;
        $("input[name='checkbox_records']:checked").each(function () {
            id = $(this).val();
        });
        $.ajax({
            url : '/WorkFlow/rrProblem/toVoidRRProblem.do?id='+id,
            method: "post",
            success : function(resultJson) {
                var obj =  angular.fromJson(resultJson);
                if(obj.success){
                    $scope.rrProblemViewList.firstPage();
                }else {
                    alert(obj.message);
                    return;
                }
            },
            failure : function() {
                alert('失败！');
                return;
            }
        });
    });

    $(document).ready(function() {
        $("input[data-type='date']").each(function () {
            $(this).datetimepicker({
                timepicker: false,
                format: 'Y-m-d'
            });
        });

        $("#speedOfProgress").multiselect({
            checkAllText: "全选",
            uncheckAllText: '全不选',
            header: false,
            selectedList:4
        });

        $.ajax({
            method: 'post',
            url: "/WorkFlow/dpcoiConfig/getDpcoiConfigList.do",
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.rrProblemViewList.dpcoiConfigList = result.dpcoiConfigList;
                    $scope.$apply();
                }
            }
        });

        $scope.rrProblemViewList.firstPage();

        var height = document.body.clientHeight;
        var searchTableHeight = $("#searchTable").height();
        var footTableHeight = $("#footTable").height();
        var height = height - searchTableHeight - footTableHeight - 40;
        $("#listTable").css("height", height);
    });
});

rrProblemViewListApp.filter('myFilter', function() {
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

angular.bootstrap(document, [ 'rrProblemViewList' ]);