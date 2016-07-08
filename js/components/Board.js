import env from '../../env';
import Task from './task';

var Board = React.createClass({
    getInitialState: function() {
        return {
            tasks: [],
            loading: true,
            error: false
        }
    },

    componentDidMount: function() {
        this.fetchTasksRequest = this.fetchTasks(this.props.tasklistId);
    },

    componentWillUnmount: function() {
        this.fetchTasksRequest.abort();
    },

    fetchTasks: function(tasklistId) {
        var reactClass = this;

        $.ajax({
            url: 'https://' + env.company + '.teamwork.com/tasklists/' + tasklistId + '/tasks.json?includeCompletedTasks=true',
            headers: {"Authorization": "BASIC " + window.btoa(env.key + ":xxx")},
            success: function(data) {
                var tasks = [];
                data = data['todo-items'];
                
                data.map(task => tasks.push(
                    {
                        id: task.id,
                        name: task.content,
                        completed: task.completed
                    }
                ));

                this.setState({ tasks });
            }.bind(this),
            error: function(data) {
                this.setState({ error: true });
            }.bind(this)
        }).always(function() {
            reactClass.setState({ loading: false });
        });
    },

    countTasks: function() {
        if (this.state.tasks.length == 0) {
            return 'No tasks';
        } else if (this.state.tasks.length == 1) {
            return '1 task';
        } else {
            return this.state.tasks.length + ' tasks';
        }
    },

    render: function() {
        var footerText = '';
        var footerClasses = 'board-footer';
        
        if (this.state.error) {
            footerText = 'Error!';
            footerClasses += ' error';
        } else if (this.state.loading) {
            footerText = 'Loading...';
            footerClasses += ' loading';
        } else {
            footerText = this.countTasks();
        }

        return (
            <div className="board">
                <h2>{this.props.boardName}</h2>

                <ul className={this.state.tasks.length == 0 ? 'task-list hidden' : 'task-list'}>
                    {this.state.tasks.map((task, i) => 
                        <Task
                            key={i}
                            id={task.id}
                            completed={task.completed}
                            name={task.name} />)
                    }
                </ul>

                <div className={footerClasses}>
                    {footerText}
                </div>

            </div>
        );
    }

});

export default Board;
