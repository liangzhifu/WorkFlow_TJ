var orderQuestionListApp = angular.module("orderQuestionList", []);
orderQuestionListApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
orderQuestionListApp.controller("orderQuestionListController", ["$scope", "$location", function ($scope, $location) {
    $scope.orderQuestionList = [];

    //计算合并单元格
    $scope.calRowSpan = function () {
        var index = null;
        var preParentOrgId = null;
        for(var i = 0; i < $scope.orderQuestionList.length; i++){
            var parentOrgId = $scope.orderQuestionList[i].parentOrgId;
            if(preParentOrgId == null){
                preParentOrgId = parentOrgId;
                index = i;
                $scope.orderQuestionList[index].parentRowSpan = 1;
            }else {
                if(parentOrgId == preParentOrgId){
                    $scope.orderQuestionList[index].parentRowSpan += 1;
                    $scope.orderQuestionList[i].parentRowSpan = 0;
                }else {
                    preParentOrgId = parentOrgId;
                    index = i;
                    $scope.orderQuestionList[index].parentRowSpan = 1;
                }
            }
        }
        index = null;
        var preOrgId = null;
        for(var i = 0; i < $scope.orderQuestionList.length; i++){
            var orgId = $scope.orderQuestionList[i].orgId;
            if(preOrgId == null){
                preOrgId = orgId;
                index = i;
                $scope.orderQuestionList[index].rowSpan = 1;
            }else {
                if(orgId == preOrgId){
                    $scope.orderQuestionList[index].rowSpan += 1;
                    $scope.orderQuestionList[i].rowSpan = 0;
                }else {
                    preOrgId = orgId;
                    index = i;
                    $scope.orderQuestionList[index].rowSpan = 1;
                }
            }
        }
    };

    $scope.downloadFile = function (fileId) {
        window.open("/WorkFlow/fileUpload/download.do?fileId="+fileId);
    };

    $(document).ready(function() {
        var orderId = $location.search().orderId;
        $.ajax({
            method: 'post',
            url: BASE_URL + "/kirikae/woOrderAttr/getListByOrderId.do",
            data: {"orderId":orderId},
            async: false,
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.orderQuestionList = result.dataMapList;
                    $scope.calRowSpan();
                    $scope.$apply();
                }else {
                    alert(result.message);
                }
            }
        });
    });

}]);
angular.bootstrap(document, [ 'orderQuestionList' ]);