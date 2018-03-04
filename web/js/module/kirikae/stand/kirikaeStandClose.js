var kirikaeStandCloseApp = angular.module("kirikaeStandClose", []);
kirikaeStandCloseApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
kirikaeStandCloseApp.controller("kirikaeStandCloseController", ["$scope", "$location", function ($scope, $location) {
    if(!($location.search().id == undefined || $location.search().id == null)){
        $("#id").val($location.search().id);
    }
    $scope.kirikaeStandCloseOrg = [];
    $scope.kirikaeStandCloseOrgList = [];
    $scope.systemUserList = [];

    $scope.initOrg = function () {
        var temp = [];
        var j = 0;
        var length = $scope.kirikaeStandCloseOrg.length;
        for(var i = 0; i < $scope.kirikaeStandCloseOrg.length; i++){
            if(i % 4 == 0){
                temp = [];
            }
            temp[i % 4] = $scope.kirikaeStandCloseOrg[i];
            if(i % 4 == 3){
                $scope.kirikaeStandCloseOrgList[j] = temp;
                j ++;
            }
        }
        if(length % 4 != 0){
            $scope.kirikaeStandCloseOrgList[j] = temp;
        }
    };

    $scope.addKirikaeStandClose = function () {
        var orgIdStr = "";
        var userNameStr = "";
        for(var i = 0; i < $scope.kirikaeStandCloseOrg.length; i++){
            var orgId = $scope.kirikaeStandCloseOrg[i].orgId;
            var userNameArray = $("#org_"+orgId).val();
            var userName = "";
            if(userNameArray != null){
                for(var j = 0; j < userNameArray.length; j ++){
                    userName += "," + userNameArray[j];
                }
            }
            if(userName != ""){
                userName = userName.substring(1);
            }else {
                userName = "0";
            }
            orgIdStr += "," + orgId;
            userNameStr += ":" + userName;
        }
        orgIdStr = orgIdStr.substring(1);
        userNameStr = userNameStr.substring(1);
        var con = confirm("确定提交！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/stand/add.do",
                data: {
                    "orderId": $("#id").val(),
                    "orgIdStr": orgIdStr,
                    "userNameStr": userNameStr
                },
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
                    }else {
                        alert("系统出现异常！！");
                    }
                }
            });
        }
    };

    $scope.closeKirikaeStandClose = function () {
        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
    };

    $(document).ready(function () {
        $.ajax({
            method: 'post',
            url: BASE_URL + "/system/userOrg/getUserOrgList.do",
            success: function (resultJson) {
                var result = angular.fromJson(resultJson);
                if (result.success) {
                    $scope.systemUserList = result.mapList;
                    $.ajax({
                        method: 'post',
                        url: BASE_URL + "/kirikae/woOrder/getStandCloseOrg.do",
                        data:{"orderId":$("#id").val()},
                        success: function (resultJson) {
                            var result = angular.fromJson(resultJson);
                            if (result.success) {
                                $scope.kirikaeStandCloseOrg = result.dataMapList;
                                $scope.initOrg();
                                $scope.$apply();
                                $(".chosen-select").chosen({
                                    no_results_text : "没有找到结果！",//搜索无结果时显示的提示
                                    search_contains : true,   //关键字模糊搜索，设置为false，则只从开头开始匹配
                                    max_selected_options : 5,  //当select为多选时，最多选择个数
                                    placeholder_text_multiple : "请选择",
                                    max_shown_results : 5,
                                    display_selected_options : false,
                                    disable_search : false,
                                    width : "70%"
                                });
                            }
                        }
                    });
                }
            }
        });
    });

}]);
kirikaeStandCloseApp.filter('attrFilter', function() {
    return function(inputArray, orgId) {
        var array = [];
        for(var i = 0; i < inputArray.length ; i++){
            var obj = inputArray[i];
            var id = obj.orgId;
            if(id == orgId){
                array.push(obj);
            }
        }
        return array;
    };
});
angular.bootstrap(document, [ 'kirikaeStandClose' ]);