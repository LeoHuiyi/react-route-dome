var React = require('react');

var UserContentDynamicBeingfollowed = React.createClass({
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
        var beingfollowed = this.props.data.beingfollowed || [];
        return (
            <div>
                <h3>被关注</h3>
                {this.renderContents(beingfollowed)}
            </div>
        );
    }
});

module.exports = UserContentDynamicBeingfollowed;
