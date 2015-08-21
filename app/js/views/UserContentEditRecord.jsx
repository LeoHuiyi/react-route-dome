var React = require('react');
var $ = require('../../../bower_components/jquery/dist/jquery');

var UserContentEditRecord = React.createClass({
    getInitialState (){
        return{
            btnMore: false,
            moreRecord:[]
        }
    },
    handleClick (){
        if(this.state.btnMore) return;
        this.setState({
            btnMore: true
        });
        $.ajax({
            url: '/path/to/file',
            type: 'default GET (Other values: POST)',
            dataType: 'json',
            data: {param1: 'value1'},
        })
        .done(function(data) {
            console.log("success");
        }.bind(this))
        .fail(function(data) {
            console.log(data)
        }.bind(this))
        .always(function() {
            this.setState({
                btnMore: false
            });
        }.bind(this));
        this.setState({
            moreRecord:[{"category":22,"op_nickname":"leo","op_userid":"32c74ad1bc794d4bbdeacbbcbf0c59a1","userid":"ceeddf226688412d889c5a09572fefe2","note":"用户启用","user_agent":"","gtime":"2015-03-05T09:06:42Z","id":858,"remote_ip":"192.168.1.143"},{"category":22,"op_nickname":"leo","op_userid":"32c74ad1bc794d4bbdeacbbcbf0c59a1","userid":"ceeddf226688412d889c5a09572fefe2","note":"用户启用","user_agent":"","gtime":"2015-03-05T09:06:52Z","id":860,"remote_ip":"192.168.1.143"},{"category":22,"op_nickname":"leo","op_userid":"32c74ad1bc794d4bbdeacbbcbf0c59a1","userid":"ceeddf226688412d889c5a09572fefe2","note":"用户启用","user_agent":"","gtime":"2015-03-05T09:07:03Z","id":862,"remote_ip":"192.168.1.143"},{"category":23,"op_nickname":"leo","op_userid":"32c74ad1bc794d4bbdeacbbcbf0c59a1","userid":"ceeddf226688412d889c5a09572fefe2","note":"用户禁用","user_agent":"","gtime":"2015-03-05T09:07:23Z","id":864,"remote_ip":"192.168.1.143"},{"category":23,"op_nickname":"leo","op_userid":"32c74ad1bc794d4bbdeacbbcbf0c59a1","userid":"ceeddf226688412d889c5a09572fefe2","note":"用户禁用","user_agent":"","gtime":"2015-03-05T09:07:34Z","id":866,"remote_ip":"192.168.1.143"},{"category":23,"op_nickname":"leo","op_userid":"32c74ad1bc794d4bbdeacbbcbf0c59a1","userid":"ceeddf226688412d889c5a09572fefe2","note":"用户禁用","user_agent":"","gtime":"2015-03-05T09:07:38Z","id":867,"remote_ip":"192.168.1.143"},{"category":22,"op_nickname":"leo","op_userid":"32c74ad1bc794d4bbdeacbbcbf0c59a1","userid":"ceeddf226688412d889c5a09572fefe2","note":"用户启用","user_agent":"","gtime":"2015-03-05T09:08:43Z","id":868,"remote_ip":"192.168.1.143"},{"category":23,"op_nickname":"leo","op_userid":"32c74ad1bc794d4bbdeacbbcbf0c59a1","userid":"ceeddf226688412d889c5a09572fefe2","note":"用户禁用","user_agent":"","gtime":"2015-03-05T09:09:08Z","id":869,"remote_ip":"192.168.1.143"},{"category":22,"op_nickname":"leo","op_userid":"32c74ad1bc794d4bbdeacbbcbf0c59a1","userid":"ceeddf226688412d889c5a09572fefe2","note":"用户启用","user_agent":"","gtime":"2015-03-05T09:09:18Z","id":870,"remote_ip":"192.168.1.143"},{"category":23,"op_nickname":"leo","op_userid":"32c74ad1bc794d4bbdeacbbcbf0c59a1","userid":"ceeddf226688412d889c5a09572fefe2","note":"用户禁用","user_agent":"","gtime":"2015-03-05T09:10:09Z","id":871,"remote_ip":"192.168.1.143"}]
        });
    },
    render: function() {
        var tbody, data = (this.props.data.userlogs || []).concat(this.state.moreRecord), btnName;
        if(!data.length){
            tbody = <td colSpan="9" className="text-center"> aOh! 暂时还没有内容! </td>;
        }else{
            tbody = data.map(function(item, index) {
                return (
                    <tr key={index}>
                        <td>{item.op_nickname} </td>
                        <td>{item.category} </td>
                        <td>{item.note}</td>
                        <td>{item.user_agent}</td>
                        <td>{item.remote_ip}</td>
                        <td>{item.gtime}</td>
                    </tr>
                )
            }.bind(this));
        }
        btnName = this.state.btnMore ? '加载中...' : '更 多';
        return (
            <div>
                <div className="data-table table-striped">
                    <table>
                        <thead>
                            <tr>
                                <th>昵称</th>
                                <th>分类</th>
                                <th>注释</th>
                                <th>系统</th>
                                <th>IP</th>
                                <th>时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tbody}
                        </tbody>
                    </table>
                </div>
                <div style={{'textAlign': 'center'}}>
                    <button className="btn submit-btn" onClick={this.handleClick}>{btnName}</button>
                </div>
            </div>
        );
    }
});

module.exports = UserContentEditRecord;
