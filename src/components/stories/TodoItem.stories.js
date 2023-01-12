import React from 'react';

import TodoItem from '../TodoItem';

export default {
  component: TodoItem,
  title: 'TodoItem',
}

const Template = args => <TodoItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  todo: {
    id: 1,
    title: 'default title',
    isDone: false,
    isEdit: false,
  },
}

export const Doned = Template.bind({});
Doned.args = {
  todo: {
    id: 2,
    title: 'Doned title',
    isDone: true,
    isEdit: false,
  },
}

export const Edited = Template.bind({});
Edited.args = {
  todo: {
    id: 1,
    title: 'Edited title',
    isDone: false,
    isEdit: true,
  },
}