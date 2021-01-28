import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import {action} from '@storybook/addon-actions';
import {EditableSpan, EditableSpanProps} from './EditableSpan';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator';

export default {
   title: 'Todolist/AppWithRedux',
   component: AppWithRedux,
   argTypes: {},
   decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;

export const AppWithReduxExample = Template.bind({});

AppWithReduxExample.args = {}