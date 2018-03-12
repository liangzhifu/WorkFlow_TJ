<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>切替变更单评审页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="woAttrReviewController" ng-cloak>
<form class="form-inline" id="woAttrReviewForm">
    <input type="hidden" id="id" name="orderId">
    <div class="main-container container-fluid" style="padding-left: 0px; padding-right: 0px;">
        <div class="main-content" style="padding-left: 0px; padding-right: 0px;">
            <div class="page-content">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="block" style="margin-top: 0px; margin-bottom: 0px;padding: 5px 0px;">
                            <div class="block-header">
                                <div>
                                    <i class="icon-edit"></i>确认项目
                                </div>
                            </div>
                            <div style="padding-bottom: 10px;">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th class="common-table-td" width="6%">部门</th>
                                        <th class="common-table-td" width="12%">科室</th>
                                        <th class="common-table-td" width="9%">确认项目</th>
                                        <th class="common-table-td" width="20%">确认内容</th>
                                        <th class="common-table-td" width="10%">担当</th>
                                        <th class="common-table-td" width="10%">预计完成时间</th>
                                        <th class="common-table-td" width="10%">评审结果</th>
                                        <th class="common-table-td" width="10%">评审依据</th>
                                        <th class="common-table-td" width="6%">操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr ng-repeat="data in woAttrList">
                                        <td ng-hide="data.parentRowSpan == 0" rowspan="{{data.parentRowSpan}}" style="display:table-cell; vertical-align:middle">
                                            {{data.parentOrgName}}
                                        </td>
                                        <td ng-hide="data.rowSpan == 0" rowspan="{{data.rowSpan}}" style="display:table-cell; vertical-align:middle">
                                            {{data.orgName}}
                                            <button class="btn btn-small btn-success" type="button" ng-click="addConfirmDialg($index)">
                                                <i class="icon-plus-sign icon-on-right bigger-110"></i>增加
                                            </button>
                                        </td>
                                        <td>{{data.confirmProject}}</td>
                                        <td>{{data.confirmContent}}</td>
                                        <td>
                                            <select title="" id="kirikaeWoOrderAttrList[{{$index}}].preparedUser" name="kirikaeWoOrderAttrList[{{$index}}].preparedUser"
                                                    class="form-control-order form-control clean class-required" required="required"
                                                    style="font-size: 12px;height: 25px;width: 95%;padding: 0px;">
                                                <option value="">请选择</option>
                                                <option ng-repeat="userDate in systemUserList | attrFilter:data.orgId"
                                                        value="{{userDate.userId}}" ng-selected="userDate.userId == data.preparedUser">{{userDate.userName}}</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="hidden" id="kirikaeWoOrderAttrList[{{$index}}].id" name="kirikaeWoOrderAttrList[{{$index}}].id" value="{{data.id}}">
                                            <input type="hidden" id="kirikaeWoOrderAttrList[{{$index}}].questionId" name="kirikaeWoOrderAttrList[{{$index}}].questionId" value="{{data.questionId}}">
                                            <input title="" id="kirikaeWoOrderAttrList[{{$index}}].changeCompleteTime"
                                                   name="kirikaeWoOrderAttrList[{{$index}}].changeCompleteTime" data-type='date' value="{{data.changeCompleteTime}}"
                                                   class="form-control-order form-control clean class-required" required="required"
                                                   style="font-size: 12px;height: 25px;width: 95%" />
                                        </td>
                                        <td>
                                            <select title="" id="kirikaeWoOrderAttrList[{{$index}}].reviewResult" name="kirikaeWoOrderAttrList[{{$index}}].reviewResult"
                                                    class="form-control-order form-control clean class-required" required="required"
                                                    style="font-size: 12px;height: 25px;width: 95%;padding: 0px;">
                                                <option value="">请选择</option>
                                                <option value="NG">NG</option>
                                                <option value="OK">OK</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input title="" id="kirikaeWoOrderAttrList[{{$index}}].reviewPrinciple"
                                                   name="kirikaeWoOrderAttrList[{{$index}}].reviewPrinciple"
                                                   class="form-control-order form-control clean"
                                                   style="font-size: 12px;height: 25px;width: 95%" />
                                        </td>
                                        <td>
                                            <button class="btn btn-small btn-success" type="button" ng-click="deleteConfirm($index)">
                                                <i class="icon-on-right bigger-110"></i>删除
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-body" style="padding-top: 0px; padding-bottom: 0px;">
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="control-label" title="">评审结果：</label>
                                        <select title="" id="spareColumn" name="spareColumn"
                                                class="form-control-order form-control clean class-required" required="required"
                                                style="font-size: 12px;height: 25px;padding: 0px;">
                                            <option value="">请选择</option>
                                            <option value="NG">NG</option>
                                            <option value="OK">OK</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="control-label" title="">会议纪要：</label>
                                        <input type="hidden" id="fileId" name="fileId" data-target="fileName"/>
                                        <input type="text" id="fileName" class="form-control-order form-control clean" readonly>
                                        <button class="btn btn-small btn-purple" type="button" ng-click="uploadFileModal()">
                                            <i class="icon-edit icon-on-right bigger-110"></i>上传
                                        </button>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="control-label" title="">评审结论：</label>
                                        <textarea class="form-control-order form-control clean" style="width: 80%;padding: 0px;font-size: 12px;margin-left: 0px;"
                                                  rows="2" id="remark" name="remark"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-body" style="padding: 0px;">
                                <div class="modal-footer">
                                    <button type="button" ng-click="submitWoAttrReview()"
                                            class="btn btn-small btn-primary">确定</button>
                                    <button type="button" ng-click="closeWoAttrReview()"
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
<!--确认书增加-->
<div id="confirmAddModal" class="modal fade" tabindex="-1"
     role="dialog" aria-labelledby="confirmAddModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">×</button>
            <h3 id="confirmAddModalLabel"></h3>
        </div>
        <form class="form-inline" id="addOrEditRole" >
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <label class="control-label" title="">科室：</label>
                        <input type="text" title="" id="orgName" name="orgName" style="width: 80%"
                               class="form-control-order form-control clean" disabled>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label class="control-label" title="">确认项目：</label>
                        <select id="questionId" class="form-control-order form-control clean" style="width: 80%">
                            <option value="">请选择</option>
                            <option ng-repeat="question in questionList" value="{{question.id}}">{{question.confirmProject}}->{{question.confirmContent}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="modal-footer">
                    <button type="button" ng-click="addConfirm()"
                            class="btn btn-small btn-primary">确定</button>
                    <button type="button"
                            class="btn btn-small btn-primary" data-dismiss="modal">取消
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
<!--确认书增加-->

<!--文件上传-->
<div id="fileUploadModal" class="modal fade" tabindex="-1"
     role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-body">
            <form class="form-inline" method='post' id='excelForm' enctype='multipart/form-data'
                  action='<%=request.getContextPath()%>/system/file/fileUpload.do'>
                <div class="row">
                    <div class="col-md-12">
                        <input class="form-control-order form-control clean" type='file'
                               name='uploadFile' id='uploadFile' style="width: 100%; float: left; padding: 0px; margin-left: 0px;"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <button class="btn btn-small btn-purple" type="button" ng-click="uplodFile()">
                            <i class="icon-on-right bigger-110"></i>提交
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!--文件上传-->

</body>
<script src="<%=request.getContextPath()%>/js/module/kirikae/wo/woAttrReview.js"></script>
</html>