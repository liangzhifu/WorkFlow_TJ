<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>切替单立合确认</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="standCloseCheckedController" ng-cloak>
<form class="form-inline" id="standCloseCheckedForm">
    <input type="hidden" id="id" name="orderId">
    <div class="main-container container-fluid" style="padding-left: 0px; padding-right: 0px;">
        <div class="main-content" style="padding-left: 0px; padding-right: 0px;">
            <div class="page-content">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="block" style="margin-top: 0px; margin-bottom: 0px;padding: 5px 0px;">
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>确认项目
                                </div>
                            </div>
                            <div style="padding-bottom: 10px;">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th class="common-table-td" width="10%">部门</th>
                                        <th class="common-table-td" width="10%">科室</th>
                                        <th class="common-table-td" width="10%">确认项目</th>
                                        <th class="common-table-td" width="20%">确认内容</th>
                                        <th class="common-table-td" width="10%">担当</th>
                                        <th class="common-table-td" width="10%">预计完成时间</th>
                                        <th class="common-table-td" width="10%">评审结果</th>
                                        <th class="common-table-td" width="10%">评审依据</th>
                                        <th class="common-table-td" width="10%">评审日期</th>
                                        <th class="common-table-td" width="10%">立合结果</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr ng-repeat="data in woAttrList">
                                        <td ng-hide="data.parentRowSpan == 0" rowspan="{{data.parentRowSpan}}" style="display:table-cell; vertical-align:middle">
                                            {{data.parentOrgName}}
                                        </td>
                                        <td ng-hide="data.rowSpan == 0" rowspan="{{data.rowSpan}}" style="display:table-cell; vertical-align:middle">
                                            {{data.orgName}}
                                        </td>
                                        <td>{{data.confirmProject}}</td>
                                        <td>{{data.confirmContent}}</td>
                                        <td>{{data.preparedUserName}}</td>
                                        <td>{{data.changeCompleteTime}}</td>
                                        <td>{{data.reviewResult}}</td>
                                        <td>{{data.reviewPrinciple}}</td>
                                        <td>{{data.reviewTime}}</td>
                                        <td>{{data.agreementResult}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-body" style="padding: 0px;">
                                <div class="modal-footer">
                                    <button type="button" ng-click="refuseStandCloseChecked()"
                                            class="btn btn-small btn-primary">拒绝</button>
                                    <button type="button" ng-click="submitStandCloseChecked()"
                                            class="btn btn-small btn-primary">确认</button>
                                    <button type="button" ng-click="closeStandCloseChecked()"
                                            class="btn btn-small btn-primary">取消
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
</body>
<script src="<%=request.getContextPath()%>/js/module/kirikae/stand/kirikaeStandCloseChecked.js"></script>
</html>