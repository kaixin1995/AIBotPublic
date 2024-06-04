﻿var startdata = {
    output: {
        prItems: [],
    }
};
var javascriptdata = {
    output: {
        javascript: ""
    }
}
var httpdata = {
    output: {
        requestUrl: "",
        type: "",
        jsontemplate: "",
        paramsItems: [],
        headersItems: [],
        cookiesItems: [],
        judgescript: "",
        httpmaxcount: 10,
        httpdelayed: 0
    }
}
var LLMdata = {
    output: {
        aimodel: "",
        prompt: "",
        retry: 0,
        stream: false,
        jsonmodel: false,
        judgescript: "",
        llmmaxcount: 10
    }
}
var DALLdata = {
    output: {
        prompt: "",
        size: "",
        quality: "",
        retry: 0
    }
}
var DALLsmdata = {
    output: {
        prompt: "",
        retry: 0
    }
}
var webdata = {
    output: {
        prompt: ""
    }
}
var enddata = {
    output: {
        endaction: "",
        endscript: ""
    }
}
var ifelsedata = {
    output: {
        judgresult: ""
    }
}
var knowledgedata = {
    output: {
        prompt: "",
        retry: 0,
        topk: 3,
        typecode: []
    }
}
var regex = /'/;
function saveNodeData() {
    switch (thisNodeName) {
        case 'start':
            var rows = $('.parameters-table tr');
            var isEmpty = false; // 初始化空值标志
            startdata = {
                output: {
                    prItems: [],
                }
            };
            rows.each(function () {
                var columns = $(this).find('td');

                var PRname = columns.eq(0).find('input').val();
                var PRtype = columns.eq(1).find('select').val();
                var PRvalue = columns.eq(2).find('input').val();
                var PRconstant = columns.eq(3).find('input').val();
                if (PRname.trim() === '' || PRvalue.trim() === '' || regex.test(PRname) || regex.test(PRvalue)) {
                    isEmpty = true;
                    layer.msg('存在空的参数值，请填写完整！', { icon: 2, time: 2500 });
                    return false;
                }
                var item = {
                    "prName": PRname,
                    "prType": PRtype,
                    "prInfo": PRvalue,
                    "prConst": PRconstant
                };
                startdata.output.prItems.push(item);
            });
            if (isEmpty) {
                return false; // 如果检测到空值，立即退出函数
            }
            //console.log(startdata);
            editor.updateNodeDataFromId(thisNodeId, startdata);
            saveNodeDataToCache();
            return true;
            break;
        case 'javascript':
            javascriptdata = {
                output: {
                    javascript: ""
                }
            }
            var js = codeeditor.getValue();
            javascriptdata.output.javascript = js;
            editor.updateNodeDataFromId(thisNodeId, javascriptdata);
            saveNodeDataToCache();
            return true;
            break;
        case 'http':
            httpdata = {
                output: {
                    requestUrl: "",
                    type: "",
                    jsontemplate: "",
                    paramsItems: [],
                    headersItems: [],
                    cookiesItems: [],
                    judgescript: "",
                    httpmaxcount: 10,
                    httpdelayed: 0
                }
            }
            var isEmpty = false;
            var rows_params = $('.params-table tr');
            var rows_headers = $('.headers-table tr');
            var rows_cookies = $('.cookies-table tr');
            var jsontemplate = $('.jsontemplate').val(); // 提取 jsontemplate 的值
            rows_params.each(function () {
                var columns = $(this).find('td');

                var ParamKey = columns.eq(0).find('input').val();
                var ParamValue = columns.eq(1).find('input').val();
                if (ParamKey.trim() === '' || ParamValue.trim() === '' || regex.test(ParamKey) || regex.test(ParamValue)) {
                    isEmpty = true;
                    layer.msg('存在空的参数值，请填写完整！', { icon: 2, time: 2500 });
                    return false;
                }
                var item = {
                    "paramKey": ParamKey,
                    "paramValue": ParamValue
                };
                httpdata.output.paramsItems.push(item);
            });
            rows_headers.each(function () {
                var columns = $(this).find('td');

                var HdKey = columns.eq(0).find('input').val();
                var HdValue = columns.eq(1).find('input').val();
                if (HdKey.trim() === '' || HdValue.trim() === '' || regex.test(HdKey) || regex.test(HdValue)) {
                    isEmpty = true;
                    layer.msg('存在空的Header值，请填写完整！', { icon: 2, time: 2500 });
                    return false;
                }
                var item = {
                    "hdKey": HdKey,
                    "hdValue": HdValue
                };
                httpdata.output.headersItems.push(item);
            });
            rows_cookies.each(function () {
                var columns = $(this).find('td');

                var CkKey = columns.eq(0).find('input').val();
                var CkValue = columns.eq(1).find('input').val();
                if (CkKey.trim() === '' || CkValue.trim() === '' || regex.test(CkKey) || regex.test(CkValue)) {
                    isEmpty = true;
                    layer.msg('存在空的Cookie值，请填写完整！', { icon: 2, time: 2500 });
                    return false;
                }
                var item = {
                    "ckKey": CkKey,
                    "ckValue": CkValue
                };
                httpdata.output.cookiesItems.push(item);
            });
            if (isEmpty) {
                return false; // 如果检测到空值，立即退出函数
            }
            if ($('.requestUrl').val() == "") {
                layer.msg('请填写请求地址', { icon: 2, time: 2500 });
                return false;
            }
            var js = httpCodeeditor.getValue();
            httpdata.output.type = $('.http-type').val();
            httpdata.output.requestUrl = $('.requestUrl').val();
            httpdata.output.jsontemplate = jsontemplate.trim(); // 将 jsontemplate 添加到数组中
            httpdata.output.judgescript = js;
            if ($('.httpmaxcount').val() != "")
                httpdata.output.httpmaxcount = $('.httpmaxcount').val();
            else
                httpdata.output.httpmaxcount = 10;
            if ($('.httpdelayed').val() != "")
                httpdata.output.httpdelayed = $('.httpdelayed').val();
            else
                httpdata.output.httpdelayed = 0;
            editor.updateNodeDataFromId(thisNodeId, httpdata);
            saveNodeDataToCache();
            return true;
            break;
        case 'LLM':
            LLMdata = {
                output: {
                    aimodel: "",
                    prompt: "",
                    retry: 0,
                    stream: false,
                    jsonmodel: false,
                    judgescript: "",
                    llmmaxcount: 10
                }
            }
            var AImodel = $('.aimodel').val();
            var Prompt = $('.prompt').val();
            var Retry = $('.retry').val();
            var Stream = $('.stream').val();
            var JsonModel = $('.jsonmodel').val();
            LLMdata.output.aimodel = AImodel;
            if (Prompt == "") {
                layer.msg('请填写提示词', { icon: 2, time: 2500 });
                return false;
            }
            if (Retry == "") {
                layer.msg('重试次数填写错误', { icon: 2, time: 2500 });
                return false;
            }
            var js = llmCodeeditor.getValue();
            LLMdata.output.prompt = Prompt;
            LLMdata.output.retry = Retry;
            LLMdata.output.stream = Stream;
            LLMdata.output.jsonmodel = JsonModel;
            LLMdata.output.judgescript = js;
            editor.updateNodeDataFromId(thisNodeId, LLMdata);
            saveNodeDataToCache();
            return true;
            break;
        case 'DALL':
            DALLdata = {
                output: {
                    prompt: "",
                    retry: 0
                }
            }
            var Prompt = $('.prompt').val();
            var Retry = $('.retry').val();
            if (Prompt == "") {
                layer.msg('请填写提示词', { icon: 2, time: 2500 });
                return false;
            }
            if (Retry == "") {
                layer.msg('重试次数填写错误', { icon: 2, time: 2500 });
                return false;
            }
            var Size = $(".dallsize").val();
            if (Size == null) {
                layer.msg('请选择绘制尺寸', { icon: 2, time: 2500 });
                return false;
            }
            var Quality = $(".dallquality").val();
            if (Quality == "") {
                layer.msg('请选择绘制质量', { icon: 2, time: 2500 });
                return false;
            }
            DALLdata.output.prompt = Prompt;
            DALLdata.output.size = Size;
            DALLdata.output.quality = Quality;
            DALLdata.output.retry = Retry;
            editor.updateNodeDataFromId(thisNodeId, DALLdata);
            saveNodeDataToCache();
            return true;
            break;
        case 'DALLsm':
            DALLsmdata = {
                output: {
                    prompt: "",
                    retry: 0
                }
            }
            var Prompt = $('.prompt').val();
            var Retry = $('.retry').val();
            if (Prompt == "") {
                layer.msg('请填写提示词', { icon: 2, time: 2500 });
                return false;
            }
            DALLsmdata.output.prompt = Prompt;
            DALLsmdata.output.retry = Retry;
            editor.updateNodeDataFromId(thisNodeId, DALLsmdata);
            saveNodeDataToCache();
            return true;
            break;
        case 'web':
            DALLdata = {
                output: {
                    prompt: ""
                }
            }
            var Prompt = $('.prompt').val();
            if (Prompt == "") {
                layer.msg('请填写搜索关键词', { icon: 2, time: 2500 });
                return false;
            }
            if (Retry == "") {
                layer.msg('重试次数填写错误', { icon: 2, time: 2500 });
                return false;
            }
            DALLdata.output.prompt = Prompt;
            editor.updateNodeDataFromId(thisNodeId, DALLdata);
            saveNodeDataToCache();
            return true;
            break;
        case 'ifelse':
            ifelsedata = {
                output: {
                    judgresult: ""
                }
            }
            var js = ifelseCodeeditor.getValue();
            ifelsedata.output.judgresult = js;
            editor.updateNodeDataFromId(thisNodeId, ifelsedata);
            saveNodeDataToCache();
            return true;
            break;
        case 'knowledge':
            knowledgedata = {
                output: {
                    prompt: "",
                    retry: 0,
                    topk: 3,
                    typecode: []
                }
            }
            var Prompt = $('.prompt').val();
            var Retry = $('.retry').val();
            var TopK = $('.topk').val();
            if (Prompt == "") {
                layer.msg('请填写提示词', { icon: 2, time: 2500 });
                return false;
            }
            if (Retry == "" || Retry > 5) {
                layer.msg('重试次数填写错误', { icon: 2, time: 2500 });
                return false;
            }
            if (TopK == "" || TopK > 10 || TopK < 3) {
                layer.msg('TopK填写错误', { icon: 2, time: 2500 });
                return false;
            }
            $('#onknowledgeitem input[type="checkbox"]:checked').each(function () {
                var typecode = $(this).val();
                // 添加到knowledgedata.output.typecode
                if (knowledgedata.output.typecode.findIndex(item => item === typecode) === -1) {
                    knowledgedata.output.typecode.push(typecode);
                }
            });
            if (knowledgedata.output.typecode.length == 0) {
                layer.msg('请选用知识库', { icon: 2, time: 2500 });
                return false;
            }
            knowledgedata.output.prompt = Prompt;
            knowledgedata.output.retry = Retry;
            knowledgedata.output.topk = TopK;
            editor.updateNodeDataFromId(thisNodeId, knowledgedata);
            saveNodeDataToCache();
            return true;
            break;
        case 'end':
            enddata = {
                output: {
                    endaction: "",
                    endscript: ""
                }
            }
            var EndAction = $('.endaction').val();
            var EndScript = '';
            EndScript = endCodeeditor.getValue();
            enddata.output.endaction = EndAction;
            enddata.output.endscript = EndScript;
            editor.updateNodeDataFromId(thisNodeId, enddata);
            saveNodeDataToCache();
            return true;
            break;
    }
}

function saveNodeDataToCache(callback) {
    var nodeData = JSON.stringify(editor.export(), null, 4);
    $.ajax({
        type: "POST",
        url: "/WorkShop/SaveNodeDataToCache",
        data: {
            workflowcode: workflowcode,
            nodeData: nodeData
        },
        success: function (data) {
            if (data.success) {
                layer.msg('保存完成', { icon: 1, offset: 't', time: 2000 });
                callback();
            }
            else {
                layer.msg(data.msg, { icon: 2, offset: 't', time: 2000 });
            }
        }
    });
}


function getWorkFlowNodeData(workflowcode) {
    $.ajax({
        type: "POST",
        url: "/WorkShop/GetWorkFlowNodeData",
        dataType: "json",
        data: {
            workflowcode: workflowcode
        },
        success: function (data) {
            data = data.data;
            if (data !== null) {
                editor.import(JSON.parse(data));
            }
        }
    });
}