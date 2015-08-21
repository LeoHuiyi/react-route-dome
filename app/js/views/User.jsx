var React = require('react');
var UserSiderbar = require('./UserSiderbar');
var UserContent = require('./UserContent');

var User = React.createClass({
    render: function() {
        return (
            <div>
                <UserSiderbar/>
                <UserContent/>
            </div>
        );
    }
});

module.exports = User;
