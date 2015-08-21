var React = require('react');
var Popup = require('../component/Popup');

var PopupContent = React.createClass({
    getDefaultProps (){
        return{
            url:''
        }
    },
    getInitialState (){
        return{
            url: ''
        }
    },
    getPopupDisplay (){
        return this.props.visible ? 'block' : 'none';
    },
    _imgLoad(){
        var img = new Image(), url = this.props.url;
        img.src = url;
        this.imgIsLoad = false;
        this.loadFns = [];
        if (img.complete) {
            this.setState({
                url: url
            });
            this.imgIsLoad = true;
            this.callAllFn();
            return;
        }
        img.onerror = function () {
            this.hide();
            img = img.onload = img.onerror = null;
        }.bind(this);
        img.onload = function () {
            this.setState({
                url: url
            });
            this.imgIsLoad = true;
            this.callAllFn();
            img = img.onload = img.onerror = null;
        }.bind(this);
    },
    componentWillMount (){
        this._imgLoad();
    },
    onLoad(fn){
        if(this.imgIsLoad){
            fn.call(this);
        }else{
            this.loadFns.push(fn);
        }
    },
    callAllFn(){
        var loadFns = this.loadFns;
        if(loadFns.length){
            var i = 0, len = loadFns.length;
            for(; i < len; i++){
                loadFns[i].call(this);
            }
        }
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
    showPopup (props){
        var close = props.onClose;
        props.onClose = function () {
            if (close) {
                close();
            }
            React.unmountComponentAtNode(this._popupWrapper);
        }.bind(this);
        var popup = React.render(<Popup {...props}><PopupContent/></Popup>, this._popupWrapper);
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
