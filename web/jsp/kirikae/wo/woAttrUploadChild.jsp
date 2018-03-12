<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>切替变更单管理页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="woAttrUploadChildController" ng-cloak>
<form class="form-inline" id="woAttrUploadChildForm">
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
                                        <th class="common-table-td" width="10%">部门</th>
                                        <th class="common-table-td" width="10%">科室</th>
                                        <th class="common-table-td" width="10%">确认项目</th>
                                        <th class="common-table-td" width="20%">确认内容</th>
                                        <th class="common-table-td" width="5%">担当</th>
                                        <th class="common-table-td" width="10%">预计完成时间</th>
                                        <th class="common-table-td" width="6%">评审结果</th>
                                        <th class="common-table-td" width="10%">评审依据</th>
                                        <th class="common-table-td" width="8%">评审日期</th>
                                        <th class="common-table-td" width="20%">操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr ng-repeat="data in woAttrList">
                                        <td ng-hide="data.parentRowSpan == 0" rowspan="{{data.parentRowSpan}}" style="display:table-cell; vertical-align:middle">
                                            {{data.parentOrgName}}
                                        </td>
                                        <td ng-hide="data.rowSpan == 0" rowspan="{{data.rowSpan}}" style="display:table-cell; vertical-align:middle">
                                            {{data.orgName}}
                                        </td>
                                        <td>{{data.confirmProject}}</td>
                                        <td>{{data.confirmContent}}</td>
                                        <td>{{data.preparedUserName}}</td>
                                        <td>
                                            <input title="" id="kirikaeWoOrderAttrList[{{$index}}].changeCompleteTime"
                                                   name="kirikaeWoOrderAttrList[{{$index}}].changeCompleteTime" data-type='date' value="{{data.changeCompleteTime}}"
                                                   class="form-control-order form-control clean class-required" required="required"
                                                   style="font-size: 12px;height: 25px;width: 95%" />
                                        </td>
                                        <td>{{data.reviewResult}}</td>
                                        <td>{{data.reviewPrinciple}}</td>
                                        <td>{{data.reviewTime}}</td>
                                        <td>
                                            <input type="hidden" id="kirikaeWoOrderAttrList[{{$index}}].id" name="kirikaeWoOrderAttrList[{{$index}}].id" value="{{data.id}}">
                                            <input type="hidden" id="kirikaeWoOrderAttrList[{{$index}}].fileId" name="kirikaeWoOrderAttrList[{{$index}}].fileId" value="{{data.fileId}}">
                                            <button class="btn btn-small btn-purple" type="button" ng-click="uploadNewFile($index)">
                                                <i class="icon-edit icon-on-right bigger-110"></i>上传
                                            </button>
                                            {{data.fileName}}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-body" style="padding: 0px;">
                                <div class="modal-footer">
                                    <button type="button" ng-click="submitWoAttrUpload()"
                                            class="btn btn-small btn-primary">确定</button>
                                    <button type="button" ng-click="closeWoAttrUpload()"
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
<script src="<%=request.getContextPath()%>/js/module/kirikae/wo/woAttrUploadChild.js"></script>
</html>