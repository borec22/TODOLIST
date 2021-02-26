import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import App from './App';
import {ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator';

export default {
   title: 'Todolist/App',
   component: App,
   argTypes: {},
   decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <App {...args} />;

export const AppWithReduxExample = Template.bind({});

AppWithReduxExample.args = {
   demo: true
}