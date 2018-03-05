package com.success.kirikae.procedure.constant;

/**
 * @author lzf
 **/

public class ProcedureEnum {

    public enum ProcedureStateEnum{

        PROCEDURE_STATE_ONE(1, "初始化"),
        PROCEDURE_STATE_TWO(2, "处理中"),
        PROCEDURE_STATE_THREE(3, "已完成"),
        PROCEDURE_STATE_FOUR(4, "作废");

        private Integer code;

        private String msg;

        public Integer getCode() {
            return code;
        }

        public String getMsg() {
            return msg;
        }

        ProcedureStateEnum(Integer code, String msg) {
            this.code = code;
            this.msg = msg;
        }
    }

    public enum ProcedureCodeEnum{

        PROCEDURE_CONFIRM_SWITCH_DATE(1, "确认切换日期"),
        PROCEDURE_CONFIRM_CONTENT(2, "填写确认内容"),
        PROCEDURE_REVIEW(3, "评审"),
        PROCEDURE_FILE_UPLOAD(4, "文件上传"),
        PROCEDURE_STAND_CLOSE_USER(5, "立合--人员"),
        PROCEDURE_STAND_CLOSE_RESULT(6, "立合--结果"),
        PROCEDURE_STAND_CLOSE_CHECKED(7, "立合--确认"),
        PROCEDURE_STAND_CLOSE_APPROVED(8, "立合--承认"),
        PROCEDURE_INSTRUCTIONS_PREPARED(9, "指示书--担当"),
        PROCEDURE_INSTRUCTIONS_CHECKED(10, "指示书--确认"),
        PROCEDURE_INSTRUCTIONS_APPROVED(11, "指示书--承认"),
        PROCEDURE_CONFIRM_PREPARED(12, "确认书--担当"),
        PROCEDURE_CONFIRM_CHECKED(13, "确认书--确认"),
        PROCEDURE_CONFIRM_APPROVED(14, "确认书--承认"),
        PROCEDURE_CONFIRM_FOUR_ORDER(15, "4M变化单--建立");

        private Integer code;

        private String msg;

        public Integer getCode() {
            return code;
        }

        public String getMsg() {
            return msg;
        }

        ProcedureCodeEnum(Integer code, String msg) {
            this.code = code;
            this.msg = msg;
        }
    }

}
