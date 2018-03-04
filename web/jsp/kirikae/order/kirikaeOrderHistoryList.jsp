<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>切替变更单历史管理页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="alterationKirikaeOrderHistoryListController" ng-cloak>
<form class="form-inline">
    <div class="main-container container-fluid" style="padding-left: 0px; padding-right: 0px;">
        <div class="main-content" style="padding-left: 0px; padding-right: 0px;">
            <div class="page-content" >

                <div class="modal-body" id="searchTable" style="padding: 5px 0px;">
                    <div class="row">
                        <div class="col-md-2">
                            <label class="control-label" title="">设变号：</label>
                            <input class="form-control-order form-control clean" ng-model="pageTool.searchForm.tkNo" style="margin-left: 0px;padding: 1px 1px;font-size: 12px;margin-right: 0px;height: 25px;">
                        </div>
                        <div class="col-md-8">
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-small btn-purple" type="button" ng-click="pageTool.search()">
                                <i class="icon-search icon-on-right bigger-110"></i>查找
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
                            <td width="40px" class="common-table-td">类型</td>
                            <td width="60px" class="common-table-td">设变号</td>
                            <td width="60px" class="common-table-td">客户设变号</td>
                            <td width="60px" class="common-table-td">客户</td>
                            <td width="60px" class="common-table-td">车种名</td>
                            <td width="60px" class="common-table-td">切替时间</td>
                            <td width="60px" class="common-table-td">版本</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="data in alterationKirikaeOrderHistoryList">
                            <td>
                                <span ng-if="data.kirikaeOrderType == 1">量产前</span>
                                <span ng-if="data.kirikaeOrderType == 2">量产后</span>
                            </td>
                            <td>
                                <a href="<%=request.getContextPath()%>/alteration/history/getDetailDialog.do?id={{data.alterationOrderId}}" target="_blank">{{data.tkNo}}</a>
                            </td>
                            <td>{{data.designChangeNo}}</td>
                            <td>{{data.customer}}</td>
                            <td>{{data.vehicleName}}</td>
                            <td>{{data.designChangeTiming | date:"yyyy-MM-dd"}}</td>
                            <td>{{data.orderVersion}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class = "tfoot" id="footTable">
                    <div class="table-foot-center">
                        <button class="" ng-disabled="pageTool.firstPageDisabled" ng-click="pageTool.firstPage()">
                            <span class="glyphicon glyphicon-step-backward "></span>
                        </button>
                        <button class="" ng-disabled="pageTool.prevPageDisabled" ng-click="pageTool.prevPage()">
                            <span class="glyphicon glyphicon-backward"></span>
                        </button>
                        <span class="separator"></span>
                        <span class="page">{{pageTool.page}}&nbsp;/&nbsp;{{pageTool.totalPage}}&nbsp; </span>
                        <span class="separator"></span>
                        <button class="" ng-disabled="pageTool.nextPageDisabled" ng-click="pageTool.nextPage()">
                            <span class="glyphicon glyphicon-forward "></span>
                        </button>
                        <button class="" ng-disabled="pageTool.lastPageDisabled" ng-click="pageTool.lastPage()">
                            <span class="glyphicon glyphicon-step-forward  "></span>
                        </button>
                        <span class="separator"></span> <span>共{{pageTool.totalCount}}条</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
</body>
<script src="<%=request.getContextPath()%>/js/module/kirikae/order/kirikaeOrderHistoryList.js"></script>
</html>