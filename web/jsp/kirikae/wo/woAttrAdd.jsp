<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>切替变更单管理页面</title>
    <%@include file="../../public/css.jsp"%>
    <%@include file="../../public/js.jsp"%>
</head>
<body ng-controller="woAttrAddController" ng-cloak>
<form class="form-inline" id="woAttrAddForm">
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
                                        <th class="common-table-td" width="10%">担当</th>
                                        <th class="common-table-td" width="10%">预计完成时间</th>
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
                                        <td>
                                            <input type="checkbox" class="form-checkbox-mypage" name="woAttrChecked" value="{{$index}}">
                                            {{data.confirmProject}}
                                        </td>
                                        <td>{{data.confirmContent}}</td>
                                        <td>
                                            <select title="" id="woAttrList[{{$index}}].preparedUser" name="woAttrList[{{$index}}].preparedUser"
                                                    class="form-control-order form-control clean required-class" required="required"
                                                    style="font-size: 12px;height: 25px;width: 95%;padding: 0px;">
                                                <option value="">请选择</option>
                                                <option ng-repeat="userDate in systemUserList | attrFilter:data.orgId"
                                                        value="{{userDate.userId}}">{{userDate.userName}}</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input title="" id="woAttrList[{{$index}}].changeCompleteTime"
                                                   name="woAttrList[{{$index}}].changeCompleteTime" data-type='date'
                                                   class="form-control-order form-control clean"
                                                   style="font-size: 12px;height: 25px;width: 95%" />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-body" style="padding: 0px;">
                                <div class="modal-footer">
                                    <button type="button" ng-click="submitWoAttrAdd()"
                                            class="btn btn-small btn-primary">确定</button>
                                    <button type="button" ng-click="closeWoAttrAdd()"
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
<script src="<%=request.getContextPath()%>/js/module/kirikae/wo/woAttrAdd.js"></script>
</html>