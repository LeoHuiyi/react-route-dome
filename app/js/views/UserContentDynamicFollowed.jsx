var React = require('react');

var UserContentDynamicFollowed = React.createClass({
    renderContents (data){
        var len = data.length, arr;
        return data.map(function(value, index) {
            var styleObj = index === len ? '' : {"borderBottom": "1px solid #ccc"};
            return (
                <div className="form-horizontal" style={styleObj} key={index}>
                    <div className="form-item">
                        <label className="item-label">用户id：<span className="item-static">{value['user']['userid']}</span></label>
                        <label className="item-label">用户名：<span className="item-static">{value['user']['nickname']}</span>
                        </label>
                        <label className="item-label">状态：<span className="item-static">{value['state']}</span>
                        </label>
                        <label className="item-label">创建时间：<span className="item-static">{value['create_time']}</span>
                        </label>
                    </div>
                </div>
            );
        });
    },
    render (){
        var followed = this.props.data.followed || [];
        return (
            <div>
                <h3>关注</h3>
                {this.renderContents(followed)}
            </div>
        );
    }
});

module.exports = UserContentDynamicFollowed;
