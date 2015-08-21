var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var $ = require('../../../bower_components/jquery/dist/jquery');
var requestObj = require('../utils/request');
var news = {};
var doc = document;
var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
var simditor;
var isLoadjs = false;
var Upload = require('rc-upload');
window.jQuery = $;

var NewsContentAdd = React.createClass({
    mixins: [Router.State, Router.Navigation],
    statics: {
        willTransitionTo (transition, params, query, callback) {
            if(transition.path.indexOf('list_add') > -1){
                news['tags'] = query.tag || '';
                callback();
            }else if(transition.path.indexOf('list_edit') > -1){
                $.ajax({
                    url: '/path/to/file',
                    type: 'GET',
                    dataType: 'json',
                    data: query
                })
                .done(function(data) {
                    console.log(data);
                    data = data;
                    callback();
                })
                .fail(function(data) {
                    // console.log(data);
                    // transition.redirect('/index');
                    // callback();
                })
                callback();
            }else{
                callback();
            }
        }
    },
    getInitialState:function(){
        return{
            picSrc: news['title_pic']
        }
    },
    componentDidMount (){
        if(isLoadjs) {
            simditor = new Simditor({
                textarea: $('#editor'),
                defaultImage:'./app/js/lib/simditor/images/image.png'
            });
            return;
        };
        requestObj.requests(['./app/js/lib/simditor/scripts/module.js','./app/js/lib/simditor/styles/simditor.css']).then(function(){
            return requestObj.requestDfd('./app/js/lib/simditor/scripts/hotkeys.js');
        }).then(function(){
            return requestObj.requestDfd('./app/js/lib/simditor/scripts/uploader.js');
        }).then(function(){
            return requestObj.requestDfd('./app/js/lib/simditor/scripts/simditor.js');
        }).done(function (){
            isLoadjs = true;
            simditor = new Simditor({
                textarea: $('#editor'),
                defaultImage:'./app/js/lib/simditor/images/image.png'
            });
        }).fail(function () {
            console.log('fail');
        });
    },
    componentWillUnmount: function() {
        if(simditor){
            simditor.destroy();
            simditor = null;
        }
        news = {};
    },
    handleSubmit:function(e){
        e.preventDefault();
        var formData = {
            title: this.refs.title.getDOMNode().value,
            tag: this.refs.tag.getDOMNode().value,
            source: this.refs.source.getDOMNode().value,
            picSrc: this.state.picSrc,
            author: this.refs.author.getDOMNode().value,
            synopsis: this.refs.synopsis.getDOMNode().value,
            content: this.refs.content.getDOMNode().value
        };
        $.ajax({
            url: '/path/to/file',
            type: 'GET',
            dataType: 'json',
            data: {}
        })
        .done(function(data) {
            console.log(data);
            data = data;
            this.props.showAlert({text: "success", success: true})
        }.bind(this))
        .fail(function(data) {
            this.props.showAlert({text: data.statusText})
        }.bind(this))
        console.log(formData);
        this.setState({
            picSrc: ''
        });
        this.refs.form.getDOMNode().reset();
    },
    render (){
        var h2 = this.getPathname().indexOf('add') > -1 ? <h2>新增新闻</h2> : <h2>修改新闻</h2>;
        var img = this.state.picSrc ? <div className="upload-pre-item"><img src={this.state.picSrc} onClick={function(){this.props.showPopup({url: this.state.picSrc});}.bind(this)}/></div> : null;
        var props = {
            action: '/upload.do',
            data: {a: 1, b: 2},
            onStart: function(file){
                var reader = new FileReader();
                reader.onload = function(event) {
                    this.setState({
                        picSrc: event.target.result
                    });
                }.bind(this);
                reader.readAsDataURL(file);
            }.bind(this),
            onSuccess: function(ret) {
                console.log('onSuccess',ret);
            },
            onProgress: function(step) {
                console.log('onProgress',step);
            }
        };
        return(
            <div>
                <div className="main-title">{h2}</div>
                <form ref="form" className="form-horizontal" onSubmit = {this.handleSubmit}>
                    <div className="form-item">
                        <label className="item-label">标题<span className="check-tips">（必填）</span></label>
                        <div className="controls">
                            <input type="text" className="text input-large" ref="title" defaultValue={news['title']}/>
                        </div>
                    </div>
                    <div className="form-item">
                        <label className="item-label">标签<span className="check-tips">（最多四个标签）</span></label>
                        <div className="controls">
                            <input type="text" className="text input-large" ref="tag" defaultValue={news['tags']}/>
                        </div>
                    </div>
                    <div className="form-item">
                        <label className="item-label">标题图片<span className="check-tips">（必填）</span></label>
                        <div className="controls">
                            <Upload {...props}>
                                <span className="uploadify-button" style={{overflow: 'hidden',position: 'relative',display: 'block',height: '30px',width: '120px',lineHeight: '30px'}}>
                                <span className="uploadify-button-text">上传图片</span>
                                </span>
                            </Upload>
                            <div id="upload-title-pic-box" className="upload-img-box" style={{float:'left'}}>
                                {img}
                            </div>
                        </div>
                    </div>
                    <div className="form-item">
                        <label className="item-label">来源<span className="check-tips">（必填）</span></label>
                        <div className="controls">
                            <input type="text" className="text input-large" ref="source" defaultValue={news['source']}/>
                        </div>
                    </div>
                    <div className="form-item">
                        <label className="item-label">作者<span className="check-tips">（必填）</span></label>
                        <div className="controls">
                            <input type="text" className="text input-large" ref="author" defaultValue={news['author']}/>
                        </div>
                    </div>
                    <div className="form-item">
                        <label className="item-label">简介<span className="check-tips">（必填）</span></label>
                        <div className="controls">
                            <input type="text" className="text input-large" ref="synopsis" defaultValue={news['synopsis']}/>
                        </div>
                    </div>
                    <div className="form-item">
                        <label className="item-label">新闻<span className="check-tips">（必填）</span> </label>
                        <div className="controls">
                            <label className="textarea">
                                <textarea id="editor" ref="content">{news['content']}</textarea>
                            </label>
                        </div>
                    </div>
                    <div className="form-item">
                        <button className="btn submit-btn" type="submit">确 定</button>
                        <button className="btn btn-return" onClick={(e) =>{
                            e.preventDefault();
                            this.goBack()
                        }}>返 回</button>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = NewsContentAdd;
