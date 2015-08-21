var React = require('react');
var $ = require('../../../bower_components/jquery/dist/jquery');

var UerContentEditEnterprise = React.createClass({
    getInitialState:function(){
        return{
            btnDisabled: false
        }
    },
    handleSubmit () {
        if(this.state.btnDisabled) return;
        var input = this.refs.review.getDOMNode();
        var select = this.refs.status.getDOMNode();
        var btn = this.refs.button.getDOMNode();
        var inputVal = input.value;
        if(inputVal === ''){
            this.props.showAlert({text: "请填写内容"});
            return;
        }else{
            this.setState({
                btnDisabled: true
            });
            $.ajax({
                url: '/path/to/file',
                type: 'default GET (Other values: POST)',
                dataType: 'json',
                data: {param1: 'value1'},
            })
            .done(function(data) {
                console.log("success");
                this.props.showAlert({text: "success", success: true, cb: function(){
                    location.reload();
                }});
            }.bind(this))
            .fail(function(data) {
                this.props.showAlert({text: data.statusText});
            }.bind(this))
            .always(function() {
                this.setState({
                    btnDisabled: false
                });
            }.bind(this));
        }
    },
    render () {
        var user = this.props.data.user || {};
        var cer_enterprice = this.props.data.cer_enterprice || {};
        var btnClassName = this.state.btnDisabled ? 'btn submit-btn disabled' : 'btn submit-btn';
        return (
            <form className="form-horizontal">
                <div className="form-item">
                    <label className="item-label item-large">企业认证</label>
                    <label className="item-label">审核状态：
                        <span className="item-static">
                            {user['cer_enterprise'] == 1 ? '已认证' : user['cer_enterprise'] == 2 ? '认证失败' : user['cer_enterprise'] == 0 ? '未认证' : '提交审核'}
                        </span>
                    </label>
                    <label className="item-label">企业名称：<span className="item-static">{cer_enterprice['enterprise']}</span>
                    </label>
                    <label className="item-label">执照编号：<span className="item-static">{cer_enterprice['licence_no']}</span>
                    </label>
                    <label className="item-label item-img">执照图片：<span className="new-img"><img src={cer_enterprice['licence_pic']}/></span>
                    </label>
                    <label className="item-label">企业法人：<span className="item-static">{cer_enterprice['director_name']}</span>
                    </label>
                    <label className="item-label">企业法人身份证号：<span className="item-static">{cer_enterprice['director_id']}</span>
                    </label>
                    <label className="item-label item-img">企业法人身份证图片：<span className="new-img"><img src={cer_enterprice['director_pic']}/></span>
                    </label>
                    <label className="item-label">联系人：<span className="item-static">{cer_enterprice['contact']}</span>
                    </label>
                    <label className="item-label">联系电话：<span className="item-static">{cer_enterprice['telephone']}</span>
                    </label>
                    <label className="item-label">审查评论：<span className="item-static">{cer_enterprice['review']}</span>
                    </label>
                    <div className="controls">
                        <input type="text" className="text input-large" ref="review" placeholder="（审查评论）" defaultValue = ""/>
                    </div>
                    <div className="controls">
                        <select ref="status" defaultValue = {user['cer_enterprise']}>
                            <option value="1">已认证</option>
                            <option value="2">认证失败</option>
                        </select>
                    </div>
                </div>
                <div className="form-item">
                    <div className="controls">
                        <button type="submit" onClick={this.handleSubmit} ref="button" className={btnClassName}>确 定</button>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = UerContentEditEnterprise;
