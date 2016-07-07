import env from '../../env';
import Task from './task';

var TaskList = React.createClass({
    getInitialState: function() {
        return {
            tasks: []
        }
    },

    fetchTasks: function() {
        $.ajax({
            url: 'https://' + env.company + '.teamwork.com/projects/' + env.projectId + '/tasklists.json',
            headers: {"Authorization": "BASIC " + window.btoa(env.key + ":xxx")},
            success: function(data) {
                console.log(data);

                var tasks = [];

                data = data['tasklists'];
                

                data.map(task => tasks.push(
                    {
                        id: task.id,
                        name: task.name
                    }
                ));

                console.log(tasks);

                this.setState({ tasks });
            }.bind(this),
            error: function() {
                // Handle error
            }
        });
    },

    render: function() {
        return (
            <div className="task-list">
                <h1>Tasks</h1>

                <button onClick={this.fetchTasks}>Fetch Tasks</button>

                <ul>
                    { this.state.tasks.map((task, i) => <Task key={i} name={task.name} />) }
                </ul>

            </div>
        );
    }

});

export default TaskList;
