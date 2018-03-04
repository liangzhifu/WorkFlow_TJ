var kirikaeQuestionListApp = angular.module("kirikaeQuestionList", []);
kirikaeQuestionListApp.controller("kirikaeQuestionListController", function ($scope) {
    $scope.kirikaeQuestionList = [];
    $scope.pageTool = {
        "url" : BASE_URL + "/kirikae/question/queryPageInfo.do"
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
                    $scope.kirikaeQuestionList = result.dataMapList;
                    $scope.pageTool.totalCount = result.totalCount;//共几条
                    $scope.pageTool.totalPage = result.totalPage;//共几页
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

    $scope.deleteKirikaeQuestion = function (id) {
        var con = confirm("确定删除确认内容！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/question/delete.do",
                data: {"id":id},
                async: false,
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        $scope.pageTool.search();
                    }else {
                        alert(result.message);
                    }
                }
            });
        }
    };

    $scope.editKirikaeQuestion = {};
    $scope.addKirikaeQuestionDialog = function () {
        $scope.editKirikaeQuestion.confirmProject = "";
        $scope.editKirikaeQuestion.confirmContent = "";
        $("#kirikaeQuestionAddModal").modal("show");
    };
    $scope.addKirikaeQuestion = function () {
        var con = confirm("确定新增确认内容！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/question/add.do",
                data: $scope.editKirikaeQuestion,
                async: false,
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        $scope.pageTool.search();
                        $("#kirikaeQuestionAddModal").modal("hide");
                    }else {
                        alert(result.message);
                    }
                }
            });
        }
    };

    $(document).ready(function() {

        var height = document.body.clientHeight;
        var searchTableHeight = $("#searchTable").height();
        var footTableHeight = $("#footTable").height();
        height = height - searchTableHeight - footTableHeight - 34;
        $("#listTable").css("height", height);

        $scope.pageTool.firstPage();
    });

});
angular.bootstrap(document, [ 'kirikaeQuestionList' ]);