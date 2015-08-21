var React = require('react');
var $ = require('../../../bower_components/jquery/dist/jquery');
var Router = require('react-router');
var Link = Router.Link;
var data = [{
    id: 1,
    userid: '23423423234',
    moblie: '2342342323423',
    nickname: '测试用户2 ',
    type: '200',
    level: '0',
    score: '0',
    cer_id: '1',
    cer_recommend: '0',
    cer_intermediary: '0',
    cer_enterprise: '0',
    create_time: '2015-01-21 13:56:53',
    enable: 1
}];

var UserContentList = React.createClass({
    statics: {
        willTransitionTo (transition, params, query, callback) {
            $.ajax({
                url: '/path/to/file',
                type: 'GET',
                dataType: 'json',
                data: query,
            })
            .done(function(data) {
                console.log("success");
                data = data;
                callback();
            })
            .fail(function(data) {
                // console.log(data);
                // transition.redirect('/index');
                // callback();
            });
            callback();
        }
    },
    ajaxHandle (e){
        e.preventDefault();
        $.ajax({
            url: '/path/to/file',
            type: 'POST',
            dataType: 'json',
            data: {param1: 'value1'},
        })
        .done(function(data) {
            this.props.showAlert({text: "success", success: true, cb: function(){
                location.reload();
            }});
        }.bind(this))
        .fail(function(data) {
            this.props.showAlert({text: data.statusText});
        }.bind(this))
        .always(function(data) {
            console.log("complete");
        }.bind(this));
    },
    render: function() {
        var tbody;
        if(!data.length){
            tbody = <td colSpan="9" className="text-center"> aOh! 暂时还没有内容! </td>;
        }else{
            tbody = data.map(function(item, index) {
                return (
                    <tr key={item.id}>
                        <td>{item.moblie} </td>
                        <td>{item.nickname} </td>
                        <td>
                            <span>{item.type}</span>
                        </td>
                        <td>{item.level}</td>
                        <td>{item.score}</td>
                        <td>{item.cer_id + item.cer_recommend + item.cer_intermediary + item.cer_enterprise}</td>
                        <td>
                            <span>{item.create_time}</span>
                        </td>
                        <td>
                            <a onClick={this.ajaxHandle} style={{'cursor':'pointer'}}>{item.enable ? '启用' : '禁用'}</a>
                            <Link to="/user/0/edit" query={{id: 0}}>账户</Link>
                            <Link to="/user/0/dynamic" query={{id: 0}}>动态</Link>
                        </td>
                    </tr>
                )
            }.bind(this));
        }
        return (
            <div>
                <div className="main-title">
                    <h2>用户列表</h2>
                </div>
                <div className="cf">
                    <div className="search-form fr cf">
                        <div className="sleft">
                            <input type="text" className="search-input" placeholder="请输入用户昵称或者ID"/>
                            <a className="sch-btn" href="javascript:;">
                                <i className="btn-search"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="data-table table-striped">
                    <table>
                        <thead>
                            <tr>
                                <th>用户名</th>
                                <th>昵称</th>
                                <th>用户类型</th>
                                <th>等级</th>
                                <th>积分</th>
                                <th>认证</th>
                                <th>时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>{tbody}</tbody>
                    </table>
                </div>
            </div>
        );
    }

});

module.exports = UserContentList;
