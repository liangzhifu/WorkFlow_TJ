var kirikaeOrgQuestionApp = angular.module("kirikaeOrgQuestion", []);
kirikaeOrgQuestionApp.controller("kirikaeOrgQuestionController", function ($scope) {
    $scope.orgList = [];
    $scope.questionList = [];
    $scope.orgQuestionList = [];
    $scope.orgQuestion = {};
    $scope.searchForm = {};

    $scope.searchOrgQuestion = function () {
        $.ajax({
            method: 'post',
            url: BASE_URL + "/kirikae/orgQuestion/queryList.do",
            data : {"orgId" : $scope.orgQuestion.orgId},
            async: false,
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.orgQuestionList = result.dataMapList;
                }else {
                    alert(result.message);
                }
            }
        });
    };

    $scope.grantOrgQuestionDialog = function (orgId) {
        $scope.orgQuestion.orgId = orgId;
        $scope.searchOrgQuestion();
        $("#orgQuestionModal").modal("show");
    };

    $scope.deleteOrgQuestion = function (id) {
        var con = confirm("确定删除组织确认内容关联！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/orgQuestion/delete.do",
                data: {"id" : id},
                async: false,
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        alert("删除成功！");
                        $scope.searchOrgQuestion();
                    }else {
                        alert(result.message);
                    }
                }
            });
        }
    };

    $scope.searchAddQuestion = function () {
        $.ajax({
            method: 'post',
            url: BASE_URL + "/kirikae/orgQuestion/queryAddList.do",
            data: {"orgId" : $scope.orgQuestion.orgId, "confirmProject" : $("#confirmProject").val(), "confirmContent" : $("#confirmContent").val()},
                success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.questionList = result.dataMapList;
                    $scope.$apply();
                }else {
                    alert(result.message);
                }
            }
        });
    };

    $scope.addOrgQuestionDialog = function () {
        $scope.searchAddQuestion();
        $("#questionListModal").modal("show");
    };

    $scope.addOrgQuestion = function () {
        var questionIdStr = "";
        $('input[name="questionCheck"]:checked').each(function() {
            questionIdStr += "," + $(this).val();
        });
        if(questionIdStr == ""){
            alert("至少选择一个确认内容！");
            return;
        }else {
            questionIdStr = questionIdStr.substring(1);
        }
        var con = confirm("确定增加组织确认内容关联！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/orgQuestion/add.do",
                data: {"orgId" : $scope.orgQuestion.orgId, "questionIdStr" : questionIdStr},
                async: false,
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        alert("增加成功！");
                        $scope.searchOrgQuestion();
                        $("#questionListModal").modal("hide");
                    }else {
                        alert(result.message);
                    }
                }
            });
        }
    };

    $scope.selectAllQuestion = function () {
        var checked = $('#questionSelectAll').is(':checked');
        $('input[name="questionCheck"]').each(function(){
            $(this).prop('checked', checked);
        });
    };

    $(document).ready(function() {
        $.ajax({
            method: 'post',
            url: BASE_URL + "/system/org/queryKirikaeList.do",
            async: false,
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.orgList = result.systemOrgKirikaeList;
                    $scope.$apply();
                }else {
                    alert(result.message);
                }
            }
        });
    });

});
angular.bootstrap(document, [ 'kirikaeOrgQuestion' ]);