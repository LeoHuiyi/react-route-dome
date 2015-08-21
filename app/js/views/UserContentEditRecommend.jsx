var React = require('react');
var $ = require('../../../bower_components/jquery/dist/jquery');

var UserContentEditRecommend = React.createClass({
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
        var cer_recommend = this.props.data.cer_recommend || {};
        var btnClassName = this.state.btnDisabled ? 'btn submit-btn disabled' : 'btn submit-btn';
        return (
            <form className="form-horizontal">
                <div className="form-item">
                    <label className="item-label item-large">推荐认证</label>
                    <label className="item-label">审核状态：
                        <span className="item-static">
                            {user['cer_recommend'] == 1 ? '已认证' : user['cer_recommend'] == 2 ? '认证失败' : user['cer_recommend'] == 0 ? '未认证' : '提交审核'}
                        </span>
                    </label>
                    <label className="item-label">联系人：<span className="item-static">{cer_recommend['contact']}</span>
                    </label>
                    <label className="item-label">联系电话：<span className="item-static">{cer_recommend['telephone']}</span>
                    </label>
                    <label className="item-label">公司名称：<span className="item-static">{cer_recommend['enterprise']}</span>
                    </label>
                    <label className="item-label">备注：<span className="item-static">{cer_recommend['remark']}</span>
                    </label>
                    <label className="item-label">创建时间：<span className="item-static">{cer_recommend['create_time']}</span>
                    </label>
                    <label className="item-label">审查评论：<span className="item-static">{cer_recommend['review']}</span>
                    </label>
                    <div className="controls">
                        <input type="text" className="text input-large" ref="review" placeholder="（审查评论）" defaultValue = ""/>
                    </div>
                    <div className="controls">
                        <select ref="status" defaultValue = {user['cer_recommend']}>
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

module.exports = UserContentEditRecommend;
