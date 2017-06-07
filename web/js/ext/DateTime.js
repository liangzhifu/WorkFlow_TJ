Ext.ns('Ext.ux.form');
Ext.ux.form.UxDateTime = Ext.extend(Ext.form.TriggerField, {
    initComponent : function(){
        Ext.ux.form.UxDateTime.superclass.initComponent.call(this);
        this.defaultTriggerWidth=25;
        this.readOnly = true;
    },
   
    initTrigger : function(){
        this.mon(this.trigger, 'click', this.onTriggerClick, this, {preventDefault:false});
    },
    
    onRender : function(ct, position){
        this.doc = Ext.isIE ? Ext.getBody() : Ext.getDoc();
        Ext.form.TriggerField.superclass.onRender.call(this, ct, position);
        this.wrap = this.el.wrap({cls: 'x-form-field-wrap x-form-field-trigger-wrap'});
        
        this.trigger = this.wrap.createChild(this.triggerConfig ||
              {tag: "img", src: "../../My97DatePicker/skin/datePicker.gif", alt: "", cls: "x-form-trigger "});
        this.initTrigger();
        if(!this.width){
            this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth());
        }
        this.resizeEl = this.positionEl = this.wrap;
    },
    
    //��ʵ���������Ⱦ�ķ������Ǽ̳���Component������ render ����.�Ӹ����Դ����Կ������������׶�beforerender,render,afterrender,��Ȼ��������һ�����ж�
    //��Ext.form.TriggerField �������afterrender���������ȥ���ø÷���
    updateEditState: function(){
    	if(this.rendered){
            if (this.readOnly) {
            	this.el.dom.readOnly = true;
                this.el.addClass('x-trigger-noedit');
                this.mun(this.el, 'click', this.onTriggerClick, this);
                this.trigger.setDisplayed(true);
            } else {
                if (!this.editable) {
                	this.el.dom.readOnly = true;
                    this.el.addClass('x-trigger-noedit');
                    this.mon(this.el, 'click', this.onTriggerClick, this);
                } else {
                	this.el.dom.readOnly = false;
                    this.el.removeClass('x-trigger-noedit');
                    this.mun(this.el, 'click', this.onTriggerClick, this);
                }
                this.trigger.setDisplayed(!this.hideTrigger);
            }
            this.onResize(this.width || this.wrap.getWidth());
        }
    },
    onTriggerClick : function(){
        //ͨ���������ȥ�ع���һ���Ի����ѡ����Ӧ��ʱ��
    	WdatePicker({el:this.el.dom.id,dateFmt:this.dateFmt});
    }
});