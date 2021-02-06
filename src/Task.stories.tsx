import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import {action} from '@storybook/addon-actions';
import {Task, TaskProsType} from './Task';
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator';
import {TaskPriorities, TaskStatusesType} from './api/task-api';


export default {
   title: 'Todolist/Task',
   component: Task,
   decorators: [ReduxStoreProviderDecorator]
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task');
const changeTaskTitleCallback = action('Title changed inside Task');
const removeTaskCallback = action('Remove Button inside Task clicked');

const Template: Story<TaskProsType> = (args) => <Task {...args} />;

const baseArgs = {
   changeTaskStatus: changeTaskStatusCallback,
   changeTaskTitle: changeTaskTitleCallback,
   removeTask: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({});

TaskIsDoneExample.args = {
   ...baseArgs,
   task: {id: '1', status: TaskStatusesType.Completed, title: 'JS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Middle, startDate: '', todoListId: 'todolistId1'},
   todolistId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({});

TaskIsNotDoneExample.args = {
   ...baseArgs,
   task: {id: '2', status: TaskStatusesType.New, title: 'React', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Middle, startDate: '', todoListId: 'todolistId1'},
   todolistId: 'todolistId1'
}