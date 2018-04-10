<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>切替变更单管理页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="kirikaeOrderAddOrEditController" ng-cloak>
<form class="form-inline" id="kirikaeOrderAddOrEditForm" >
    <input type="hidden" name="id" id="id">
    <input type="hidden" name="orderChannel" id="orderChannel">
    <input type="hidden" name="kirikaeOrder.id" id="kirikaeOrder.id">
    <div class="main-container container-fluid">
        <div class="main-content">
            <div class="page-content">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="block" style="margin-top: 0px; margin-bottom: 0px;">
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>切替信息
                                </div>
                            </div>
                            <div class="modal-body" style="padding-top: 0px; padding-bottom: 0px;">
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">切替单类型：</label>
                                        <select title="" id="kirikaeOrder.kirikaeOrderType" name="kirikaeOrder.kirikaeOrderType"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.kirikaeOrderType==1">量产前</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.kirikaeOrderType==2">量产后</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">切替号：</label>
                                        <input title="" id="kirikaeOrder.tkNo" name="kirikaeOrder.tkNo"
                                               ng-model="alterationOrder.kirikaeOrder.tkNo" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">设变号：</label>
                                        <input title="" id="kirikaeOrder.designChangeNo" name="kirikaeOrder.designChangeNo"
                                               ng-model="alterationOrder.kirikaeOrder.designChangeNo" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">客户协议：</label>
                                        <select title="" id="kirikaeOrder.salesCustomerProtocal" name="kirikaeOrder.salesCustomerProtocal"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="0" ng-selected="alterationOrder.kirikaeOrder.salesCustomerProtocal==0">否</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.salesCustomerProtocal==1">是</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">营业-日期：</label>
                                        <input title="" id="kirikaeOrder.salesDate" name="kirikaeOrder.salesDate" data-type="date"
                                               ng-model="alterationOrder.kirikaeOrder.salesDate" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">营业-承认：</label>
                                        <input title="" id="kirikaeOrder.salesApproved" name="kirikaeOrder.salesApproved"
                                               ng-model="alterationOrder.kirikaeOrder.salesApproved" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">营业-确认：</label>
                                        <input title="" id="kirikaeOrder.salesChecked" name="kirikaeOrder.salesChecked"
                                               ng-model="alterationOrder.kirikaeOrder.salesChecked" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">营业-担当：</label>
                                        <input title="" id="kirikaeOrder.salesPrepared" name="kirikaeOrder.salesPrepared"
                                               ng-model="alterationOrder.kirikaeOrder.salesPrepared" class="form-control-order form-control clean">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">设计-日期：</label>
                                        <input title="" id="kirikaeOrder.engineeringData" name="kirikaeOrder.engineeringData" data-type="date"
                                               ng-model="alterationOrder.kirikaeOrder.engineeringData" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">设计-承认：</label>
                                        <input title="" id="kirikaeOrder.engineeringApproved" name="kirikaeOrder.engineeringApproved"
                                               ng-model="alterationOrder.kirikaeOrder.engineeringApproved" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">设计-确认：</label>
                                        <input title="" id="kirikaeOrder.engineeringChecked" name="kirikaeOrder.engineeringChecked"
                                               ng-model="alterationOrder.kirikaeOrder.engineeringChecked" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">设计-担当：</label>
                                        <input title="" id="kirikaeOrder.engineeringPrepared" name="kirikaeOrder.engineeringPrepared"
                                               ng-model="alterationOrder.kirikaeOrder.engineeringPrepared" class="form-control-order form-control clean">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">客户：</label>
                                        <input title="" id="kirikaeOrder.customer" name="kirikaeOrder.customer"
                                               ng-model="alterationOrder.kirikaeOrder.customer" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">车种名：</label>
                                        <input title="" id="kirikaeOrder.vehicleName" name="kirikaeOrder.vehicleName"
                                               ng-model="alterationOrder.kirikaeOrder.vehicleName" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">销售地：</label>
                                        <input title="" id="kirikaeOrder.destination" name="kirikaeOrder.destination"
                                               ng-model="alterationOrder.kirikaeOrder.destination" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">初回品处理：</label>
                                        <select title="" id="kirikaeOrder.isirProcessing" name="kirikaeOrder.isirProcessing"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.isirProcessing==1">要</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.isirProcessing==2">不要</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">客户技术承认：</label>
                                        <select title="" id="kirikaeOrder.customerEngineering" name="kirikaeOrder.customerEngineering"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.customerEngineering==1">要</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.customerEngineering==2">不要</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">需要承认：</label>
                                        <select title="" id="kirikaeOrder.customerEngineeringApproval" name="kirikaeOrder.customerEngineeringApproval"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.customerEngineeringApproval==1">承认</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.customerEngineeringApproval==2">未承认</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">法规关系：</label>
                                        <select title="" id="kirikaeOrder.regulation" name="kirikaeOrder.regulation"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.regulation==1">有</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.regulation==2">无</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">有关系：</label>
                                        <select title="" id="kirikaeOrder.regulationApproval" name="kirikaeOrder.regulationApproval"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.regulationApproval==1">认可</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.regulationApproval==2">不认可</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">互换性-旧：</label>
                                        <select title="" id="kirikaeOrder.interchangeabilityOld" name="kirikaeOrder.interchangeabilityOld"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="A" ng-selected="alterationOrder.kirikaeOrder.interchangeabilityOld=='A'">A</option>
                                            <option value="B" ng-selected="alterationOrder.kirikaeOrder.interchangeabilityOld=='B'">B</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">互换性-新：</label>
                                        <select title="" id="kirikaeOrder.interchangeabilityNew" name="kirikaeOrder.interchangeabilityNew"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="C" ng-selected="alterationOrder.kirikaeOrder.interchangeabilityNew=='C'">C</option>
                                            <option value="D" ng-selected="alterationOrder.kirikaeOrder.interchangeabilityNew=='D'">D</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">售后服务：</label>
                                        <select title="" id="kirikaeOrder.serviceSuplied" name="kirikaeOrder.serviceSuplied"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.serviceSuplied==1">有</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.serviceSuplied==2">无</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">模具设变费：</label>
                                        <select title="" id="kirikaeOrder.designCosts" name="kirikaeOrder.designCosts"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.designCosts==1">有</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.designCosts==2">无</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">模具费承担：</label>
                                        <select title="" id="kirikaeOrder.designCostsPay" name="kirikaeOrder.designCostsPay"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.designCostsPay==1">客户</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.designCostsPay==2">均胜</option>
                                            <option value="3" ng-selected="alterationOrder.kirikaeOrder.designCostsPay==3">供应商</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">客户手配书：</label>
                                        <input title="" id="kirikaeOrder.customerEo" name="kirikaeOrder.customerEo"
                                               ng-model="alterationOrder.kirikaeOrder.customerEo" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">品号变更：</label>
                                        <select title="" id="kirikaeOrder.partsNumberChange" name="kirikaeOrder.partsNumberChange"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.partsNumberChange==1">有</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.partsNumberChange==2">无</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">切替现场确认：</label>
                                        <select title="" id="kirikaeOrder.presenceRequired" name="kirikaeOrder.presenceRequired"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.presenceRequired==1">需要</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.presenceRequired==2">不需要</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">切替时间：</label>
                                        <input title="" id="kirikaeOrder.designChangeTiming" name="kirikaeOrder.designChangeTiming" data-type="date"
                                               ng-model="alterationOrder.kirikaeOrder.designChangeTiming" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">切替类型：</label>
                                        <select title="" id="kirikaeOrder.desingChangeType" name="kirikaeOrder.desingChangeType"
                                                class="form-control-order form-control clean">
                                            <option value="">请选择</option>
                                            <option value="1" ng-selected="alterationOrder.kirikaeOrder.desingChangeType==1">均胜</option>
                                            <option value="2" ng-selected="alterationOrder.kirikaeOrder.desingChangeType==2">客户</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">制造内线：</label>
                                        <input title="" id="kirikaeOrder.manufactureInternal" name="kirikaeOrder.manufactureInternal"
                                               ng-model="alterationOrder.kirikaeOrder.manufactureInternal" class="form-control-order form-control clean">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">制造担当：</label>
                                        <input title="" id="kirikaeOrder.manufacturePrepared" name="kirikaeOrder.manufacturePrepared"
                                               ng-model="alterationOrder.kirikaeOrder.manufacturePrepared" class="form-control-order form-control clean">
                                    </div>
                                </div>
                                <div class="common-table-header">
                                    <button class="btn btn-small btn-success" type="button" style="padding-top: 0px;" ng-click="addKirikaeOrderChangeContent()">
                                        <i class="icon-plus-sign icon-on-right bigger-110"></i>新增
                                    </button>
                                    <span>设变内容</span>
                                </div>
                                <div>
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th class="common-table-td" width="20%">变更前</th>
                                                <th class="common-table-td" width="25%">附件</th>
                                                <th class="common-table-td" width="20%">变更后</th>
                                                <th class="common-table-td" width="25">附件</th>
                                                <th class="common-table-td" width="10%">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr ng-repeat="data in alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList">
                                                <td>
                                                    <input title="" id="kirikaeOrder.kirikaeOrderChangeContentList[{{$index}}].beforeChange" name="kirikaeOrder.kirikaeOrderChangeContentList[{{$index}}].beforeChange"
                                                           ng-model="alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList[$index].beforeChange" class="form-control-order form-control clean" style="width: 95%" />
                                                </td>
                                                <td>
                                                    <input type="hidden" id="kirikaeOrder.kirikaeOrderChangeContentList[{{$index}}].beforeFileId" name="kirikaeOrder.kirikaeOrderChangeContentList[{{$index}}].beforeFileId"
                                                           ng-model="alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList[$index].beforeFileId" class="form-control-order form-control clean" />
                                                    <button class="btn btn-small btn-purple" type="button" ng-click="uploadBeforeFile($index)">
                                                        <i class="icon-edit icon-on-right bigger-110"></i>上传
                                                    </button>
                                                    {{data.beforeFileName}}
                                                </td>
                                                <td>
                                                    <input title="" id="kirikaeOrder.kirikaeOrderChangeContentList[{{$index}}].afterChange" name="kirikaeOrder.kirikaeOrderChangeContentList[{{$index}}].afterChange"
                                                           ng-model="alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList[$index].afterChange" class="form-control-order form-control clean" style="width: 95%" />
                                                </td>
                                                <td>
                                                    <input type="hidden" id="kirikaeOrder.kirikaeOrderChangeContentList[{{$index}}].newFileId" name="kirikaeOrder.kirikaeOrderChangeContentList[{{$index}}].newFileId"
                                                           ng-model="alterationOrder.kirikaeOrder.kirikaeOrderChangeContentList[$index].newFileId" class="form-control-order form-control clean" />
                                                    <button class="btn btn-small btn-purple" type="button" ng-click="uploadNewFile($index)">
                                                        <i class="icon-edit icon-on-right bigger-110"></i>上传
                                                    </button>
                                                    {{data.newFileName}}
                                                </td>
                                                <td>
                                                    <button class="btn btn-small btn-purple" type="button" ng-click="delKirikaeOrderChangeContent($index)">
                                                        <i class="icon-edit icon-on-right bigger-110"></i>删除
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style="height: 10px;"></div>
                                <div class="common-table-header">
                                    <button class="btn btn-small btn-success" type="button" style="padding-top: 0px;" ng-click="addKirikaeOrderPartsNumber()">
                                        <i class="icon-plus-sign icon-on-right bigger-110"></i>新增
                                    </button>
                                    <span>对象部品及品号</span>
                                </div>
                                <div>
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th class="common-table-td" width="45%">变更前</th>
                                                <th class="common-table-td" width="45%">变更后</th>
                                                <th class="common-table-td" width="10%">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr ng-repeat="data in alterationOrder.kirikaeOrder.kirikaeOrderPartsNumberList">
                                                <td>
                                                    <input title="" id="kirikaeOrder.kirikaeOrderPartsNumberList[{{$index}}].oldPartsNumber" name="kirikaeOrder.kirikaeOrderPartsNumberList[{{$index}}].oldPartsNumber"
                                                           ng-model="alterationOrder.kirikaeOrder.kirikaeOrderPartsNumberList[$index].oldPartsNumber" class="form-control-order form-control clean" style="width: 95%" />
                                                </td>
                                                <td>
                                                    <input title="" id="kirikaeOrder.kirikaeOrderPartsNumberList[{{$index}}].newPattsNumber" name="kirikaeOrder.kirikaeOrderPartsNumberList[{{$index}}].newPattsNumber"
                                                           ng-model="alterationOrder.kirikaeOrder.kirikaeOrderPartsNumberList[$index].newPattsNumber" class="form-control-order form-control clean" style="width: 95%" />
                                                </td>
                                                <td>
                                                    <button class="btn btn-small btn-purple" type="button" ng-click="delKirikaeOrderPartsNumber($index)">
                                                        <i class="icon-edit icon-on-right bigger-110"></i>删除
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="modal-footer">
                        <button type="button" ng-click="addKirikaeOrder()"
                                class="btn btn-small btn-primary">确定</button>
                        <button type="button" ng-click="closeKirikaeOrder()"
                                class="btn btn-small btn-primary">取消
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<!--文件上传-->
<div id="fileUploadModal" class="modal fade" tabindex="-1"
     role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-body">
            <form class="form-inline" method='post' id='excelForm' enctype='multipart/form-data' action='<%=request.getContextPath()%>/system/file/fileUpload.do'>
                <input class="form-control-order form-control clean" style="width: 90%;" type='file' name='uploadFile' id='uploadFile'/>
                <button class="btn btn-small btn-purple" type="button" ng-click="uplodFile()">
                    <i class="icon-on-right bigger-110"></i>提交
                </button>
            </form>
        </div>
    </div>
</div>
<!--文件上传-->
</body>
<script src="<%=request.getContextPath()%>/js/module/kirikae/order/kirikaeOrderAddOrEdit.js"></script>
</html>
