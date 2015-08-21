var React = require('react');
var $ = require('../../../bower_components/jquery/dist/jquery');

var UerContentEditAuthentication = React.createClass({
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
        var cer_id = this.props.data.cer_id || {};
        var btnClassName = this.state.btnDisabled ? 'btn submit-btn disabled' : 'btn submit-btn';
        return (
            <form className="form-horizontal">
                <div className="form-item">
                    <label className="item-label item-large">身份认证</label>
                    <label className="item-label">审核状态：
                        <span className="item-static">
                            {user['cer_id'] == 1 ? '已认证' : user['cer_id'] == 2 ? '认证失败' : user['cer_id'] == 0 ? '未认证' : '提交审核'}
                        </span>
                    </label>
                    <label className="item-label">姓名：<span className="item-static">{cer_id['family_name']}</span>
                    </label>
                    <label className="item-label">身份证号码：<span className="item-static">{cer_id['id_no']}</span>
                    </label>
                    <label className="item-label item-img">图片1：<span className="new-img"><img src={cer_id['id_pic']}/></span>
                    </label>
                    <label className="item-label item-img">图片2：<span className="new-img"><img src={cer_id['id_pic2']} /></span>
                    </label>
                    <label className="item-label">创建时间：<span className="item-static">{cer_id['create_time']}</span>
                    </label>
                    <label className="item-label">审查评论：<span className="item-static">{cer_id['review']}</span>
                    </label>
                    <div className="controls">
                        <input type="text" className="text input-large" ref="review" placeholder="（审查评论）" defaultValue = ""/>
                    </div>
                    <div className="controls">
                        <select ref="status" defaultValue = {user['cer_id']}>
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

module.exports = UerContentEditAuthentication;
