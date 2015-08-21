var React = require('react/addons'),
    requestObj = require('../utils/request'),
    $ = require('../../../bower_components/jquery/dist/jquery'),
    formatJson = require('../utils/formatJson'),
    cx = React.addons.classSet,
    doc = document,
    head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;

var Api = React.createClass({
    statics: {
        willTransitionTo (transition, params, query, callback) {
            requestObj.requests(['./bower_components/bootstrap/dist/css/bootstrap.min.css']).done(function (){
                var node = doc.createElement("style"),
                 cssText = '.main-nav a{box-sizing: content-box;}.main-nav a:focus{outline:none;}#copyrA{color:#2d7200}#copyrA:hover{color:#4bbd00}body{font-family: microsoft yahei, Helvetica, Tahoma, Arial, sans-serif}';
                node.type = "text/css";
                node.id = "apiStylePatch";
                if(node.styleSheet){
                    node.styleSheet.cssText = cssText;
                }else{
                    node.innerHTML = cssText;
                }
                head.appendChild(node);
                callback();
            }).fail(function () {
                console.log('fail');
                transition.redirect('/index');
                callback();
            });
        }
    },
    componentWillUnmount: function() {
        var apiStylePatch = doc.getElementById('apiStylePatch');
        var bootstrap = doc.getElementById('./bower_components/bootstrap/dist/css/bootstrap.min.css');
        apiStylePatch && head.removeChild(apiStylePatch);
        bootstrap && head.removeChild(bootstrap);
    },
    getInitialState () {
        return {
            formatActive: false,
            submitActive: false,
            urlInput: '',
            paramInput: '',
            typeSelect: 'get'
        }
    },
    subAjax () {
        if(this.state.submitActive) return;
        var url = this.refs.url.getDOMNode().value.trim();
        var param = encodeURIComponent(this.refs.param.getDOMNode().value.trim());
        var type = this.refs.type.getDOMNode().value.trim();
        var data = 'url=' + url + '&param=' + param + '&type=' + type;

        this.refs.subBtn.getDOMNode().innerHTML = '查询中......';
        this.setState({
            submitActive: true
        });
        $.ajax({
            type: 'POST',
            url: "/path/to/file",
            data: data,
            dataType: 'text'
        }).done(function(val){
            this.refs.textarea.getDOMNode().value = val;
        }.bind(this)).fail(function(data){
            console.log(data.statusText)
        }).always(function(){
            this.refs.subBtn.getDOMNode().innerHTML = '查询';
            this.setState({
                submitActive: false
            });
        }.bind(this));
    },
    formatClick () {
        var textarea = this.refs.textarea.getDOMNode(),
        formatActive = !this.state.formatActive,
        value = formatJson(textarea.value.trim(), formatActive);

        if(!value) return;

        textarea.value = value;

        this.setState({
            formatActive: formatActive
        });
    },
    render () {
        var subClasses, formatClasses;

        if(this.state.formatActive){
            formatClasses = cx({
                'btn': true,
                'btn-default': true,
                'active': true
            });
        }else{
            formatClasses = cx({
                'btn': true,
                'btn-default': true,
                'active': false
            });
        }

        if(this.state.submitActive){
            subClasses = cx({
                'btn': true,
                'btn-default': true,
                'active': true
            });
        }else{
            subClasses = cx({
                'btn': true,
                'btn-default': true,
                'active': false
            });
        }

        return (
            <div>
                <div className="container" style={{paddingBottom: '50px'}}>
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="page-header">
                                <h1 className="text-center">API测试工具</h1>
                            </div>
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="inputEmail3" className="col-sm-2 control-label">接口名称</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" ref="url" defaultValue = {this.state.urlInput} placeholder="user..."/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword3" className="col-sm-2 control-label">输入参数</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" ref="param" defaultValue = {this.state.paramInput} placeholder="mobile=11&passwd=22..."/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-2">
                                        <select defaultValue = {this.state.typeSelect} className="form-control" ref="type">
                                            <option value='get'>GET</option>
                                            <option value='post'>POST</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button ref="subBtn" className={subClasses} type="button" onClick={this.subAjax}>查询</button>
                                        <button className={formatClasses} type="button" onClick={this.formatClick}>格式化</button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <textarea ref="textarea" className="form-control" rows="10"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="cont-ft" style={{position: 'fixed', width: '100%', bottom: 0}}>
                    <div className="copyright">
                        <div className="fl">感谢使用<a id="copyrA" href="###" target="_blank">XXX</a>管理平台</div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Api;
