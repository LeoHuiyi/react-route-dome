var React = require('react');
var Router = require('react-router');
var $ = require('../../../bower_components/jquery/dist/jquery');
var UserContentEditTabcontent = require('./UserContentEditTabcontent');
var data = {avatar: "http://img.tvmao.com/stills/star/58/372/b/443x600_2.jpg"};
var Link = Router.Link;

var UserContentEdit = React.createClass({
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
    renderLi (id){
        var pathname = this.getPathname();

        return ['账号', '资料', '身份认证', '企业认证', '苗客认证', '推荐认证', '日志'].map(function(item, i) {
            return (<li key={i} className={id == i ? 'current' : ''}><Link to={pathname} query={{id: i}}>{item}</Link></li>);
        });
    },
    render () {
        var id = this.getQuery().id;
        var li = this.renderLi(id);
        return (
            <div>
                <div className="main-title">
                    <h2>用户设置</h2>
                </div>
                <div className="tab-wrap">
                    <ul className="tab-nav nav">
                        {li}
                    </ul>
                    <div className="tab-content">
                        {<UserContentEditTabcontent query={id} data={data} showAlert={this.props.showAlert} showPopup={this.props.showPopup}/>}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = UserContentEdit;
