<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>立合人员填写页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="kirikaeStandCloseController" ng-cloak>
<form class="form-inline" id="kirikaeStandCloseForm" >
    <input type="hidden" name="orderId" id="id">
    <div class="main-container container-fluid" style="padding-left: 0px; padding-right: 0px;">
        <div class="main-content" style="padding-left: 0px; padding-right: 0px;">
            <div class="page-content">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="block" style="margin-top: 0px; margin-bottom: 0px;padding: 5px 0px;">
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>立合人员
                                </div>
                            </div>
                            <div class="modal-body" style="padding-top: 0px; padding-bottom: 0px;">
                                <div class="row" ng-repeat="dataArray in kirikaeStandCloseOrgList">
                                        <div class="col-md-3" ng-repeat="data in dataArray">
                                            <label class="control-label" title="">{{data.orgName}}：</label>
                                            <select title="" id="org_{{data.orgId}}" multiple="multiple"
                                                    class="form-control-order form-control clean chosen-select">
                                                <option ng-repeat="userData in systemUserList | attrFilter:data.orgId" value="{{userData.userName}}">{{userData.userName}}</option>
                                            </select>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body" style="padding: 0px;">
                    <div class="modal-footer">
                        <button type="button" ng-click="addKirikaeStandClose()"
                                class="btn btn-small btn-primary">确定</button>
                        <button type="button" ng-click="closeKirikaeStandClose()"
                                class="btn btn-small btn-primary">取消
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
</body>
<script src="<%=request.getContextPath()%>/js/module/kirikae/stand/kirikaeStandClose.js"></script>
</html>
