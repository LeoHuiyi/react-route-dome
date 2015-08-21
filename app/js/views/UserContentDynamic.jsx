var React = require('react');
var Router = require('react-router');
var $ = require('../../../bower_components/jquery/dist/jquery');
var UserContentDynamicTabcontent = require('./UserContentDynamicTabcontent');
var data = [];
var Link = Router.Link;

var UserContentDynamic = React.createClass({
    mixins: [ Router.State ],
    statics: {
        willTransitionTo (transition, params, query, callback) {
            data = query;
            $.ajax({
                url: '/path/to/file',
                type: 'GET',
                dataType: 'json',
                data: query,
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

        return ['动态', '关注', '被关注'].map(function(item, i) {
            return (<li key={i} className={id == i ? 'current' : ''}><Link to={pathname} query={{id: i}}>{item}</Link></li>);
        });
    },
    render () {
        var id = this.getQuery().id;
        var li = this.renderLi(id);
        return (
            <div>
                <div className="main-title">
                    <h2>动态</h2>
                </div>
                <div className="tab-wrap">
                    <ul className="tab-nav nav">
                        {li}
                    </ul>
                    <div className="tab-content">
                        {<UserContentDynamicTabcontent query={id} data={data} showAlert={this.props.showAlert}/>}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = UserContentDynamic;
