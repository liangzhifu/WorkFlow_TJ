<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>确认书确认页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="kirikaeConfirmationCheckedController" ng-cloak>
<form class="form-inline" id="kirikaeConfirmationCheckedForm" >
    <div class="main-container container-fluid" style="padding-left: 0px; padding-right: 0px;">
        <div class="main-content" style="padding-left: 0px; padding-right: 0px;">
            <div class="page-content">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="block" style="margin-top: 0px; margin-bottom: 0px;padding: 5px 0px;">
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>确认书
                                </div>
                            </div>
                            <div class="modal-body" style="padding-top: 0px; padding-bottom: 0px;">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label class="control-label" title="">发行日期：</label>
                                        <input title="" id="releaseDate" name="releaseDate" data-type="date" disabled
                                               class="form-control-order form-control clean" ng-model="kirikaeConfirmation.releaseDate">
                                    </div>
                                    <div class="col-md-4">
                                        <label class="control-label" title="">工厂：</label>
                                        <input title="" id="factory" name="factory" disabled
                                               ng-model="kirikaeConfirmation.factory" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-4">
                                        <label class="control-label" title="">生产批次：</label>
                                        <input title="" id="productionBatch" name="factory"
                                               ng-model="kirikaeConfirmation.productionBatch" class="form-control-order form-control clean">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body" style="padding: 0px;">
                    <div class="modal-footer">
                        <button type="button" ng-click="checkedKirikaeConfirmation()"
                                class="btn btn-small btn-primary">确定</button>
                        <button type="button" ng-click="closeKirikaeConfirmation()"
                                class="btn btn-small btn-primary">取消
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
</body>
<script src="<%=request.getContextPath()%>/js/module/kirikae/confirmation/kirikaeConfirmationChecked.js"></script>
</html>
