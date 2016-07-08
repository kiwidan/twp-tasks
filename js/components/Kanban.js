import env from '../../env';
import Board from './Board';

var Kanban = React.createClass({

    getInitialState: function() {
        return {
            tasklists: []
        };
    },

    componentDidMount: function() {
        this.fetchTasklistsRequest = this.fetchTasklists();
    },

    componentWillUnmount: function() {
        this.fetchTasklistsRequest.abort();
    },

    fetchTasklists: function() {
        $.ajax({
            url: 'https://' + env.company + '.teamwork.com/projects/' + env.projectId + '/tasklists.json',
            headers: {"Authorization": "BASIC " + window.btoa(env.key + ":xxx")},
            success: function(data) {
                var tasklists = [];
                data = data['tasklists'];
                
                data.map(task => tasklists.push(
                    {
                        id: task.id,
                        name: task.name
                    }
                ));

                this.setState({ tasklists });
            }.bind(this),
            error: function() {
                // Handle error
            }
        });
    },

    render: function() {
        var createBoard = function(task) {
            return (
                <Board
                    key={task.id}
                    tasklistId={task.id}
                    boardName={task.name} />
            );
        };

        return (
            <div className="kanban">
                {this.state.tasklists.map(createBoard)}
            </div>
        );
    }

});

export default Kanban;
