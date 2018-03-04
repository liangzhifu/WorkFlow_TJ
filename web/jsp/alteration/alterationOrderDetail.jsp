<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>切替变更单管理页面</title>
    <%@include file="../public/css.jsp"%>
    <%@include file="../public/js.jsp"%>
    <style>
        a{color:#000}
        a:hover{color:red}
    </style>
</head>
<body ng-controller="alterationOrderDetailController" ng-cloak>
<form class="form-inline" id="alterationOrderDetailForm">
    <input type="hidden" id="id" name="id">
    <input type="hidden" id="orderChannel" name="orderChannel">
    <input type="hidden" id="kirikaeOrder.id" name="kirikaeOrder.id">
    <div class="main-container container-fluid" style="padding-left: 0px; padding-right: 0px;">
        <div class="main-content" style="padding-left: 0px; padding-right: 0px;">
            <div class="page-content">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="block" style="margin-top: 0px; margin-bottom: 0px;padding: 5px 0px;">
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>切替信息
                                </div>
                            </div>
                            <div class="modal-body" style="padding-top: 0px; padding-bottom: 0px;">
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title=""><span style="color:red;">*</span>设变类型：</label>
                                        <select title="" id="kirikaeOrder.kirikaeOrderType" name="kirikaeOrder.kirikaeOrderType" disabled
                                                class="form-control-order form-control clean" required="required" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.kirikaeOrderType==1">量产前</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.kirikaeOrderType==2">量产后</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title=""><span style="color:red;">*</span>切替状态：</label>
                                        <select title="" id="kirikaeOrder.kirikaeOrderState" name="kirikaeOrder.kirikaeOrderState" disabled
                                                class="form-control-order form-control clean" required="required" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.kirikaeOrderState==1">已切替</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.kirikaeOrderState==2">切替注意</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.kirikaeOrderState==3">切替日已过</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.kirikaeOrderState==4">随切/特定切</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.kirikaeOrderState==5">废除</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title=""><span style="color:red;">*</span>设变号：</label>
                                        <input title="" id="kirikaeOrder.tkNo" name="kirikaeOrder.tkNo" required="required" style="font-size: 12px;height: 25px;" disabled
                                               ng-model="alterationOrder.kirikaeOrder.tkNo" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">客户设变号：</label>
                                        <input title="" id="kirikaeOrder.designChangeNo" name="kirikaeOrder.designChangeNo" style="font-size: 12px;height: 25px;" disabled
                                               ng-model="alterationOrder.kirikaeOrder.designChangeNo" class="form-control-order form-control clean">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">营业-日期：</label>
                                        <input title="" id="kirikaeOrder.salesDate" name="kirikaeOrder.salesDate" data-type="date" style="font-size: 12px;height: 25px;" disabled
                                               ng-model="alterationOrder.kirikaeOrder.salesDate" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">营业-承认：</label>
                                        <input title="" id="kirikaeOrder.salesApproved" name="kirikaeOrder.salesApproved" style="font-size: 12px;height: 25px;" disabled
                                               ng-model="alterationOrder.kirikaeOrder.salesApproved" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">营业-确认：</label>
                                        <input title="" id="kirikaeOrder.salesChecked" name="kirikaeOrder.salesChecked" style="font-size: 12px;height: 25px;" disabled
                                               ng-model="alterationOrder.kirikaeOrder.salesChecked" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">营业-担当：</label>
                                        <input title="" id="kirikaeOrder.salesPrepared" name="kirikaeOrder.salesPrepared" style="font-size: 12px;height: 25px;" disabled
                                               ng-model="alterationOrder.kirikaeOrder.salesPrepared" class="form-control-order form-control clean">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">设计-日期：</label>
                                        <input title="" id="kirikaeOrder.engineeringData" name="kirikaeOrder.engineeringData" data-type="date" style="font-size: 12px;height: 25px;"
                                               ng-model="alterationOrder.kirikaeOrder.engineeringData" class="form-control-order form-control clean" disabled>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">设计-承认：</label>
                                        <input title="" id="kirikaeOrder.engineeringApproved" name="kirikaeOrder.engineeringApproved" style="font-size: 12px;height: 25px;" disabled
                                               ng-model="alterationOrder.kirikaeOrder.engineeringApproved" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">设计-确认：</label>
                                        <input title="" id="kirikaeOrder.engineeringChecked" name="kirikaeOrder.engineeringChecked" style="font-size: 12px;height: 25px;" disabled
                                               ng-model="alterationOrder.kirikaeOrder.engineeringChecked" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title=""><span style="color:red;">*</span>设计-担当：</label>
                                        <input title="" id="kirikaeOrder.engineeringPrepared" name="kirikaeOrder.engineeringPrepared" style="font-size: 12px;height: 25px;" disabled
                                               ng-model="alterationOrder.kirikaeOrder.engineeringPrepared" class="form-control-order form-control clean" required>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">客户协议：</label>
                                        <select title="" id="kirikaeOrder.salesCustomerProtocal" name="kirikaeOrder.salesCustomerProtocal" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="0" ng-selected="alterationOrder.kirikaeOrder.salesCustomerProtocal==0">否</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.salesCustomerProtocal==1">是</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">发行部门：</label>
                                        <input title="" id="kirikaeOrder.distributionDepartment" name="kirikaeOrder.distributionDepartment" style="font-size: 12px;height: 25px;" disabled
                                               ng-model="alterationOrder.kirikaeOrder.distributionDepartment" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title=""><span style="color:red;">*</span>客户：</label>
                                        <input title="" id="kirikaeOrder.customer" name="kirikaeOrder.customer" style="font-size: 12px;height: 25px;" required="required" disabled
                                               ng-model="alterationOrder.kirikaeOrder.customer" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title=""><span style="color:red;">*</span>车种名：</label>
                                        <input title="" id="kirikaeOrder.vehicleName" name="kirikaeOrder.vehicleName" style="font-size: 12px;height: 25px;" required="required"
                                               ng-model="alterationOrder.kirikaeOrder.vehicleName" class="form-control-order form-control clean" disabled>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">销售地：</label>
                                        <input title="" id="kirikaeOrder.destination" name="kirikaeOrder.destination" style="font-size: 12px;height: 25px;" disabled
                                               ng-model="alterationOrder.kirikaeOrder.destination" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">初回品处理：</label>
                                        <select title="" id="kirikaeOrder.isirProcessing" name="kirikaeOrder.isirProcessing" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.isirProcessing==1">要</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.isirProcessing==2">不要</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">客户技术承认：</label>
                                        <select title="" id="kirikaeOrder.customerEngineering" name="kirikaeOrder.customerEngineering" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.customerEngineering==1">要</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.customerEngineering==2">不要</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">需要承认：</label>
                                        <select title="" id="kirikaeOrder.customerEngineeringApproval" name="kirikaeOrder.customerEngineeringApproval"
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;" disabled>
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.customerEngineeringApproval==1">承认</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.customerEngineeringApproval==2">未承认</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">法规关系：</label>
                                        <select title="" id="kirikaeOrder.regulation" name="kirikaeOrder.regulation" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.regulation==1">有</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.regulation==2">无</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">有关系：</label>
                                        <select title="" id="kirikaeOrder.regulationApproval" name="kirikaeOrder.regulationApproval" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.regulationApproval==1">认可</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.regulationApproval==2">不认可</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">互换性-旧：</label>
                                        <select title="" id="kirikaeOrder.interchangeabilityOld" name="kirikaeOrder.interchangeabilityOld" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="A" ng-selected="alterationOrder.kirikaeOrder.interchangeabilityOld=='A'">A</option>
                                            <option value="B" ng-selected="alterationOrder.kirikaeOrder.interchangeabilityOld=='B'">B</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">互换性-新：</label>
                                        <select title="" id="kirikaeOrder.interchangeabilityNew" name="kirikaeOrder.interchangeabilityNew"
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;" disabled>
                                            <option value="">请选择</option>
                                            <option value="C" ng-selected="alterationOrder.kirikaeOrder.interchangeabilityNew=='C'">C</option>
                                            <option value="D" ng-selected="alterationOrder.kirikaeOrder.interchangeabilityNew=='D'">D</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">售后服务：</label>
                                        <select title="" id="kirikaeOrder.serviceSuplied" name="kirikaeOrder.serviceSuplied" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.serviceSuplied==1">有</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.serviceSuplied==2">无</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">模具设变费：</label>
                                        <select title="" id="kirikaeOrder.designCosts" name="kirikaeOrder.designCosts" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.designCosts==1">有</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.designCosts==2">无</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">模具费承担：</label>
                                        <select title="" id="kirikaeOrder.designCostsPay" name="kirikaeOrder.designCostsPay" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.designCostsPay==1">客户</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.designCostsPay==2">高田</option>
                                            <option value="3" ng-selected="alterationOrder.kirikaeOrder.designCostsPay==3">供应商</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">客户手配书：</label>
                                        <select title="" id="kirikaeOrder.customerEo" name="kirikaeOrder.customerEo" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.customerEo==1">有</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.customerEo==2">无</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">品号变更：</label>
                                        <select title="" id="kirikaeOrder.partsNumberChange" name="kirikaeOrder.partsNumberChange" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.partsNumberChange==1">有</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.partsNumberChange==2">无</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title=""><span style="color:red;">*</span>切替现场确认：</label>
                                        <select title="" id="kirikaeOrder.presenceRequired" name="kirikaeOrder.presenceRequired"
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;" required="required" disabled>
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.presenceRequired==1">需要</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.presenceRequired==2">不需要</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">切替时间：</label>
                                        <input title="" id="kirikaeOrder.designChangeTiming" name="kirikaeOrder.designChangeTiming" data-type="date" style="font-size: 12px;height: 25px;"
                                               ng-model="alterationOrder.kirikaeOrder.designChangeTiming" class="form-control-order form-control clean" disabled>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">切替类型：</label>
                                        <select title="" id="kirikaeOrder.desingChangeType" name="kirikaeOrder.desingChangeType" disabled
                                                class="form-control-order form-control clean" style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.desingChangeType==1">高田</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.desingChangeType==2">客户</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <label class="control-label" title="">制造内线：</label>
                                    <input title="" id="kirikaeOrder.manufactureInternal" name="kirikaeOrder.manufactureInternal" style="font-size: 12px;height: 25px;" disabled
                                           ng-model="alterationOrder.kirikaeOrder.manufactureInternal" class="form-control-order form-control clean">
                                </div>
                                <div class="col-md-3">
                                    <label class="control-label" title="">制造担当：</label>
                                    <input title="" id="kirikaeOrder.manufacturePrepared" name="kirikaeOrder.manufacturePrepared" style="font-size: 12px;height: 25px;" disabled
                                           ng-model="alterationOrder.kirikaeOrder.manufacturePrepared" class="form-control-order form-control clean">
                                </div>
                            </div>
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>设变内容
                                </div>
                            </div>
                            <div style="padding-bottom: 10px;">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th class="common-table-td" width="20%">变更前</th>
                                        <th class="common-table-td" width="25%">附件</th>
                                        <th class="common-table-td" width="20%">变更后</th>
                                        <th class="common-table-td" width="25">附件</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr ng-repeat="data in alterationOrder.kirikaeOrderChangeContentList">
                                        <td>
                                            <input title="" id="kirikaeOrderChangeContentList[{{$index}}].beforeChange"
                                                   name="kirikaeOrderChangeContentList[{{$index}}].beforeChange" disabled
                                                   ng-model="alterationOrder.kirikaeOrderChangeContentList[$index].beforeChange"
                                                   class="form-control-order form-control clean" style="width: 95%;font-size: 12px;height: 25px;" />
                                        </td>
                                        <td>
                                            <input type="hidden" id="kirikaeOrderChangeContentList[{{$index}}].beforeFileId"
                                                   name="kirikaeOrderChangeContentList[{{$index}}].beforeFileId" disabled
                                                   ng-model="alterationOrder.kirikaeOrderChangeContentList[$index].beforeFileId"
                                                   class="form-control-order form-control clean" />
                                            <a href="javascript:void(0)" ng-click="downloadFile(alterationOrder.kirikaeOrderChangeContentList[$index].beforeFileId)">{{data.beforeFileName}}</a>
                                        </td>
                                        <td>
                                            <input title="" id="kirikaeOrderChangeContentList[{{$index}}].afterChange"
                                                   name="kirikaeOrderChangeContentList[{{$index}}].afterChange" disabled
                                                   ng-model="alterationOrder.kirikaeOrderChangeContentList[$index].afterChange"
                                                   class="form-control-order form-control clean" style="width: 95%;font-size: 12px;height: 25px;" />
                                        </td>
                                        <td>
                                            <input type="hidden" id="kirikaeOrderChangeContentList[{{$index}}].newFileId"
                                                   name="kirikaeOrderChangeContentList[{{$index}}].newFileId" disabled
                                                   ng-model="alterationOrder.kirikaeOrderChangeContentList[$index].newFileId"
                                                   class="form-control-order form-control clean" />
                                            <a href="javascript:void(0)" ng-click="downloadFile(alterationOrder.kirikaeOrderChangeContentList[$index].newFileId)">{{data.newFileName}}</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>品号变更
                                </div>
                            </div>
                            <div style="padding-bottom: 10px;">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th class="common-table-td" width="45%">变更前</th>
                                        <th class="common-table-td" width="45%">变更后</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr ng-repeat="data in alterationOrder.kirikaeOrderPartsNumberList">
                                        <td>
                                            <input title="" id="kirikaeOrderPartsNumberList[{{$index}}].oldPartsNumber" disabled
                                                   name="kirikaeOrderPartsNumberList[{{$index}}].oldPartsNumber" required="required"
                                                   ng-model="alterationOrder.kirikaeOrderPartsNumberList[$index].oldPartsNumber"
                                                   class="form-control-order form-control clean required-class" style="font-size: 12px;height: 25px;width: 95%" />
                                        </td>
                                        <td>
                                            <input title="" id="kirikaeOrderPartsNumberList[{{$index}}].newPattsNumber" disabled
                                                   name="kirikaeOrderPartsNumberList[{{$index}}].newPattsNumber" required="required"
                                                   ng-model="alterationOrder.kirikaeOrderPartsNumberList[$index].newPattsNumber"
                                                   class="form-control-order form-control clean required-class" style="font-size: 12px;height: 25px;width: 95%" />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>履历
                                </div>
                            </div>
                            <div style="padding-bottom: 10px;">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th class="common-table-td" width="45%">内容</th>
                                        <th class="common-table-td" width="45%">当担</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr ng-repeat="data in alterationOrder.kirikaeResumeList">
                                        <td>
                                            <input title="" id="kirikaeResumeList[{{$index}}].description" disabled
                                                   name="kirikaeResumeList[{{$index}}].description" required="required"
                                                   ng-model="alterationOrder.kirikaeResumeList[$index].description"
                                                   class="form-control-order form-control clean required-class" style="font-size: 12px;height: 25px;width: 95%" />
                                        </td>
                                        <td>
                                            <input title="" id="kirikaeResumeList[{{$index}}].prepared" disabled
                                                   name="kirikaeResumeList[{{$index}}].prepared" required="required"
                                                   ng-model="alterationOrder.kirikaeResumeList[$index].prepared"
                                                   class="form-control-order form-control clean required-class" style="font-size: 12px;height: 25px;width: 95%" />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
</body>
<script src="<%=request.getContextPath()%>/js/module/alteration/alterationOrderDetail.js"></script>
</html>