var React = require('react');
var $ = require('../../../bower_components/jquery/dist/jquery');
var $win = $(window);
var PubSub = require('pubsub-js');

var Popup = React.createClass({
    getDefaultProps (){
        return{
            visible: false,
            onBeforeShow: $.noop,
            onBeforeHide: $.noop,
            style: {width: 300, height: 400},
            onShow: $.noop,
            onHide: $.noop
        }
    },
    getInitialState (){
        return{
            popupDisplay: this.getPopupDisplay(),
            style: this.props.style
        }
    },
    getPopupDisplay (){
        return this.props.visible ? 'block' : 'none';
    },
    show () {
        if(!this.isMounted()) return;
        this.props.onBeforeShow();
        this.setPositionStyle();
        this.setState({
            popupDisplay: 'block'
        }, this.props.onShow);
    },
    hide () {
        if(!this.isMounted()) return;
        this.props.onBeforeHide();
        this.setState({
            popupDisplay: 'none'
        }, this.props.onHide);
    },
    componentDidMount (){
        this.subscribePositionStyle();
    },
    componentWillUnmount: function() {
        PubSub.unsubscribe('positionStyle');
    },
    subscribePositionStyle (){
        PubSub.subscribe("positionStyle", function(msg, data){
            this.setPositionStyle(data);
        }.bind(this));
    },
    setPositionStyle (option){
        if(!this.isMounted()) return;
        var popW = (option && option.width) || this.state.style.width || 0;
        var popH = (option && option.height) || this.state.style.height || 0;
        var winW = $win.width();
        var winH = $win.height();
        var left = (winW -popW)/2;
        var top = (winH - popH)/2;
        left < 10 && (left = 10);
        top < 10 && (top = 10);
        this.setState({
            style: {
                position: 'absolute',
                top: top,
                left: left,
                width: popW,
                height: popH
            }
        });
    },
    renderPopupContent () {
        return (
            <div ref="popup" className="upload-img-popup" style={this.state.style}>
                {this.props.children}
                <a title="关闭" className="close-pop" onClick={this.hide} style={{cursor: 'pointer'}}></a>
            </div>
        )
    },
    render: function() {
        return (
            <div style={{display: this.state.popupDisplay}}>
                <div style={{position: 'fixed', zIndex: 9999, display: 'block', width: '100%', height: '100%', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(55, 55, 55, 0.6)', cursor: 'pointer'}} onClick={this.hide}></div>
                {this.renderPopupContent()}
            </div>
        );
    }
});

module.exports = Popup;
