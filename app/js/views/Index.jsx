var React = require('react');

var Index = React.createClass({
    render () {
        return (
            <div>
                <div style={{height: "500px"}}></div>
                <div className="cont-ft" style={{position: 'fixed', width: '100%', bottom: 0}}>
                    <div className="copyright">
                        <div className="fl">感谢使用<a href="###" target="_blank">XXX</a>管理平台</div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Index;
