import env from '../../env';
import Board from './Board';

var Kanban = React.createClass({

    getInitialState: function() {
        return {
            tasklists: [],
            loading: true,
            error: false
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
            url: 'https://' + env.company + '.teamwork.com/projects/' + env.projectId + '/tasklists.json?status=all',
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
            error: function(data) {
                this.setState({ error: true });
            }.bind(this)
        }).always(() => {
            this.setState({ loading: false });
        });
    },

    render: function() {
        var pageMessage = '';
        var messageClasses = 'page-message';

        if (this.state.loading) {
            pageMessage = 'Loading...'
        } else if (this.state.error) {
            pageMessage = 'Error! There was an issue retrieving tasks.';
            messageClasses += ' error';
        } else {
            // No message, so let's hide the message panel
            messageClasses += ' hidden';
        }
        
        return (
            <div className="kanban">
                <div className={messageClasses}>{pageMessage}</div>

                {this.state.tasklists.map((tasklist, i) =>
                    <Board
                        key={tasklist.id}
                        tasklistId={tasklist.id}
                        boardName={tasklist.name} />
                )}
            </div>
        );
    }

});

export default Kanban;
