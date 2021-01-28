import {Button, ButtonProps} from './stories/Button';
import {Meta, Story} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from './AddItemForm';
import React from 'react';
import {action} from '@storybook/addon-actions';
import {EditableSpan, EditableSpanProps} from './EditableSpan';

export default {
   title: 'Todolist/EditableSpan',
   component: EditableSpan,
   argTypes: {
      onChange: {
         description: "Value EditableSpan changed"
      },
      title: {
         defaultValue: 'HTML',
         description: 'Start value EditableSpan'
      }
   },
} as Meta;

const Template: Story<EditableSpanProps> = (args) => <EditableSpan {...args} />;

export const EditableSpanBaseExample = Template.bind({});

EditableSpanBaseExample.args = {
   onChange: action('Value EditableSpan changed')
}