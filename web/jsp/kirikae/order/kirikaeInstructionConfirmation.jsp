<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>指示确认书页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="kirikaeInstructionConfirmationController" ng-cloak>
<form class="form-inline" id="kirikaeInstructionConfirmationForm" >
    <div class="main-container container-fluid" style="padding-left: 0px; padding-right: 0px;">
        <div class="main-content" style="padding-left: 0px; padding-right: 0px;">
            <div class="page-content">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="block" style="margin-top: 0px; margin-bottom: 0px;padding: 5px 0px;">
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>指示书
                                </div>
                            </div>
                            <div class="modal-body" style="padding-top: 0px; padding-bottom: 0px;">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label class="control-label" title="">部品订单切替日期：</label>
                                        <input title="" id="orderKirikae" name="orderKirikae" data-type="date" disabled
                                               class="form-control-order form-control clean" ng-model="kirikaeInstruction.orderKirikae">
                                    </div>
                                    <div class="col-md-4">
                                        <label class="control-label" title="">客户纳入切替日期：</label>
                                        <input title="" id="customerKirikae" name="customerKirikae" data-type="date" disabled
                                               class="form-control-order form-control clean" ng-model="kirikaeInstruction.customerKirikae">
                                    </div>
                                    <div class="col-md-4">
                                        <label class="control-label" title="">发行日期：</label>
                                        <input title="" data-type="date" disabled
                                               class="form-control-order form-control clean" ng-model="kirikaeInstruction.releaseDate">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <label class="control-label" title="">工厂：</label>
                                    <input title="" disabled
                                           ng-model="kirikaeInstruction.factory" class="form-control-order form-control clean">
                                </div>
                                <div class="col-md-4">
                                    <label class="control-label" title="">客户设变通知书：</label>
                                    <select title="" id="customerDesignChangeNotification" name="customerDesignChangeNotification"
                                            class="form-control-order form-control clean" disabled>
                                        <option value="">请选择</option>
                                        <option value="0" ng-selected="kirikaeInstruction.customerDesignChangeNotification == 0">未得到</option>
                                        <option value="1" ng-selected="kirikaeInstruction.customerDesignChangeNotification == 1">已得到</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="control-label" title="">客户技术承认：</label>
                                    <select title="" id="customerTechnologyApproval" name="customerTechnologyApproval"
                                            class="form-control-order form-control clean" disabled>
                                        <option value="">请选择</option>
                                        <option value="0" ng-selected="kirikaeInstruction.customerTechnologyApproval == 0">未得到</option>
                                        <option value="1" ng-selected="kirikaeInstruction.customerTechnologyApproval == 1">已得到</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <label class="control-label" title="">法规认可：</label>
                                    <select title="" id="certificationApproval" name="certificationApproval"
                                            class="form-control-order form-control clean" disabled>
                                        <option value="">请选择</option>
                                        <option value="0" ng-selected="kirikaeInstruction.certificationApproval == 0">未认可</option>
                                        <option value="1" ng-selected="kirikaeInstruction.certificationApproval == 1">已认可</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="control-label" title="">初回品处理：</label>
                                    <select title="" id="isirProcession" name="isirProcession" disabled
                                            class="form-control-order form-control clean">
                                        <option value="">请选择</option>
                                        <option value="1" ng-selected="kirikaeInstruction.isirProcession == 1">要</option>
                                        <option value="0" ng-selected="kirikaeInstruction.isirProcession == 0">不要</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="control-label" title="">初回品标识添附：</label>
                                    <select title="" id="isirMarking" name="isirMarking" disabled
                                            class="form-control-order form-control clean">
                                        <option value="">请选择</option>
                                        <option value="1" ng-selected="kirikaeInstruction.isirMarking == 1">要</option>
                                        <option value="0" ng-selected="kirikaeInstruction.isirMarking == 0">不要</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <label class="control-label" title="">初回品通知书发行：</label>
                                    <select title="" id="isirNotificationIssued" name="isirNotificationIssued" disabled
                                            class="form-control-order form-control clean">
                                        <option value="">请选择</option>
                                        <option value="1" ng-selected="kirikaeInstruction.isirNotificationIssued == 1">要</option>
                                        <option value="0" ng-selected="kirikaeInstruction.isirNotificationIssued == 0">不要</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="control-label" title="">生产批次：</label>
                                    <input title="" disabled
                                           ng-model="kirikaeInstruction.productionBatch" class="form-control-order form-control clean">
                                </div>
                                <div class="col-md-4">
                                </div>
                            </div>
                        </div>
                        <div class="block" style="margin-top: 0px; margin-bottom: 0px;padding: 5px 0px;">
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>确认书
                                </div>
                            </div>
                            <div class="modal-body" style="padding-top: 0px; padding-bottom: 0px;">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label class="control-label" title="">日期：</label>
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
                                        <input title="" id="productionBatch" name="factory"disabled
                                               ng-model="kirikaeConfirmation.productionBatch" class="form-control-order form-control clean">
                                    </div>
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
<script src="<%=request.getContextPath()%>/js/module/kirikae/order/kirikaeInstructionConfirmation.js"></script>
</html>
