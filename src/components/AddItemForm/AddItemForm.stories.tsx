import {Button, ButtonProps} from '../../stories/Button';
import {Meta, Story} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from './AddItemForm';
import React from 'react';
import {action} from '@storybook/addon-actions';



export default {
   title: 'Todolist/AddItemForm',
   component: AddItemForm,
   argTypes: {
      onClick: {
         description: "Button inside form clicked"
      }
   },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormBaseExample = Template.bind({});

AddItemFormBaseExample.args = {
   addItem: action('Button inside form clicked')
}