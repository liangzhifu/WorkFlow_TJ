var HTMLEditor = Ext.extend(Ext.form.HtmlEditor, {
    ieRange: false,
    addImage: function() {
        this.fireEvent('saveCursor', this.SaveRange);
        var editor = this;
        var imgform = new Ext.FormPanel({
            region: 'center',
            labelWidth: 55,
            frame: true,
            bodyStyle: 'padding:5px 5px 0',
            autoScroll: true,
            border: false,
            fileUpload: true,
            items: [{
                xtype: 'textfield',
                fieldLabel: '选择文件',
                name: 'userfile',
                id: 'userfile',
                inputType: 'file',
                allowBlank: false,
                blankText: '文件不能为空',
                height: 25,
                anchor: '98%'
            }],
            buttons: [{
                text: '上传',
                type: 'submit',
                handler: function() {
                    var furl = "";
                    furl = imgform.form.findField('userfile').getValue();
                    var type = furl.substring(furl.lastIndexOf(".") + 1).toLowerCase();
                    var filename = furl.substring(furl.lastIndexOf("\\") + 1);
                    if (furl == "" || furl == null) {
                        return;
                    }
                    if (type != 'jpg' && type != 'bmp' && type != 'gif' && type != 'png') {
                        alert('仅支持jpg、bmp、gif、png格式的图片');
                        return;
                    }
                    imgform.form.submit({
                        url: '../addFileInNewsServlet?fileIdsStr=' + filename + '&upload_instance=' + upload_instance,
                        waitMsg: '正在上传......',
                        waitTitle: '请等待',
                        method: 'POST',
                        success: function(form, action) {
                            thisSLoc = self.location.href.split("IOMPROJ");
                            thisUPage = thisSLoc[0];
                            var element = document.createElement("img");
                            element.src = "/IOMPROJ/" + action.result.fileURL;
                            if (Ext.isIE) {
                                editor.insertAtCursor(element.outerHTML);
                            } else {
                                var selection = editor.win.getSelection();
                                if (!selection.isCollapsed) {
                                    selection.deleteFromDocument();
                                }
                                selection.getRangeAt(0).insertNode(element);
                            }
                            form.reset();
                            win.close();
                        },
                        failure: function(form, action) {
                            form.reset();
                            if (action.failureType == Ext.form.Action.SERVER_INVALID) Ext.MessageBox.alert('警告', '上传失败，仅支持jpg、bmp、gif、png格式的图片');

                        }

                    });
                }
            },
            {
                text: '关闭',
                type: 'submit',
                handler: function() {
                    win.close(this);
                }
            }]
        })

        var win = new Ext.Window({
            title: "上传图片",
            id: 'picwin',
            width: 400,
            height: 120,
            modal: true,
            border: false,

            layout: "fit",
            items: imgform

        });
        win.show();
    },
    addFile: function() {
        this.fireEvent('saveCursor', this.SaveRange);
        var editor = this;
        var fileform = new Ext.FormPanel({
            region: 'center',
            labelWidth: 55,
            frame: true,
            bodyStyle: 'padding:5px 5px 0',
            autoScroll: true,
            border: false,
            fileUpload: true,
            items: [{
                xtype: 'textfield',
                fieldLabel: '选择文件',
                name: 'userfile',
                id: 'userfile',
                inputType: 'file',
                allowBlank: false,
                blankText: '文件不能为空',
                height: 25,
                anchor: '98%'
            }],
            buttons: [{
                text: '上传',
                type: 'submit',
                handler: function() {
                    var furl = ""; //文件物理地址
                    var fname = ""; //文件名称
                    furl = fileform.form.findField('userfile').getValue();
                    var type = furl.substring(furl.lastIndexOf(".") + 1).toLowerCase();
                    if (furl == "" || furl == null) {
                        return;
                    }
                    if (type != 'doc' && type != 'xls' && type != 'txt' && type != 'docx' && type != 'xlsx') {
                        alert('仅支持上传doc,xls,docx,xlsx,txt格式的文件!');
                        return;
                    }
                    fname = furl.substring(furl.lastIndexOf("\\") + 1);
                    fileform.form.submit({
                        url: '../addFileInNewsServlet?fileIdsStr=' + fname + '&upload_instance=' + upload_instance,
                        waitMsg: '正在上传......',
                        waitTitle: '请等待',
                        method: 'POST',
                        success: function(form, action) {
                            thisSLoc = self.location.href.split("IOMPROJ");
                            thisUPage = thisSLoc[0];
                            var element = document.createElement("a");
                            element.href = thisUPage + "IOMPROJ/" + action.result.fileURL;
                            element.target = '_blank';
                            element.innerHTML = fname;
                            if (Ext.isIE) {
                                editor.insertAtCursor(element.outerHTML);
                            } else {
                                var selection = editor.win.getSelection();
                                if (!selection.isCollapsed) {
                                    selection.deleteFromDocument();
                                }
                                selection.getRangeAt(0).insertNode(element);
                            }
                            form.reset();
                            winFile.close();
                        },
                        failure: function(form, action) {
                            form.reset();
                            if (action.failureType == Ext.form.Action.SERVER_INVALID) Ext.MessageBox.alert('警告', '上传失败，仅支持上传doc,xls,txt格式的文件!');

                        }

                    });
                }
            },
            {
                text: '关闭',
                type: 'submit',
                handler: function() {
                    winFile.close(this);
                }
            }]
        })

        var winFile = new Ext.Window({
            title: "上传附件",
            id: 'picwin',
            width: 400,
            height: 120,
            modal: true,
            border: false,

            layout: "fit",
            items: fileform

        });
        winFile.show();
    },
    createToolbar: function(editor) {
        HTMLEditor.superclass.createToolbar.call(this, editor);
        this.tb.insertButton(16, {
            cls: "x-btn-icon",
            icon: "image_add.png",
            handler: this.addImage,
            scope: this
        });
        this.tb.insertButton(17, {
            cls: "x-btn-icon",
            icon: "pasteword.gif",
            handler: this.addFile,
            scope: this
        });
    },
    insertAtCursor : function(text){
        if(!this.activated){
            this.win.focus();
        }
	    if(this.ieRange){
			this.ieRange.pasteHTML(text);
			text='';
			this.ieRange.select();
			this.ieRange=false;//清空下range对象
		}else {
            this.win.focus();
			if(Ext.isIE){
				var doc = this.getDoc();
				//r = doc.selection.createRange();
				//if(r){
				//r.pasteHTML(text);
				doc.body.innerHTML+=text;
				this.syncValue();
				this.deferFocus();
				//}
			}else{
				this.win.focus();
				this.execCmd('InsertHTML', text);
				this.deferFocus();
			}
		}
    },
    
    initComponent : function(){
        this.addEvents(
            
            'initialize',
            
            'activate',
             
            'beforesync',
             
            'beforepush',
             
            'sync',
             
            'push',
             
            'editmodechange',

			'saveCursor'
        );
    },
	SaveRange : function(){//IE下保存Range对象
        if(Ext.isIE&&!this.ieRange){//是否IE并且判断是否保存过Range对象
            var sel = this.getDoc().selection;
            this.ieRange=sel.createRange();
            if(sel.type!='Control'){//选择的不是对象
                var p=this.ieRange.parentElement();//判断是否在编辑器内
                if(p.tagName=="INPUT"||p==document.body){
					this.ieRange=false;
				}
            }
        }
    }
});
Ext.reg('Szj_StarHtmleditor', HTMLEditor);