var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var data = [{tag: "这是一个TAG"}, {tag: 'MobileHomeNew'}, {tag: 'MobileHomeBanner'}];
var $ = require('../../../bower_components/jquery/dist/jquery');

var NewsSiderbar = React.createClass({
    mixins: [ Router.State ],
    statics: {
        willTransitionTo (transition, params, query, callback) {
            $.ajax({
                url: '/path/to/file',
                type: 'GET',
                dataType: 'json',
                data: query
            })
            .done(function(data) {
                console.log("success");
                callback();
            })
            .fail(function(data) {
                // console.log(data);
                // transition.redirect('/index');
                // callback();
            });
            callback();
        }
    },
    renderLi (){
        return data.map((item, index) =>{
            return(
                <li className={this.getPath().indexOf(item.tag) > -1 ? 'current' : ''} key={index}>
                    <Link to="/news/list" query={{tag: item.tag}} className='item'>{item.tag}</Link>
                </li>
            )
        });
    },
    render: function() {
        var active = this.isActive('news_add') ? 'current' : '';
        return (
            <div className="sidebar">
                <div className="subnav">
                    <ul className="side-sub-menu">
                        <li className={active}>
                            <Link to="/news/add" style={{paddingLeft: '6px', fontWeight: 'bold'}} className='item'>创建新闻</Link>
                        </li>
                    </ul>
                    <h3 style={{paddingLeft:'6px'}}>标签</h3>
                    <ul className="side-sub-news cf">
                        {this.renderLi()}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = NewsSiderbar;
