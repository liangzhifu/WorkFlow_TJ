<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>切替确认内容管理页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="kirikaeQuestionListController" ng-cloak>
<form class="form-inline">
    <div class="main-container container-fluid" style="padding-left: 0px; padding-right: 0px;">
        <div class="main-content" style="padding-left: 0px; padding-right: 0px;">
            <div class="page-content" >

                <div class="modal-body" id="searchTable" style="padding: 5px 0px;">
                    <div class="row">
                        <div class="col-md-2">
                            <label class="control-label" for="confirmProject">确认项目：</label>
                            <input class="form-control-order form-control clean" style="width: 65%;margin-left: 0px;padding: 1px 1px;font-size: 12px;margin-right: 0px;height: 25px;"
                                   id="confirmProject" ng-model="pageTool.searchForm.confirmProject">
                        </div>
                        <div class="col-md-2">
                            <label class="control-label" for="confirmContent">确认内容：</label>
                            <input class="form-control-order form-control clean" style="width: 65%;margin-left: 0px;padding: 1px 1px;font-size: 12px;margin-right: 0px;height: 25px;"
                                   id="confirmContent" ng-model="pageTool.searchForm.confirmContent">
                        </div>
                        <div class="col-md-6">
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-small btn-purple" type="button" ng-click="pageTool.firstPage()">
                                <i class="icon-search icon-on-right bigger-110"></i>查找
                            </button>
                            <button class="btn btn-small btn-success" type="button" ng-click="addKirikaeQuestionDialog()">
                                <i class="icon-plus-sign icon-on-right bigger-110"></i>新增
                            </button>
                        </div>
                    </div>
                </div>

                <div class="common-table-header">
                    <span>详细数据</span>
                </div>

                <div id="listTable" style="overflow:auto;">
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                        <tr>
                            <td width="20%" class="common-table-td">确认项目</td>
                            <td width="70%" class="common-table-td">确认内容</td>
                            <td width="10%" class="common-table-td">操作</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="data in kirikaeQuestionList">
                            <td>{{data.confirmProject}}</td>
                            <td>{{data.confirmContent}}</td>
                            <td>
                                <div ng-hide="data.id == 1">
                                    <button class="btn btn-mini btn-danger" type="button" ng-click="deleteKirikaeQuestion(data.id)">
                                        <i class="icon-remove icon-on-right bigger-110"></i>删除
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class = "tfoot" id="footTable">
                    <div class="table-foot-center">
                        <button class="" ng-disabled="pageTool.firstPageDisabled"
                                ng-click="pageTool.firstPage()">
                            <span class="glyphicon glyphicon-step-backward "></span>
                        </button>
                        <button class="" ng-disabled="pageTool.prevPageDisabled"
                                ng-click="pageTool.prevPage()">
                            <span class="glyphicon glyphicon-backward"></span>
                        </button>
                        <span class="separator"></span> <span class="page">
								{{pageTool.page}}&nbsp;/&nbsp;{{pageTool.totalPage}}&nbsp; </span> <span
                            class="separator"></span>
                        <button class="" ng-disabled="pageTool.nextPageDisabled"
                                ng-click="pageTool.nextPage()">
                            <span class="glyphicon glyphicon-forward "></span>
                        </button>
                        <button class="" ng-disabled="pageTool.lastPageDisabled"
                                ng-click="pageTool.lastPage()">
                            <span class="glyphicon glyphicon-step-forward  "></span>
                        </button>
                        <span class="separator"></span> <span>共{{pageTool.totalCount}}条</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

<!--确认内容新增-->
<div id="kirikaeQuestionAddModal" class="modal fade" tabindex="-1"
     role="dialog" aria-labelledby="kirikaeQuestionAddModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">×</button>
            <h3 id="kirikaeQuestionAddModalLabel">切替确认内容新增</h3>
        </div>
        <form class="form-inline">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <label class="control-label" title="">确认项目：</label>
                        <input type="text" title="" style="width: 65%"
                               class="form-control-order form-control clean" ng-model="editKirikaeQuestion.confirmProject" required="required">
                    </div>
                    <div class="col-md-6">
                        <label class="control-label" title="">确认内容：</label>
                        <input type="text" title="" style="width: 65%"
                               class="form-control-order form-control clean" ng-model="editKirikaeQuestion.confirmContent" required="required">
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="modal-footer">
                    <button type="button" ng-click="addKirikaeQuestion()"
                            class="btn btn-small btn-primary">确定</button>
                    <button type="button"
                            class="btn btn-small btn-primary" data-dismiss="modal">取消
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
<!--确认内容新增-->

</body>
<script src="<%=request.getContextPath()%>/js/module/kirikae/question/kirikaeQuestionList.js"></script>
</html>
