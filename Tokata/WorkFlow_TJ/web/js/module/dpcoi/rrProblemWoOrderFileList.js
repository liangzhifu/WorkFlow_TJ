var rrProblemWoOrderFileListApp = angular.module("rrProblemWoOrderFileList", []);
rrProblemWoOrderFileListApp.controller("rrProblemWoOrderFileListController", function ($scope) {
    $scope.rrProblemWoOrderFileList = {};
    $scope.rrProblemWoOrderFileList.rrProblemWoOrderFileList = [{
        "dpcoiOrderId" : "",
        "dpcoiOrderState" : "",
        "dpcoiWoOrderId" : "",
        "dpcoiWoOrderType" : "",
        "dpcoiWoOrderState" : "",
        "taskOrderNo" : "",
        "fileId" : "",
        "fileName" : "",
        "fileType" : "",
        "fileAlias" : "",
        "excelPdfName" : ""
    }];
    $scope.rrProblemWoOrderFileList.pageInfo = {"url":"/WorkFlow/rrProblemWoOrderFile/getRRProblemWoOrderFileListPage.do"};
    $scope.rrProblemWoOrderFileList.firstPage = function () {
        $scope.rrProblemWoOrderFileList.pageInfo.page = 1;
        $scope.rrProblemWoOrderFileList.Search();
    }
    $scope.rrProblemWoOrderFileList.prevPage = function () {
        $scope.rrProblemWoOrderFileList.pageInfo.page = $scope.rrProblemWoOrderFileList.pageInfo.page - 1;
        $scope.rrProblemWoOrderFileList.Search();
    }
    $scope.rrProblemWoOrderFileList.nextPage = function () {
        $scope.rrProblemWoOrderFileList.pageInfo.page = $scope.rrProblemWoOrderFileList.pageInfo.page + 1;
        $scope.rrProblemWoOrderFileList.Search();
    }
    $scope.rrProblemWoOrderFileList.lastPage = function () {
        $scope.rrProblemWoOrderFileList.pageInfo.page = $scope.rrProblemWoOrderFileList.pageInfo.totalPage;
        $scope.rrProblemWoOrderFileList.Search();
    }
    $scope.rrProblemWoOrderFileList.searchForm = {
        "badContent": "",
        "problemProgress": "",
        "speedOfProgress": ""
    }
    $scope.rrProblemWoOrderFileList.Search = function () {
        $scope.rrProblemWoOrderFileList.searchForm.pagenum = $scope.rrProblemWoOrderFileList.pageInfo.page-1;
        $scope.rrProblemWoOrderFileList.searchForm.pageCount = 10;
        $scope.rrProblemWoOrderFileList.searchForm.size = $scope.rrProblemWoOrderFileList.searchForm.pageCount;
        $scope.rrProblemWoOrderFileList.searchForm.start = $scope.rrProblemWoOrderFileList.searchForm.pagenum * $scope.rrProblemWoOrderFileList.searchForm.size;
        $.ajax({
            method:'post',
            url:$scope.rrProblemWoOrderFileList.pageInfo.url,
            data:$scope.rrProblemWoOrderFileList.searchForm,
            success: function(resultJson) {
                var result = angular.fromJson(resultJson);
                if(result.success){
                    $scope.rrProblemWoOrderFileList.rrProblemWoOrderFileList = result.rrProblemWoOrderFileList;
                    $scope.rrProblemWoOrderFileList.pageInfo.totalCount = result.dpcoiWoOrderFileCount;
                    $scope.rrProblemWoOrderFileList.pageInfo.totalPage =  result.pageCount;
                    if($scope.rrProblemWoOrderFileList.pageInfo.page <= 1){
                        $scope.rrProblemWoOrderFileList.pageInfo.firstPageDisabled = true;
                        $scope.rrProblemWoOrderFileList.pageInfo.prevPageDisabled = true;
                    }else {
                        $scope.rrProblemWoOrderFileList.pageInfo.firstPageDisabled = false;
                        $scope.rrProblemWoOrderFileList.pageInfo.prevPageDisabled = false;
                    }
                    if($scope.rrProblemWoOrderFileList.pageInfo.page >= $scope.rrProblemWoOrderFileList.pageInfo.totalPage){
                        $scope.rrProblemWoOrderFileList.pageInfo.nextPageDisabled = true;
                        $scope.rrProblemWoOrderFileList.pageInfo.lastPageDisabled = true;
                    }else {
                        $scope.rrProblemWoOrderFileList.pageInfo.nextPageDisabled = false;
                        $scope.rrProblemWoOrderFileList.pageInfo.lastPageDisabled = false;
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

    $("#rrProblemWoOrderFileSearch").click(function () {
        $scope.rrProblemWoOrderFileList.firstPage();
    });


    $scope.rrProblemWoOrderFileList.downloadDpcoiWoOrderFile = function (fileId) {
        window.open("/WorkFlow/fileUpload/download.do?fileId="+fileId);
    }

    $scope.rrProblemWoOrderFileList.openDpcoiWoOrderFilePdf = function (fileAlias) {
        window.open("/WorkFlow/fileupload/"+fileAlias);
    }

    $(document).ready(function() {

        $scope.rrProblemWoOrderFileList.firstPage();

        var height = document.body.clientHeight;
        var searchTableHeight = $("#searchTable").height();
        var footTableHeight = $("#footTable").height();
        var height = height - searchTableHeight - footTableHeight - 40;
        $("#listTable").css("height", height);
    });
});

angular.bootstrap(document, [ 'rrProblemWoOrderFileList' ]);