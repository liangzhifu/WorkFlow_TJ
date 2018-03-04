var kirikaeOrderAgencyListApp = angular.module("kirikaeOrderAgencyList", []);
kirikaeOrderAgencyListApp.controller("kirikaeOrderAgencyListController", function ($scope) {
    $scope.kirikaeOrderAgencyList = [];
    $scope.pageTool = {
        "url" : BASE_URL + "/kirikae/agency/queryPageInfo.do"
    };
    $scope.pageTool.searchForm = {};
    $scope.pageTool.firstPage = function () {
        $scope.pageTool.page = 1;
        $scope.pageTool.search();
    };
    $scope.pageTool.prevPage = function () {
        $scope.pageTool.page = $scope.pageTool.page - 1;
        $scope.pageTool.search();
    };
    $scope.pageTool.nextPage = function () {
        $scope.pageTool.page = $scope.pageTool.page + 1;
        $scope.pageTool.search();
    };
    $scope.pageTool.lastPage = function () {
        $scope.pageTool.page = $scope.pageTool.totalPage;
        $scope.pageTool.search();
    };
    $scope.pageTool.search = function () {
        $scope.pageTool.searchForm.size = 10;
        $scope.pageTool.searchForm.start = ($scope.pageTool.page-1)*$scope.pageTool.searchForm.size;
        $.ajax({
            method:'post',
            url:$scope.pageTool.url,
            data:$scope.pageTool.searchForm,
            async:false,
            success: function(resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.kirikaeOrderAgencyList = result.dataMapList;
                    $scope.pageTool.totalCount = result.totalCount;
                    $scope.pageTool.totalPage = result.totalPage;
                    if ($scope.pageTool.page <= 1) {
                        $scope.pageTool.firstPageDisabled = true;
                        $scope.pageTool.prevPageDisabled = true;
                    } else {
                        $scope.pageTool.firstPageDisabled = false;
                        $scope.pageTool.prevPageDisabled = false;
                    }
                    if ($scope.pageTool.page >= $scope.pageTool.totalPage) {
                        $scope.pageTool.nextPageDisabled = true;
                        $scope.pageTool.lastPageDisabled = true;
                    } else {
                        $scope.pageTool.nextPageDisabled = false;
                        $scope.pageTool.lastPageDisabled = false;
                    }
                    $scope.$apply();
                }else {
                    alert(result.message);
                }
            }
        });
    };

    $scope.orderAgencyOpen = function (orderId, orderAgency) {
        if(orderAgency == 1){
            window.location.href = BASE_URL + "/kirikae/order/getDesignChangeTimingDialog.do?id="+orderId;
        }else if(orderAgency == 2001){
            window.location.href = BASE_URL + "/kirikae/woOrderAttr/getAddDialog.do?id="+orderId;
        }else if(orderAgency == 2002){
            window.location.href = BASE_URL + "/kirikae/woOrderAttr/getConfirmDialog.do?id="+orderId;
        }else if(orderAgency == 3){
            window.location.href = BASE_URL + "/kirikae/woOrderAttr/getReviewDialog.do?id="+orderId;
        }else if(orderAgency == 4){
            window.location.href = BASE_URL + "/kirikae/woOrderAttr/getUploadDialog.do?id="+orderId;
        }else if(orderAgency == 5){
            window.location.href = BASE_URL + "/kirikae/stand/getDialog.do?id="+orderId;
        }else if(orderAgency == 6){
            window.location.href = BASE_URL + "/kirikae/woOrderAttr/getStandCloseDialog.do?id="+orderId;
        }else if(orderAgency == 7){
            window.location.href = BASE_URL + "/kirikae/stand/getCheckedDialog.do?id="+orderId;
        }else if(orderAgency == 8){
            window.location.href = BASE_URL + "/kirikae/stand/getApprovedDialog.do?id="+orderId;
        }else if(orderAgency == 9){
            window.location.href = BASE_URL + "/kirikae/instruction/getDialog.do?orderId="+orderId;
        }else if(orderAgency == 10){
            window.location.href = BASE_URL + "/kirikae/instruction/getCheckedDialog.do?orderId="+orderId;
        }else if(orderAgency == 11){
            window.location.href = BASE_URL + "/kirikae/instruction/getApprovedDialog.do?orderId="+orderId;
        }else if(orderAgency == 12){
            window.location.href = BASE_URL + "/kirikae/confirmation/getDialog.do?orderId="+orderId;
        }else if(orderAgency == 13){
            window.location.href = BASE_URL + "/kirikae/confirmation/getCheckedDialog.do?orderId="+orderId;
        }else if(orderAgency == 14){
            window.location.href = BASE_URL + "/kirikae/confirmation/getApprovedDialog.do?orderId="+orderId;
        }else if(orderAgency == 15){
            window.location.href = BASE_URL + "/kirikae/order/getGenerateFourDialog.do?id="+orderId;
        }else {

        }
    };

    $(document).ready(function () {
        var height = document.body.clientHeight;
        var searchTableHeight = $("#searchTable").height();
        var footTableHeight = $("#footTable").height();
        height = height - searchTableHeight - footTableHeight - 35;
        $("#listTable").css("height", height);

        $scope.pageTool.firstPage();

    });
});

angular.bootstrap(document, [ 'kirikaeOrderAgencyList' ]);