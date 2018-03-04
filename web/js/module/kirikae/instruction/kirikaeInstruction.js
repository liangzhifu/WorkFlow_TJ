var kirikaeInstructionApp = angular.module("kirikaeInstruction", []);
kirikaeInstructionApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
kirikaeInstructionApp.controller("kirikaeInstructionController", ["$scope", "$location", function ($scope, $location) {
    $scope.kirikaeInstruction = {"factory":"TTAC"};

    if(!($location.search().orderId == undefined || $location.search().orderId == null)){
        $scope.kirikaeInstruction.orderId = $location.search().orderId;
    }

    $scope.addKirikaeInstruction = function () {
        $scope.kirikaeInstruction.orderKirikae = $("#orderKirikae").val();
        $scope.kirikaeInstruction.customerKirikae = $("#customerKirikae").val();
        $scope.kirikaeInstruction.releaseDate = $("#releaseDate").val();
        $scope.kirikaeInstruction.customerDesignChangeNotification = $("#customerDesignChangeNotification").val();
        $scope.kirikaeInstruction.customerTechnologyApproval = $("#customerTechnologyApproval").val();
        $scope.kirikaeInstruction.certificationApproval = $("#certificationApproval").val();
        $scope.kirikaeInstruction.isirProcession = $("#isirProcession").val();
        $scope.kirikaeInstruction.isirMarking = $("#isirMarking").val();
        $scope.kirikaeInstruction.isirNotificationIssued = $("#isirNotificationIssued").val();
        var con = confirm("确定提交指示书！");
        if (con == true){
            $.ajax({
                method: 'post',
                url: BASE_URL + "/kirikae/instruction/add.do",
                data: $scope.kirikaeInstruction,
                async: false,
                success: function (resultJson) {
                    var result = angular.fromJson(resultJson);
                    if (result.success) {
                        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
                    }else {
                        alert(result.message);
                    }
                }
            });
        }
    };

    $scope.closeKirikaeInstruction = function () {
        window.location.href = BASE_URL + "/kirikae/agency/getDialog.do";
    };

    $(document).ready(function () {
        $("input[data-type='date']").each(function(){
            $(this).datetimepicker({
                timepicker:false,
                format:'Y-m-d'
            });
        });
    });

}]);
angular.bootstrap(document, [ 'kirikaeInstruction' ]);