var React = require('react');
var Popup = require('../component/Popup');
var PubSub = require('pubsub-js');

var PopupContent = React.createClass({
    getInitialState (){
        return{
            url: ''
        }
    },
    componentDidMount (){
        this.subscribeSetUrl();
    },
    componentWillUnmount: function() {
        PubSub.unsubscribe('setUrl');
    },
    subscribeSetUrl (){
        PubSub.subscribe("setUrl", function(msg, url){
            this.setState({
                url: url
            });
        }.bind(this));
    },
    render: function() {
        return (
            <img ref="img" src={this.state.url}/>
        );
    }
});

var PopupImgMixin = {
    propTypes: {
        container: React.PropTypes.node
    },
    componentDidMount (){
        this._mountPopupWrapper();
    },
    _imgLoad(url){
        var img = new Image();
        img.src = url;
        if (img.complete) {
            PubSub.publish('setUrl', url);
            PubSub.publish('positionStyle', {width: img.width, height: img.height, imgIsLoad: true});
            return;
        }
        img.onerror = function () {
            img = img.onload = img.onerror = null;
        };
        img.onload = function () {
            PubSub.publish('setUrl', url);
            PubSub.publish('positionStyle', {width: img.width, height: img.height, imgIsLoad: true});
            img = img.onload = img.onerror = null;
        };
    },
    showPopup (props){
        var hide = props.onHide;
        var {url, ...other} = props;
        other.onHide = function () {
            if (hide) {
                hide();
            }
            React.unmountComponentAtNode(this._popupWrapper);
        }.bind(this);
        var popup = React.render(<Popup {...other}><PopupContent></PopupContent></Popup>, this._popupWrapper);
        this._imgLoad(url);
        popup.show();
        return popup;
    },
    componentWillUnmount: function() {
        this._unmountPopup();
        if (this._popupWrapper) {
            this.getContainerDOMNode().removeChild(this._popupWrapper);
            this._popupWrapper = null;
        }
    },
    getContainerDOMNode: function() {
        return React.findDOMNode(this.props.container) || document.body;
    },
    _mountPopupWrapper: function() {
        this._popupWrapper = document.createElement('div')
        this.getContainerDOMNode().appendChild(this._popupWrapper);
    },
    _unmountPopup: function() {
        if(!this._popupWrapper) return;
        React.unmountComponentAtNode(this._popupWrapper);
    },
}

module.exports = PopupImgMixin;
