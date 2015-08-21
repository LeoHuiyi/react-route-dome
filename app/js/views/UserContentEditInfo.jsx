var React = require('react');

var UserContentEditInfo = React.createClass({
    render: function() {
        var userinfo = this.props.userinfo;
        return (
            <form className="form-horizontal">
                <div className="form-item">
                    <label className="item-label item-large">资料
                    </label>
                    <label className="item-label">姓名：<span className="item-static">{userinfo['family_name']}</span>
                    </label>
                    <label className="item-label">范围：<span className="item-static">{userinfo['scope']}</span>
                    </label>
                    <label className="item-label">省份：<span className="item-static">{userinfo['province']}</span>
                    </label>
                    <label className="item-label">城市：<span className="item-static">{userinfo['city']}</span>
                    </label>
                    <label className="item-label">地区：<span className="item-static">{userinfo['district']}</span>
                    </label>
                    <label className="item-label">公司名称：<span className="item-static">{userinfo['enterprise']}</span>
                    </label>
                    <label className="item-label">电话：<span className="item-static">{userinfo['telephone']}</span>
                    </label>
                    <label className="item-label">邮编：<span className="item-static">{userinfo['postcode']}</span>
                    </label>
                    <label className="item-label">地址：<span className="item-static">{userinfo['address']}</span>
                    </label>
                    <label className="item-label">创建时间：<span className="item-static">{userinfo['create_time']}</span>
                    </label>
                </div>
            </form>
        );
    }
});

module.exports = UserContentEditInfo;
