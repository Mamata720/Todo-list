import React, { Component } from 'react';
// import TaskItem from './TaskItem';
// import TodoList from './TodoList';

export default class TaskList extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tasks.map((task, index) => (
            <TaskList
              key={index}
              taskItem={task}
              id={index}
              deleteTask={this.props.deleteRecord}
              editTask={this.props.editRecord}
              toggleTask={this.props.toggleTask}
            />
          ))}
        </tbody>
      </table>
    );
  }
}