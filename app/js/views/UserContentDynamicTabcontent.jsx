var React = require('react');
var UserContentDynamicContent = require('./UserContentDynamicContent');
var UserContentDynamicFollowed = require('./UserContentDynamicFollowed');
var UserContentDynamicBeingfollowed = require('./UserContentDynamicBeingfollowed');

var UserContentDynamicTabcontent = React.createClass({
    render (){
        var content;
        var query = this.props.query;
        if(query == 0){
            content = <UserContentDynamicContent data={this.props.data}/>
        }else if(query == 1){
            content = <UserContentDynamicFollowed data={this.props.data}/>
        }else if(query == 2){
            content = <UserContentDynamicBeingfollowed data={this.props.data} />
        }
        return (
            <div>
                {content}
            </div>
        );
    }
});

module.exports = UserContentDynamicTabcontent;
