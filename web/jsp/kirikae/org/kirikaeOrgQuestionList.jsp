<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>组织确认内容管理页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="kirikaeOrgQuestionController" ng-cloak>
    <form class="form-inline">
        <div class="main-container container-fluid" style="padding-left: 0px; padding-right: 0px;">
            <div class="main-content" style="padding-left: 0px; padding-right: 0px;">
                <div class="page-content" >
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <td width="30%" class="common-table-td">部门</td>
                                <td width="30%" class="common-table-td">科室</td>
                                <td width="40%" class="common-table-td">操作</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="data in orgList">
                                <td>{{data.parentOrgName}}</td>
                                <td>{{data.orgName}}</td>
                                <td>
                                    <button class="btn btn-mini btn-purple" type="button" ng-click="grantOrgQuestionDialog(data.id)">
                                        <i class="icon-edit icon-on-right bigger-110"></i>分配确认内容
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </form>

    <!--组织确认内容关联-->
    <div id="orgQuestionModal" class="modal fade" tabindex="-1"
         role="dialog" aria-labelledby="orgQuestionModalLabel"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">×</button>
                <span id="orgQuestionModalLabel">关联确认内容</span>
                <button class="btn btn-small btn-success" type="button" ng-click="addOrgQuestionDialog()">
                    <i class="icon-plus-sign icon-on-right bigger-110"></i>新增
                </button>
            </div>
            <form class="form-inline" >
                <div style="overflow:auto;width: 100%; height: 200px;">
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                        <tr>
                            <td width="25%" class="common-table-td">确认项目</td>
                            <td width="50%" class="common-table-td">确认内容</td>
                            <td width="25%" class="common-table-td">操作</td>
                        </tr>
                        </thead>
                        <tr ng-repeat="data in orgQuestionList">
                            <td>{{data.confirmProject}}</td>
                            <td>{{data.confirmContent}}</td>
                            <td>
                                <div ng-hide="data.questionId == 1">
                                    <button class="btn btn-mini btn-danger" type="button" ng-click="deleteOrgQuestion(data.id)">
                                        <i class="icon-remove icon-on-right bigger-110"></i>删除
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-body">
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-small btn-primary" data-dismiss="modal">关闭
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!--组织确认内容关联-->

    <!--确认内容列表-->
    <div id="questionListModal" class="modal fade" tabindex="-1"
         role="dialog" aria-labelledby="questionListModalLabel"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">×</button>
                <span id="questionListModalLabel">确认内容列表</span>
            </div>
            <form class="form-inline" >
                <div class="modal-body" id="searchTable">
                    <div class="row">
                        <div class="col-md-5">
                            <label class="control-label" for="confirmProject">确认项目：</label>
                            <input class="form-control-order form-control clean" style="width: 60%;font-size: 12px;"
                                   id="confirmProject" ng-model="searchForm.confirmProject">
                        </div>
                        <div class="col-md-5">
                            <label class="control-label" for="confirmContent">确认内容：</label>
                            <input class="form-control-order form-control clean" style="width: 60%;font-size: 12px;"
                                   id="confirmContent" ng-model="searchForm.confirmContent">
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-small btn-purple" type="button" ng-click="searchAddQuestion()">
                                <i class="icon-search icon-on-right bigger-110"></i>查找
                            </button>
                        </div>
                    </div>
                </div>

                <div style="height: 200px;overflow-x: scroll;">
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <td width="10%" class="common-table-td">
                                    <input type="checkbox" style="width: 18px;height: 18px;" class="form-control-order form-checkbox-mypage"
                                           id="questionSelectAll" ng-click="selectAllQuestion()" />
                                    <div style="float:left; margin-left:20%;">全选</div>
                                </td>
                                <td width="30%" class="common-table-td">确认项目</td>
                                <td width="60%" class="common-table-td">确认内容</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="data in questionList">
                                <td>
                                    <input type="checkbox" style="width: 18px;height: 18px;" class="form-control-order form-checkbox-mypage"
                                           name="questionCheck" value={{data.id}} />
                                </td>
                                <td>{{data.confirmProject}}</td>
                                <td>{{data.confirmContent}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="modal-body">
                    <div class="modal-footer">
                        <button type="button" ng-click="addOrgQuestion()"
                                class="btn btn-small btn-primary">确认
                        </button>
                        <button type="button"
                                class="btn btn-small btn-primary" data-dismiss="modal">关闭
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!--确认内容列表-->

</body>
<script src="<%=request.getContextPath()%>/js/module/kirikae/org/kirikaeOrgQuestionList.js"></script>
</html>