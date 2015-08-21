require('../../css/base.css');
require('../../css/common.css');
require('../../css/module.css');
require('../../css/style.css');
var React = require('react');
var Router = require('react-router');
var Index = require('./views/Index');
var Api = require('./views/Api');
var User = require('./views/User');
var News = require('./views/News');
var UserContentList = require('./views/UserContentList');
var UserContentEdit = require('./views/UserContentEdit');
var UserContentDynamic = require('./views/UserContentDynamic');
var NewsContentAdd = require('./views/NewsContentAdd');
var NewsContentList = require('./views/NewsContentList');

var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;

var App = React.createClass({
    mixins: [ Router.State ],
    render () {
        var userActive = this.isActive('user') ? 'active' : '';
        var newsActive = this.isActive('news') ? 'active' : '';
        return (
            <div className="AppBody" id="app">
                <div className="header">
                    <span className="logo"></span>
                    <ul className="main-nav">
                        <li>
                            <Link to="index">首页</Link>
                        </li>
                        <li>
                            <Link to="/user/0/list" className={userActive}>用户</Link>
                        </li>
                        <li>
                            <Link to="/news/add"  className={newsActive}>新闻</Link>
                        </li>
                        <li>
                            <Link to="test">api测试</Link>
                        </li>
                    </ul>
                    <div className="user-bar">
                        <span style={{'color':'#fff', 'fontSize': '16px', 'fontWeight': 'bold', 'paddingRight': '4px'}}>leo</span>
                        <Link to="logout" style={{'color':'#fff', 'fontSize': '16px', 'fontWeight': 'bold', 'paddingRight': '4px'}}>退出</Link>
                    </div>
                </div>
                <RouteHandler/>
            </div>
        )
    }
});

var routes = (
    <Route path="/" handler={App}>
        <Route path="index" name="index" handler={Index}/>
        <Route path="user" name="user" handler={User}>
            <Route path=":id/list" name="user_list" handler={UserContentList}/>
            <Route path=":id/edit" name="user_edit" handler={UserContentEdit}/>
            <Route path=":id/dynamic" name="user_dynamic" handler={UserContentDynamic}/>
        </Route>
        <Route path="news" name="news" handler={News}>
            <Route path="add" name="news_add" handler={NewsContentAdd}/>
            <Route path="list" name="news_list" handler={NewsContentList}/>
            <Route path="list_edit" name="news_list_edit" handler={NewsContentAdd}/>
            <Route path="list_add" name="news_list_add" handler={NewsContentAdd}/>
        </Route>
        <Route path="test" name="test" handler={Api}/>
        <Route path="logout" name="logout"/>
        <DefaultRoute handler={Index}/>
        <Redirect from="*" to="index"/>
    </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.body);
});
