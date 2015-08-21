var React = require('react');

var UserContentDynamicContent = React.createClass({
    renderImgs (data){
        if(data.length){
            return (
                <label className="item-label item-img">
                    {data.map(function(value, index) {
                        return(
                            <span className="new-img" key={index}>
                                <img src={value.url} type={value.type}/>
                            </span>
                        );
                    })}
                </label>
            )
        }
    },
    renderContents (data){
        var len = data.length, arr;
        return data.map(function(value, index) {
            var imgs = this.renderImgs(JSON.parse(value.media)),
            styleObj = index === len ? '' : {"borderBottom": "1px solid #ccc"};
            return (
                <div className="form-horizontal" style={styleObj} key={index}>
                    <div className="form-item">
                        <label className="item-label"><span className="item-static">{value['wmsg']}</span>
                        </label>
                        {imgs}
                        <label className="item-label"><span className="item-static">{value['longitude']},&nbsp;{value['latitude']}</span>
                        </label>
                        <label className="item-label"><span className="item-static">{value['create_ip']}</span>
                        </label>
                        <label className="item-label"><span className="item-static">{value['create_time']}</span>
                        </label>
                        <label className="item-label">收藏：<span className="item-static favorite" style={{"cursor": "pointer"}}>{value['favorite']}</span>&nbsp;&nbsp;评论数：<span className="comment item-static" style={{"cursor": "pointer"}}>{value['comment_count']}</span>&nbsp;&nbsp;赞：<span className="praise item-static" style={{"cursor": "pointer"}}>{value['praise_count']}</span>
                        </label>
                    </div>
                </div>
            );
        });
    },
    render (){
        var discovers = this.props.data.discovers || [];
        return (
            <div>
                <h3>我的动态</h3>
                {this.renderContents(discovers)}
            </div>
        );
    }
});

module.exports = UserContentDynamicContent;
