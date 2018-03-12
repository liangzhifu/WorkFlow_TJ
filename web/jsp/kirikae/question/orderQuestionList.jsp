<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>确认项目查看</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
    <style>
        a{color:#000}
        a:hover{color:red}

        .claasRed{
            background-color : red;
            color: #000000;!important;
        }
    </style>
</head>
<body ng-controller="orderQuestionListController" ng-cloak>
<form class="form-inline">
    <div class="main-container container-fluid" style="padding-left: 0px; padding-right: 0px;">
        <div class="main-content" style="padding-left: 0px; padding-right: 0px;">
            <div class="page-content" >
                <div id="listTable" style="overflow:auto;">
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                        <tr>
                            <td width="20px" class="common-table-td">部门</td>
                            <td width="40px" class="common-table-td">科室</td>
                            <td width="60px" class="common-table-td">确认项目</td>
                            <td width="60px" class="common-table-td">确认内容</td>
                            <td width="60px" class="common-table-td">担当</td>
                            <td width="60px" class="common-table-td">预计完成时间</td>
                            <td width="60px" class="common-table-td">评审结果</td>
                            <td width="60px" class="common-table-td">评审依据</td>
                            <td width="60px" class="common-table-td">评审时间</td>
                            <td width="60px" class="common-table-td">上传文件</td>
                            <td width="60px" class="common-table-td">立合结果</td>
                            <td width="60px" class="common-table-td">验证立合结果</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="data in orderQuestionList">
                            <td ng-hide="data.parentRowSpan == 0" rowspan="{{data.parentRowSpan}}" style="display:table-cell; vertical-align:middle">
                                {{data.parentOrgName}}
                            </td>
                            <td ng-hide="data.rowSpan == 0" rowspan="{{data.rowSpan}}" style="display:table-cell; vertical-align:middle">
                                {{data.orgName}}
                            </td>
                            <td ng-class="{'claasRed': data.overtimeFlag}">{{data.confirmProject}}</td>
                            <td ng-class="{'claasRed': data.overtimeFlag}">{{data.confirmContent}}</td>
                            <td ng-class="{'claasRed': data.overtimeFlag}">{{data.preparedUserName}}</td>
                            <td ng-class="{'claasRed': data.overtimeFlag}">{{data.changeCompleteTime}}</td>
                            <td ng-class="{'claasRed': data.overtimeFlag}">{{data.reviewResult}}</td>
                            <td ng-class="{'claasRed': data.overtimeFlag}">{{data.reviewPrinciple}}</td>
                            <td ng-class="{'claasRed': data.overtimeFlag}">{{data.reviewTime}}</td>
                            <td ng-class="{'claasRed': data.overtimeFlag}">
                                <a href="javascript:void(0)" ng-click="downloadFile(data.fileId)">{{data.fileName}}</a>
                            </td>
                            <td ng-class="{'claasRed': data.overtimeFlag}">{{data.agreementResult}}</td>
                            <td ng-class="{'claasRed': data.overtimeFlag}">{{data.agreementValidResult}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table class="table table-striped table-bordered table-hover">
                        <tr>
                            <td width="10%">评审结果：{{spareColumn}}</td>
                            <td width="20%">会议纪要：<a href="javascript:void(0)" ng-click="downloadFile(fileId)">{{fileName}}</a></td>
                            <td width="70%">评审结论：{{remark}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</form>
</body>
<script src="<%=request.getContextPath()%>/js/module/kirikae/question/orderQuestionList.js"></script>
</html>