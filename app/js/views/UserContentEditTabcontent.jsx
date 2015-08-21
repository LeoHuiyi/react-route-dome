var React = require('react');
var UserContentEditAccount = require('./UserContentEditAccount');
var UserContentEditInfo = require('./UserContentEditInfo');
var UerContentEditAuthentication = require('./UerContentEditAuthentication');
var UerContentEditEnterprise = require('./UerContentEditEnterprise');
var UserConetentEditIntermediary = require('./UserConetentEditIntermediary');
var UserContentEditRecommend = require('./UserContentEditRecommend');
var UserContentEditRecord = require('./UserContentEditRecord');

var UserContentEditTabcontent = React.createClass({
    render (){
        var content;
        var query = this.props.query;
        if(query == 0){
            content = <UserContentEditAccount user={this.props.data} showPopup={this.props.showPopup}/>
        }else if(query == 1){
            content = <UserContentEditInfo userinfo={this.props.data}/>
        }else if(query == 2){
            content = <UerContentEditAuthentication data={this.props.data}  showAlert={this.props.showAlert}/>
        }else if(query == 3){
            content = <UerContentEditEnterprise data={this.props.data}  showAlert={this.props.showAlert}/>
        }else if(query == 4){
            content = <UserConetentEditIntermediary data={this.props.data}  showAlert={this.props.showAlert}/>
        }else if(query == 5){
            content = <UserContentEditRecommend data={this.props.data}  showAlert={this.props.showAlert}/>
        }else if(query == 6){
            content = <UserContentEditRecord data={this.props.data}/>
        }
        return (
            <div>
                {content}
            </div>
        );
    }
});

module.exports = UserContentEditTabcontent;
