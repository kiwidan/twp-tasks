var Task = React.createClass({

    render: function() {
        return (
            <li className="task">
                {this.props.name}
            </li>
        );
    }

});

export default Task;
