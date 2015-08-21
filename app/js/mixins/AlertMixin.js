var React = require('react');

module.exports = {
    getInitialState:function(){
        return{
            success: true,
            display: 'none',
            text: ''
        }
    },
    showAlert (option) {
        if(!this.isMounted()) return;
        this.setState({
            success: !!option.success,
            display: 'block',
            text: option.text || ''
        });
        setTimeout(()=>{
            this.hideAlert();
            typeof option.cb === 'function' && option.cb();
        }, option.time || 1000);
    },
    hideAlert () {
        if(!this.isMounted()) return;
        this.setState({
            display: 'none'
        });
    },
    _unmountAlert () {
        React.unmountComponentAtNode(this.refs.alert.getDOMNode());
    },
    renderAlert () {
        var className = this.state.success ? 'fixed alert alert-success' : 'fixed alert alert-error';
        return (
            <div ref="alert" id="top-alert" className={className} style={{display: this.state.display}}>
                <button className="close fixed" style={{marginTop: "4px"}} onClick={this.hideAlert}>&times;</button>
                <div ref="content" className="alert-content">{this.state.text}</div>
            </div>
        )
    }
}
