var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var UserSiderbar = React.createClass({
    mixins: [ Router.State ],
    render: function() {
        var active = this.isActive('user', {id: 0}) ? 'item' : '';
        return (
            <div className="sidebar">
                <div id="subnav" className="subnav">
                    <ul className="side-sub-menu">
                        <li className="current">
                            <Link to="/user/0/list" className={active}>用户列表</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = UserSiderbar;
