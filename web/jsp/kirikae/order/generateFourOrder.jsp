<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>切替变更单管理页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="generateFourOrderController" ng-cloak>
<form class="form-inline" id="generateFourOrderForm">
    <input type="hidden" id="id" name="orderId">
    <input title="hidden" name="userId" value="${userId}">
    <div class="main-container container-fluid" style="padding-left: 0px; padding-right: 0px;">
        <div class="main-content" style="padding-left: 0px; padding-right: 0px;">
            <div class="page-content">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="block" style="margin-top: 0px; margin-bottom: 0px;padding: 5px 0px;">
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>4M信息
                                </div>
                            </div>
                            <div class="modal-body" style="padding-top: 0px; padding-bottom: 0px;">
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">发行日期：</label>
                                        <input class="form-control-order form-control" type="text" disabled style="font-size: 12px;height: 25px;"
                                               id="fourOrder.releaseDate" name="order_10" ng-model="alterationOrder.fourOrder.releaseDate">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">发行编号：</label>
                                        <input class="form-control-order form-control" type="text" disabled style="font-size: 12px;height: 25px;"
                                               id="fourOrder.issueNumber" name="order_1" ng-model="alterationOrder.fourOrder.issueNumber">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">变更前品号：</label>
                                        <input class="form-control-order form-control" type="text" style="font-size: 12px;height: 25px;"
                                               id="fourOrder.changeBeforProductNo" name="order_12" ng-model="alterationOrder.fourOrder.changeBeforProductNo">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">变更后品号：</label>
                                        <input class="form-control-order form-control" type="text" style="font-size: 12px;height: 25px;"
                                               id="fourOrder.changeAfterProductNo" name="order_change_after_product_no" ng-model="alterationOrder.fourOrder.changeAfterProductNo">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">生产线：</label>
                                        <input class="form-control-order form-control" type="text" style="font-size: 12px;height: 25px;" required="required"
                                               id="fourOrder.productLine" name="order_2" ng-model="alterationOrder.fourOrder.productLine">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">车种名：</label>
                                        <select class="form-control-order form-control" type="text" style="font-size: 12px;height: 25px;padding: 0px;"
                                                id="fourOrder.carName" name="order_3" ng-model="alterationOrder.fourOrder.carName" required="required">
                                            <option value="">请选择</option>
                                            <option ng-repeat="data in carNameList" value="{{data.configValue}}">{{data.vehicleName}}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">安装席：</label>
                                        <input class="form-control-order form-control" type="text" style="font-size: 12px;height: 25px;" required="required"
                                               id="fourOrder.installationMat" name="order_4" ng-model="alterationOrder.fourOrder.installationMat">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">预计变更时间：</label>
                                        <input class="form-control-order form-control" type="text" style="font-size: 12px;height: 25px;" data-type="dateTypeTime" required="required"
                                               id="fourOrder.estimateChangeTime" name="order_11" ng-model="alterationOrder.fourOrder.estimateChangeTime">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label class="control-label" title="">制造部：</label>
                                        <div style="display: inline">
                                            <div ng-repeat="data in templateAttrList | attrFilter:6" style="display: inline">
                                                <input type="checkbox" class="form-checkbox-mypage" name="order_check_6"
                                                       id="order_attr_checkbox_6_{{data.id}}" value="1">{{data.attrName}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label class="control-label" title="">生产管理部：</label>
                                        <div style="display: inline">
                                            <div ng-repeat="data in templateAttrList | attrFilter:5" style="display: inline">
                                                <input type="checkbox" class="form-checkbox-mypage" name="order_check_5"
                                                       id="order_attr_checkbox_5_{{data.id}}" value="1">{{data.attrName}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">品质部：</label>
                                        <div ng-repeat="data in templateAttrList | attrFilter:7" style="display: inline">
                                            <input type="checkbox" class="form-checkbox-mypage" name="order_check_7"
                                                   id="order_attr_checkbox_7_{{data.id}}" value="1">{{data.attrName}}
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">其他：</label>
                                        <div ng-repeat="data in templateAttrList | attrFilter:8" style="display: inline">
                                            <input type="checkbox" class="form-checkbox-mypage" name="order_check_8"
                                                   id="order_attr_checkbox_8_{{data.id}}" value="1">{{data.attrName}}
                                            (<div style="display: inline">
                                            <input id="order_attr_checkbox_8_{{data.id}}_value" name="order_check_8_{{data.id}}_value">
                                        </div>)
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label class="control-label" title="">变更内容：</label>
                                        <textarea class="form-control-order form-control clean" style="width: 90%;padding: 0px;font-size: 12px;margin-left: 0px;" required="required"
                                                  rows="2" id="fourOrder.changeContent" name="order_9"
                                                  ng-model="alterationOrder.fourOrder.changeContent"></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">承认：</label>
                                        <select id="order_quality_confirm_staff_name" name="order_quality_confirm_staff_name"
                                                class="form-control-order form-control clean chosen-select chosen">
                                            <option value="">请选择</option>
                                            <option ng-repeat="data in systemUserList" value="{{data.id}}">{{data.userName}}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">确认：</label>
                                        <select id="order_group_confirm_staff_name" name="order_group_confirm_staff_name"
                                                class="form-control-order form-control clean chosen-select chosen">
                                            <option value="">请选择</option>
                                            <option ng-repeat="data in systemUserList" value="{{data.id}}">{{data.userName}}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">做成：</label>
                                        <select id="order_accept_confirm_staff_name" name="order_accept_confirm_staff_name"
                                                class="form-control-order form-control clean chosen-select chosen">
                                            <option value="">请选择</option>
                                            <option ng-repeat="data in systemUserList" value="{{data.id}}">{{data.userName}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-body" style="padding: 0px;">
                                <div class="modal-footer">
                                    <button type="button" ng-click="addFourOrder()"
                                            class="btn btn-small btn-primary">确定</button>
                                    <button type="button" ng-click="closeFourOrder()"
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
<script src="<%=request.getContextPath()%>/js/module/kirikae/order/generateFourOrder.js"></script>
</html>