var React = require('react');
var NewsSiderbar = require('./NewsSiderbar');
var NewsContent = require('./NewsContent');

var News = React.createClass({
    render (){
        return(
            <div>
                <NewsSiderbar/>
                <NewsContent/>
            </div>
        )
    }
});

module.exports = News;
