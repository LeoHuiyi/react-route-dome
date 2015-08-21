var React = require('react');

var UserContentEditAccount = React.createClass({
    render (){
        var user = this.props.user;
        return (
            <form className="form-horizontal">
                <div className="form-item">
                    <label className="item-label item-large">账号
                    </label>
                    <label className="item-label">姓名：<span className="item-static">{user['family_name']}</span>
                    </label>
                    <label className="item-label">昵称：<span className="item-static">{user['nickname']}</span>
                    </label>
                    <label className="item-label item-img">头像：
                        <span className="new-img">
                            <img src={user['avatar']} onClick={function(){
                                this.props.showPopup({url: user['avatar']});
                            }.bind(this)}/>
                        </span>
                    </label>
                    <label className="item-label">积分：<span className="item-static">{user['score']}</span>
                    </label>
                    <label className="item-label">启用：
                        <span className="item-static">{user['enable'] == 1 ? '启用' : '未启用'}
                        </span>
                    </label>
                    <label className="item-label">级别：<span className="item-static">{user['level']}</span>
                    </label>
                    <label className="item-label">签名：<span className="item-static">{user['signature']}</span>
                    </label>
                    <label className="item-label">账户：<span className="item-static">{user['account']}</span>
                    </label>
                    <label className="item-label">邮箱：<span className="item-static">{user['email']}</span>
                    </label>
                    <label className="item-label">手机号：<span className="item-static">{user['moblie']}</span>
                    </label>
                    <label className="item-label">公司名称：<span className="item-static">{user['enterprise']}</span>
                    </label>
                    <label className="item-label">身份认证：
                        <span className="item-static">{user['cer_id'] == 1 ? '已认证' : user['cer_id'] == 2 ? '认证失败' : user['cer_id'] == 0 ? '未认证' : '提交审核'}</span>
                    </label>
                    <label className="item-label">企业认证：
                        <span className="item-static">{user['cer_enterprise'] == 1? '已认证' : user['cer_enterprise'] == 2 ? '认证失败' : user['cer_enterprise'] == 0 ? '未认证' : '提交审核'}</span>
                    </label>
                    <label className="item-label">苗客认证：
                        <span className="item-static">{user['cer_intermediary'] == 1? '已认证' : user['cer_intermediary'] == 2 ? '认证失败' : user['cer_intermediary'] == 0 ? '未认证' : '提交审核'}</span>
                    </label>
                    <label className="item-label">推荐认证：
                        <span className="item-static">{user['cer_recommend'] == 1? '已认证' : user['cer_recommend'] == 2 ? '认证失败' : user['cer_recommend'] == 0 ? '未认证' : '提交审核'}</span>
                    </label>
                    <label className="item-label">创建时间：<span className="item-static">{user['create_time']}</span>
                    </label>
                    <label className="item-label">更新时间：<span className="item-static">{user['update_time']}</span>
                    </label>
                </div>
            </form>
        )
    }
});

module.exports = UserContentEditAccount;
