var rrProblemListApp = angular.module("rrProblemList", []);
rrProblemListApp.controller("rrProblemListController", function ($scope) {
    $scope.rrProblemList = {};
    $scope.rrProblemList.ministerJurisdiction = ministerJurisdiction;
    $scope.rrProblemList.dpcoiConfigList = [{
        "configId" : 0,
        "configCodeId" : "",
        "configValue" : ""
    }];
    $scope.rrProblemList.rrProblemList = [{
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
        "backgroundColor":""
    }];
    $scope.rrProblemList.pageInfo = {"url":"/WorkFlow/rrProblem/getRRProblemListPage.do"};
    $scope.rrProblemList.firstPage = function () {
        $scope.rrProblemList.pageInfo.page = 1;
        $scope.rrProblemList.Search();
    }
    $scope.rrProblemList.prevPage = function () {
        $scope.rrProblemList.pageInfo.page = $scope.rrProblemList.pageInfo.page - 1;
        $scope.rrProblemList.Search();
    }
    $scope.rrProblemList.nextPage = function () {
        $scope.rrProblemList.pageInfo.page = $scope.rrProblemList.pageInfo.page + 1;
        $scope.rrProblemList.Search();
    }
    $scope.rrProblemList.lastPage = function () {
        $scope.rrProblemList.pageInfo.page = $scope.rrProblemList.pageInfo.totalPage;
        $scope.rrProblemList.Search();
    }
    $scope.rrProblemList.searchForm = {
        "badContent": "",
        "problemProgress": "",
        "speedOfProgress": ""
    }
    $scope.rrProblemList.Search = function () {
        $scope.rrProblemList.searchForm.pagenum = $scope.rrProblemList.pageInfo.page-1;
        $scope.rrProblemList.searchForm.pageCount = 10;
        $scope.rrProblemList.searchForm.size = $scope.rrProblemList.searchForm.pageCount;
        $scope.rrProblemList.searchForm.start = $scope.rrProblemList.searchForm.pagenum * $scope.rrProblemList.searchForm.size;
        $.ajax({
            method:'post',
            url:$scope.rrProblemList.pageInfo.url,
            data:$scope.rrProblemList.searchForm,
            success: function(resultJson) {
                var result = angular.fromJson(resultJson);
                if(result.success){
                    $scope.rrProblemList.rrProblemList = result.rrProblemList;
                    $scope.rrProblemList.pageInfo.totalCount = result.rrProblemCount;
                    $scope.rrProblemList.pageInfo.totalPage =  result.pageCount;
                    if($scope.rrProblemList.pageInfo.page <= 1){
                        $scope.rrProblemList.pageInfo.firstPageDisabled = true;
                        $scope.rrProblemList.pageInfo.prevPageDisabled = true;
                    }else {
                        $scope.rrProblemList.pageInfo.firstPageDisabled = false;
                        $scope.rrProblemList.pageInfo.prevPageDisabled = false;
                    }
                    if($scope.rrProblemList.pageInfo.page >= $scope.rrProblemList.pageInfo.totalPage){
                        $scope.rrProblemList.pageInfo.nextPageDisabled = true;
                        $scope.rrProblemList.pageInfo.lastPageDisabled = true;
                    }else {
                        $scope.rrProblemList.pageInfo.nextPageDisabled = false;
                        $scope.rrProblemList.pageInfo.lastPageDisabled = false;
                    }
                    for(var i = 0; i < $scope.rrProblemList.rrProblemList.length; i++){
                        var obj = $scope.rrProblemList.rrProblemList[i];
                        var speedOfProgress = obj.speedOfProgress;
                        if(speedOfProgress == undefined || speedOfProgress == null || speedOfProgress == ""){
                            $scope.rrProblemList.rrProblemList[i].backgroundColor = "";
                        }else if(speedOfProgress == "delay"){
                            var isDelay = obj.isDelay;
                            if(isDelay == undefined || isDelay == null){
                                $scope.rrProblemList.rrProblemList[i].backgroundColor = "background-color:red;";
                            }else if(isDelay == 1){
                                $scope.rrProblemList.rrProblemList[i].backgroundColor = "background-color:beige;";
                            }else {
                                $scope.rrProblemList.rrProblemList[i].backgroundColor = "background-color:red;";
                            }
                        }else if(speedOfProgress == "follow"){
                            var problemProgress = obj.problemProgress;
                            if(problemProgress == "4/4"){
                                $scope.rrProblemList.rrProblemList[i].backgroundColor = "background-color:yellow;";
                            }else {
                                $scope.rrProblemList.rrProblemList[i].backgroundColor = "";
                            }
                        }else{
                            $scope.rrProblemList.rrProblemList[i].backgroundColor = "";
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
        $scope.rrProblemList.firstPage();
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
        window.location.href = "/WorkFlow/rrProblem/getRRProblemEditDlg.do?id="+id;
    });

    $("#rrProblemDown").click(function () {
        var fileUrl = "";
        $.ajax({
            url : '/WorkFlow/rrProblem/doExportExcel.do',
            async: false,
            data : $scope.rrProblemList.searchForm,
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
        if($scope.rrProblemList.ministerJurisdiction == 0){
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
                    $scope.rrProblemList.firstPage();
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
        if($scope.rrProblemList.ministerJurisdiction == 0){
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
                    $scope.rrProblemList.firstPage();
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
                    $scope.rrProblemList.firstPage();
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
        $.ajax({
            method: 'post',
            url: "/WorkFlow/dpcoiConfig/getDpcoiConfigList.do",
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.rrProblemList.dpcoiConfigList = result.dpcoiConfigList;
                    $scope.$apply();
                }
            }
        });

        $scope.rrProblemList.firstPage();

        var height = document.body.clientHeight;
        var searchTableHeight = $("#searchTable").height();
        var footTableHeight = $("#footTable").height();
        var height = height - searchTableHeight - footTableHeight - 40;
        $("#listTable").css("height", height);
    });
});

angular.bootstrap(document, [ 'rrProblemList' ]);