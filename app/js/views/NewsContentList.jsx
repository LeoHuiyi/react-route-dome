var React = require('react');
var $ = require('../../../bower_components/jquery/dist/jquery');
var Reflux = require('Reflux');
var Router = require('react-router');
var Link = Router.Link;

var TodoActions = Reflux.createActions([
    'getAll',
    'deleteItem',
    'deleteItems',
    'allSetelectToggle',
    'setelectToggle'
]);

var TodoStore = Reflux.createStore({
    items: {list: [{title: '1', title_pic: 'http://img.tvmao.com/stills/star/58/372/b/443x600_2.jpg'}, {title: '2'}, {title: '3'}], allSetelected: false},
    listenables: [TodoActions],
    _setAllSetelected: function(flag){
        this.items.list = this.items.list.map(function(item, index){
            item.selected = flag;
            return item;
        });
        flag ? this.items.allSetelected = true : this.items.allSetelected = false;
    },
    _isAllSelected:function(){
        var list = this.items.list, i = list.length;
        while(i--){
            if(!list[i].selected){
                this.items.allSetelected = false;
                return;
            };
        }
        this.items.allSetelected = true;
    },
    onSetelectToggle(index){
        this.items.list[index].selected = !this.items.list[index].selected;
        this._isAllSelected();
        this.trigger(this.items);
    },
    onAllSetelectToggle: function(){
        this.items.allSetelected ? this._setAllSetelected(false) : this._setAllSetelected(true);
        this.trigger(this.items);
    },
    onGetAll: function (callback) {
        $.ajax({
            url: '/path/to/file',
            type: 'GET',
            dataType: 'json',
            data: {param1: 'value1'}
        })
        .done(function(data) {
            this.items.list = data;
            this._setAllSetelected(false);
            this.trigger(this.items);
            callback && callback('done', data);
        }.bind(this))
        .fail(function(data) {
            callback && callback('fail', data);
        }.bind(this))
        .always(function() {
            this._setAllSetelected(false);
            this.trigger(this.items);
        }.bind(this));
    },
    onDeleteItem: function (index, callback) {
        $.ajax({
            url: '/path/to/file',
            type: 'GET',
            dataType: 'json',
            data: {param1: 'value1'}
        })
        .done(function(data) {
            this.items.list.splice(index, 1);
            if(!this.items.list.length) this.items.allSetelected = false;
            this.trigger(this.items);
            callback && callback('done', data);
        }.bind(this))
        .fail(function(data) {
            callback && callback('fail', data);
        }.bind(this))
        .always(function() {
            this.items.list.splice(index, 1);
            if(!this.items.list.length) this.items.allSetelected = false;
            this.trigger(this.items);
        }.bind(this));
    },
    onDeleteItems: function (callback) {
        $.ajax({
            url: '/path/to/file',
            type: 'GET',
            dataType: 'json',
            data: {param1: 'value1'}
        })
        .done(function(data) {
            var items = this.items, newList = [];
            items.list.forEach(function(item, i) {
                if(!item.selected){
                    newList.push(item);
                }
            });
            if(!newList.length) items.allSetelected = false;
            items.list = newList;
            this.trigger(this.items);
            callback && callback('done', data);
        }.bind(this))
        .fail(function(data) {
            callback && callback('fail', data);
        }.bind(this))
        .always(function() {
            var items = this.items, newList = [];
            items.list.forEach(function(item, i) {
                if(!item.selected){
                    newList.push(item);
                }
            });
            if(!newList.length) items.allSetelected = false;
            items.list = newList;
            this.trigger(this.items);
        }.bind(this));
    }
});

var NewsContentList = React.createClass({
    mixins: [Reflux.connect(TodoStore, 'data')],
    getInitialState: function () {
        return {data: {}};
    },
    componentDidMount: function () {
        TodoActions.getAll(function(state, data){
            state === 'done' ? this.props.showAlert({text: "success", success: true}) : this.props.showAlert({text: data.statusText});
        }.bind(this));
    },
    handleSelected(e, index){
        TodoActions.setelectToggle(index);
    },
    handleDelete(e, index){
        TodoActions.deleteItem(index, function(state, data){
            state === 'done' ? this.props.showAlert({text: "success", success: true}) : this.props.showAlert({text: data.statusText});
        }.bind(this));
    },
    handleDeletes(e, index){
        TodoActions.deleteItems(function(state, data){
            state === 'done' ? this.props.showAlert({text: "success", success: true}) : this.props.showAlert({text: data.statusText});
        }.bind(this));
    },
    renderTr(){
        var data = this.state.data.list;
        if(data && data.length){
            var tag = this.props.query.tag;
            return data.map(function(vo, index){
                return (
                    <tr key={index}>
                        <td>
                            <input type="checkbox" checked={vo.selected} onChange={function(e){
                                this.handleSelected(e, index);
                            }.bind(this)}/>
                        </td>
                        <td>{vo.title} </td>
                        <td>
                            <span className="new-img">
                            <img src={vo.title_pic} onClick={function(){
                                this.props.showPopup({url: vo.title_pic});
                            }.bind(this)}/></span>
                        </td>
                        <td>{vo.source}</td>
                        <td>{vo.author}</td>
                        <td>
                            <span>{vo.create_time}</span>
                        </td>
                        <td>
                            <span>{vo.nickname}</span>
                        </td>
                        <td>
                            <span>{vo.remote_ip}</span>
                        </td>
                        <td>
                            <Link to="news_list_edit" query={{id: index, tag: tag}}>修改</Link>
                            <a onClick={function(e){
                                this.handleDelete(e, index);
                            }.bind(this)} style={{cursor: 'pointer'}}>删除</a>
                        </td>
                    </tr>
                )
            }.bind(this));
        }
        return <tr><td colSpan="9" className="text-center">aOh! 暂时还没有内容! </td></tr>;
    },
    handleAllSelect(e){
        TodoActions.allSetelectToggle()
    },
    render (){
        var tag = this.props.query.tag;
        return (
            <div>
                <div className="main-title">
                    <h2>新闻列表</h2>
                </div>
                <div className="cf">
                    <div className="fl">
                        <Link to="news_list_add" query={{tag: tag}} className="btn">新 增</Link>
                        <button className="btn" onClick={this.handleDeletes}>删 除</button>
                    </div>
                    <div className="search-form fr cf">
                        <div className="sleft">
                            <input type="text" name="nickname" className="search-input" placeholder="请输入用户昵称或者ID"/>
                            <a className="sch-btn"><i className="btn-search"></i></a>
                        </div>
                    </div>
                </div>
                <div className="data-table table-striped">
                    <table>
                        <thead>
                            <tr>
                                <th className="row-selected row-selected">
                                    <input type="checkbox" checked={this.state.data.allSetelected} onChange={this.handleAllSelect}/>
                                </th>
                                <th>标题</th>
                                <th>标题图片</th>
                                <th>来源</th>
                                <th>作者</th>
                                <th>时间</th>
                                <th>创建用户</th>
                                <th>ip</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderTr()}</tbody>
                    </table>
                </div>
            </div>
        );
    }
});

module.exports = NewsContentList;
