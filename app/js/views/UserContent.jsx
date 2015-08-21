var React = require('react');
var Router = require('react-router');
var $ = require('../../../bower_components/jquery/dist/jquery');
var $win = $(window);
var AlertMixin = require('../mixins/AlertMixin');
var PopupImgMixin = require('../mixins/PopupImgMixin');

var UserContent = React.createClass({
    mixins: [AlertMixin, PopupImgMixin],
    componentDidMount () {
        $win.on('resize.userContentList', function(event) {
            event.preventDefault();
            this.resizeMain();
        }.bind(this));
        this.resizeMain();
    },
    resizeMain:function () {
        this.refs.main.getDOMNode().style.minHeight = ($win.height() - 50 - 80) + 'px';
    },
    componentWillUnmount (){
        $win.off('.userContentList');
    },
    render: function() {
        return (
            <div style={{marginLeft: "200px"}}>
                {this.renderAlert()}
                <div className="main" ref="main">
                    <Router.RouteHandler showAlert={this.showAlert} showPopup={this.showPopup}/>
                </div>
                <div className="cont-ft">
                    <div className="copyright">
                        <div className="fl">感谢使用<a href="###" target="_blank">XXX</a>管理平台</div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = UserContent;
