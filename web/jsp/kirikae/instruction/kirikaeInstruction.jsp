<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>指示书填写页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="kirikaeInstructionController" ng-cloak>
    <form class="form-inline" id="kirikaeInstructionForm" >
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
                                            <input title="" id="orderKirikae" name="orderKirikae" data-type="date"
                                                   class="form-control-order form-control clean">
                                        </div>
                                        <div class="col-md-4">
                                            <label class="control-label" title="">客户纳入切替日期：</label>
                                            <input title="" id="customerKirikae" name="customerKirikae" data-type="date"
                                                   class="form-control-order form-control clean">
                                        </div>
                                        <div class="col-md-4">
                                            <label class="control-label" title="">发行日期：</label>
                                            <input title="" id="releaseDate" name="releaseDate" data-type="date"
                                                   class="form-control-order form-control clean">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <label class="control-label" title="">工厂：</label>
                                        <input title="" id="factory" name="factory"
                                               ng-model="kirikaeInstruction.factory" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-4">
                                        <label class="control-label" title="">客户设变通知书：</label>
                                        <select title="" id="customerDesignChangeNotification" name="customerDesignChangeNotification"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="0">未得到</option>
                                            <option value="1">已得到</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="control-label" title="">客户技术承认：</label>
                                        <select title="" id="customerTechnologyApproval" name="customerTechnologyApproval"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="0">未得到</option>
                                            <option value="1">已得到</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <label class="control-label" title="">法规认可：</label>
                                        <select title="" id="certificationApproval" name="certificationApproval"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="0">未认可</option>
                                            <option value="1">已认可</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="control-label" title="">初回品处理：</label>
                                        <select title="" id="isirProcession" name="isirProcession"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1">要</option>
                                            <option value="0">不要</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="control-label" title="">初回品标识添附：</label>
                                        <select title="" id="isirMarking" name="isirMarking"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1">要</option>
                                            <option value="0">不要</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <label class="control-label" title="">初回品通知书发行：</label>
                                        <select title="" id="isirNotificationIssued" name="isirNotificationIssued"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1">要</option>
                                            <option value="0">不要</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="control-label" title="">生产批次：</label>
                                        <input title="" id="productionBatch" name="factory"
                                               ng-model="kirikaeInstruction.productionBatch" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-4">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body" style="padding: 0px;">
                        <div class="modal-footer">
                            <button type="button" ng-click="addKirikaeInstruction()"
                                    class="btn btn-small btn-primary">确定</button>
                            <button type="button" ng-click="closeKirikaeInstruction()"
                                    class="btn btn-small btn-primary">取消
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
<script src="<%=request.getContextPath()%>/js/module/kirikae/instruction/kirikaeInstruction.js"></script>
</html>
