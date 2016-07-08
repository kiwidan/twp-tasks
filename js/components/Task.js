import env from '../../env';

var Task = React.createClass({

    getInitialState: function() {
        return {
            completed: this.props.completed
        };
    },

    completeTask: function() {
        changeStatus(true);
    },

    uncompleteTask: function() {
        changeStatus(false);
    },

    onChange: function(event) {
        var completed = !this.state.completed;
        this.changeStatus(completed);
    },

    changeStatus(complete) {
        var action = complete ? 'complete' : 'uncomplete';
        var reactComponent = this;

        // Optimistically set this
        this.setState({ completed: complete });

        $.ajax({
            type: "PUT",
            url: 'https://' + env.company + '.teamwork.com/tasks/' + this.props.id + '/' + action + '.json',
            headers: {"Authorization": "BASIC " + window.btoa(env.key + ":xxx")},
            contentType: "application/json; charset=UTF-8"
        }).fail(function() {
            // Something went wrong, change the completed state back
            reactComponent.setState({ completed: !complete });
        });
    },

    render: function() {
        return (
            <li 
                className="task"
                onClick={this.onChange}>
                <input
                    onChange={this.onChange}
                    type="checkbox"
                    checked={this.state.completed} />

                <span className="task-title">
                    {this.props.name}
                </span>
            </li>
        );
    }

});

export default Task;
