import env from '../../env';
import Task from './task';

var Board = React.createClass({
    getInitialState: function() {
        return {
            tasks: []
        }
    },

    componentDidMount: function() {
        this.fetchTasksRequest = this.fetchTasks(this.props.tasklistId);
    },

    componentWillUnmount: function() {
        this.fetchTasksRequest.abort();
    },

    fetchTasks: function(tasklistId) {
        $.ajax({
            url: 'https://' + env.company + '.teamwork.com/tasklists/' + tasklistId + '/tasks.json',
            headers: {"Authorization": "BASIC " + window.btoa(env.key + ":xxx")},
            success: function(data) {
                var tasks = [];

                data = data['todo-items'];
                
                data.map(task => tasks.push(
                    {
                        id: task.id,
                        name: task.content
                    }
                ));

                this.setState({ tasks });
            }.bind(this),
            error: function() {
                // Handle error
            }
        });
    },

    render: function() {
        return (
            <div className="board">
                <h2>{this.props.boardName}</h2>

                <ul className={this.state.tasks.length == 0 ? 'task-list hidden' : 'task-list'}>
                    {this.state.tasks.map((task, i) => <Task key={i} name={task.name} />)}
                </ul>

                <div className="task-count">
                    {this.state.tasks.length > 0 ? this.state.tasks.length : 'No'} tasks
                </div>

            </div>
        );
    }

});

export default Board;
