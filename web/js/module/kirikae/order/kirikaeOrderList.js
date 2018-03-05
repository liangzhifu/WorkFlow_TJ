var alterationKirikaeOrderListApp = angular.module("alterationKirikaeOrderList", []);
alterationKirikaeOrderListApp.controller("alterationKirikaeOrderListController", function ($scope) {
    $scope.alterationKirikaeOrderList = [];
    $scope.pageTool = {
        "url" : BASE_URL + "/kirikae/order/queryPageInfo.do"
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
        $scope.pageTool.searchForm.designChangeTimingFrom = $("#designChangeTimingFrom").val();
        $scope.pageTool.searchForm.designChangeTimingTo = $("#designChangeTimingTo").val();
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
                    $scope.alterationKirikaeOrderList = result.dataMapList;
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

    //查看切替单确认内容
    $scope.viewDpcoi = function () {
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length == 0){
            alert("请选择一条切替单！");
            return false;
        }
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length > 1){
            alert("请选择一条切替单！");
            return false;
        }
        var orderId = "";
        var dpcoiOrderId = "";
        $('input[name="alterationKirikaeOrderCheck"]:checked').each(function() {
            orderId = $(this).val();
        });
        for (var i = 0; i < $scope.alterationKirikaeOrderList.length; i++) {
            if (orderId == $scope.alterationKirikaeOrderList[i].alterationOrderId) {
                dpcoiOrderId = $scope.alterationKirikaeOrderList[i].dpcoiOrderId;
            }
        }
        window.open(BASE_URL + "/dpcoiOrder/getDpcoiOrderDetailDlg.do?dpcoiOrderId="+dpcoiOrderId)
    };

    //查看切替单确认内容
    $scope.viewOrderQuestion = function () {
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length == 0){
            alert("请选择一条切替单！");
            return false;
        }
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length > 1){
            alert("请选择一条切替单！");
            return false;
        }
        var orderId = "";
        $('input[name="alterationKirikaeOrderCheck"]:checked').each(function() {
            orderId = $(this).val();
        });
        window.open(BASE_URL + "/kirikae/woOrderAttr/getViewDialog.do?orderId="+orderId)
    };

    //新增切替变更单
    $scope.addKirikaeOrder = function () {
        $.ajax({
            method: 'post',
            url: BASE_URL + "/system/user/validUserPermission.do",
            data: {"permissionId": 1},
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    if (result.valid) {
                        window.location.href = BASE_URL + "/alteration/order/getAddOrEditDialog.do?orderChannel=2";
                    } else {
                        alert("你没有新增切替单权限！");
                    }
                }else {
                    alert("请联系系统管理员！");
                }
            }
        });
    };

    //修改切替变更单
    $scope.editKirikaeOrder = function () {
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length == 0){
            alert("请选择一条切替单！");
            return false;
        }
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length > 1){
            alert("请选择一条切替单！");
            return false;
        }
        var orderId = "";
        $('input[name="alterationKirikaeOrderCheck"]:checked').each(function() {
            orderId = $(this).val();
        });
        for(var i = 0; i < $scope.alterationKirikaeOrderList.length; i++){
            if(orderId == $scope.alterationKirikaeOrderList[i].alterationOrderId){
                if($scope.alterationKirikaeOrderList[i].orderState != '10B'){
                    alert("该切替单不能修改！");
                    return;
                }
            }
        }
        //查看是否有权限
        $.ajax({
            method: 'post',
            url: BASE_URL + "/system/user/validUserPermission.do",
            data: {"permissionId": 2},
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    if (result.valid) {
                        window.location.href = BASE_URL + "/alteration/order/getAddOrEditDialog.do?id="+orderId;
                    } else {
                        alert("你没有修改切替单权限！");
                    }
                }else {
                    alert("请联系系统管理员！");
                }
            }
        });

    };

    //作废切替变更单
    $scope.voidKirikaeOrder = function () {
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length == 0){
            alert("请选择一条切替单！");
            return false;
        }
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length > 1){
            alert("请选择一条切替单！");
            return false;
        }
        var orderId = "";
        $('input[name="alterationKirikaeOrderCheck"]:checked').each(function() {
            orderId = $(this).val();
        });
        for(var i = 0; i < $scope.alterationKirikaeOrderList.length; i++){
            if(orderId == $scope.alterationKirikaeOrderList[i].alterationOrderId){
                if($scope.alterationKirikaeOrderList[i].orderState != '10B'){
                    alert("该切替单不能作废！");
                    return;
                }
            }
        }
        var con = confirm("确定作废切替单");
        if (con == true){
            //查看是否有权限
            $.ajax({
                method: 'post',
                url: BASE_URL + "/system/user/validUserPermission.do",
                data:{"permissionId":3},
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        if(result.valid){
                            $.ajax({
                                method: 'post',
                                url: BASE_URL + "/alteration/order/toVoid.do",
                                data:{"orderId":orderId},
                                success: function (resultJson) {
                                    var result = angular.fromJson(resultJson);
                                    if (result.success) {
                                        $scope.pageTool.firstPage();
                                    }else {
                                        alert("请联系系统管理员！");
                                    }
                                }
                            });
                        }else {
                            alert("你没有作废切替单权限！");
                        }
                    }else {
                        alert("请联系系统管理员！");
                    }
                }
            });
        }
    };

    $scope.exportConfirmBook = function () {
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length == 0){
            alert("请选择一条切替单！");
            return false;
        }
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length > 1){
            alert("请选择一条切替单！");
            return false;
        }
        var orderId = "";
        $('input[name="alterationKirikaeOrderCheck"]:checked').each(function() {
            orderId = $(this).val();
        });
        $.ajax({
            method: 'post',
            url: BASE_URL + "/kirikae/order/doExportConfirmBookPDF.do",
            data:{"orderId":orderId},
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    var fileUrl = BASE_URL + result.path;
                    window.open(fileUrl);
                }else {
                    alert("请联系系统管理员！");
                }
            }
        });
    };

    $scope.exportHandMatch = function () {
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length == 0){
            alert("请选择一条切替单！");
            return false;
        }
        if($('input[name="alterationKirikaeOrderCheck"]:checked').length > 1){
            alert("请选择一条切替单！");
            return false;
        }
        var orderId = "";
        $('input[name="alterationKirikaeOrderCheck"]:checked').each(function() {
            orderId = $(this).val();
        });
        $.ajax({
            method: 'post',
            url: BASE_URL + "/kirikae/order/doExportHandMatchPDF.do",
            data:{"orderId":orderId},
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    var fileUrl = BASE_URL + result.path;
                    window.open(fileUrl);
                }else {
                    alert("请联系系统管理员！");
                }
            }
        });
    };

    $(document).ready(function () {
        $("input[data-type='date']").each(function(){
            $(this).datetimepicker({
                timepicker:false,
                format:'Y-m-d'
            });
        });

        var height = document.body.clientHeight;
        var searchTableHeight = $("#searchTable").height();
        var footTableHeight = $("#footTable").height();
        height = height - searchTableHeight - footTableHeight - 35;
        $("#listTable").css("height", height);

        $scope.pageTool.firstPage();

    });
});

angular.bootstrap(document, [ 'alterationKirikaeOrderList' ]);