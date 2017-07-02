var rrProblemOrderListApp = angular.module("rrProblemOrderList", []);
rrProblemOrderListApp.controller("rrProblemOrderListController", function ($scope) {
    $scope.rrProblemOrderList = {};
    $scope.rrProblemOrderList.dpcoiConfigList = [{
        "configId" : "",
        "configCodeId" : "",
        "configValue" : ""
    }];
    $scope.rrProblemOrderList.rrProblemOrderList = [{
        "problemStatus" : "",
        "problemNo" : "",
        "problemType" : "",
        "engineering" : "",
        "customer" : "",
        "vehicle" : "",
        "productNo" : "",
        "badContent" : "",
        "productLine" : "",
        "severity" : "",
        "reasonForDelay" : "",
        "speedOfProgress" : "",
        "rrProblemOrderState" : "",
        "dpcoiWoOrderType" : "",
        "rrProblemOrderId" : ""
    }];
    $scope.rrProblemOrderList.pageInfo = {"url":"/WorkFlow/rrProblemOrder/getRRProblemOrderListPage.do"};
    $scope.rrProblemOrderList.firstPage = function () {
        $scope.rrProblemOrderList.pageInfo.page = 1;
        $scope.rrProblemOrderList.Search();
    }
    $scope.rrProblemOrderList.prevPage = function () {
        $scope.rrProblemOrderList.pageInfo.page = $scope.rrProblemOrderList.pageInfo.page - 1;
        $scope.rrProblemOrderList.Search();
    }
    $scope.rrProblemOrderList.nextPage = function () {
        $scope.rrProblemOrderList.pageInfo.page = $scope.rrProblemOrderList.pageInfo.page + 1;
        $scope.rrProblemOrderList.Search();
    }
    $scope.rrProblemOrderList.lastPage = function () {
        $scope.rrProblemOrderList.pageInfo.page = $scope.rrProblemOrderList.pageInfo.totalPage;
        $scope.rrProblemOrderList.Search();
    }
    $scope.rrProblemOrderList.searchForm = {
        "badContent": "",
        "problemProgress": "",
        "speedOfProgress": ""
    }
    $scope.rrProblemOrderList.Search = function () {
        var delay = $("#delay").val();
        if(delay == "1"){
            $scope.rrProblemOrderList.searchForm.pfmeaDelay = "1";
        }else if(delay == "2"){
            $scope.rrProblemOrderList.searchForm.cpDelay = "1";
        }else if(delay == "3"){
            $scope.rrProblemOrderList.searchForm.standardBookDelay = "1";
        }
        $scope.rrProblemOrderList.searchForm.pagenum = $scope.rrProblemOrderList.pageInfo.page-1;
        $scope.rrProblemOrderList.searchForm.pageCount = 10;
        $scope.rrProblemOrderList.searchForm.size = $scope.rrProblemOrderList.searchForm.pageCount;
        $scope.rrProblemOrderList.searchForm.start = $scope.rrProblemOrderList.searchForm.pagenum * $scope.rrProblemOrderList.searchForm.size;
        $.ajax({
            method:'post',
            url:$scope.rrProblemOrderList.pageInfo.url,
            data:$scope.rrProblemOrderList.searchForm,
            success: function(resultJson) {
                var result = angular.fromJson(resultJson);
                if(result.success){
                    $scope.rrProblemOrderList.rrProblemOrderList = result.rrProblemOrderList;
                    $scope.rrProblemOrderList.pageInfo.totalCount = result.rrProblemOrderCount;
                    $scope.rrProblemOrderList.pageInfo.totalPage =  result.pageCount;
                    if($scope.rrProblemOrderList.pageInfo.page <= 1){
                        $scope.rrProblemOrderList.pageInfo.firstPageDisabled = true;
                        $scope.rrProblemOrderList.pageInfo.prevPageDisabled = true;
                    }else {
                        $scope.rrProblemOrderList.pageInfo.firstPageDisabled = false;
                        $scope.rrProblemOrderList.pageInfo.prevPageDisabled = false;
                    }
                    if($scope.rrProblemOrderList.pageInfo.page >= $scope.rrProblemOrderList.pageInfo.totalPage){
                        $scope.rrProblemOrderList.pageInfo.nextPageDisabled = true;
                        $scope.rrProblemOrderList.pageInfo.lastPageDisabled = true;
                    }else {
                        $scope.rrProblemOrderList.pageInfo.nextPageDisabled = false;
                        $scope.rrProblemOrderList.pageInfo.lastPageDisabled = false;
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

    $("#rrProblemOrderSearch").click(function () {
        $scope.rrProblemOrderList.firstPage();
    });

    $scope.rrProblemOrderList.toVoidDpcoiOrder = function (dpcoiOrderId) {
        $.ajax({
            method:'post',
            url:"/WorkFlow/dpcoiOrder/toVoidDpcoiOrder.do",
            data:{"dpcoiOrderId":dpcoiOrderId},
            success: function(resultJson) {
                var result = angular.fromJson(resultJson);
                if(result.success){
                    $scope.rrProblemOrderList.firstPage();
                }else {
                    alert(result.message);
                }
            },
            error : function() {
                alert("系统出现异常!!");
            }
        });
    }

    $(document).ready(function() {
        $.ajax({
            method: 'post',
            url: "/WorkFlow/dpcoiConfig/getDpcoiConfigList.do",
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.rrProblemOrderList.dpcoiConfigList = result.dpcoiConfigList;
                    $scope.$apply();
                }
            }
        });

        $scope.rrProblemOrderList.firstPage();

        var height = document.body.clientHeight;
        var searchTableHeight = $("#searchTable").height();
        var footTableHeight = $("#footTable").height();
        var height = height - searchTableHeight - footTableHeight - 40;
        $("#listTable").css("height", height);
    });
});

angular.bootstrap(document, [ 'rrProblemOrderList' ]);