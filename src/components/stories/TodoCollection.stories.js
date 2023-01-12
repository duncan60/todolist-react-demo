import React from 'react';
import TodoCollection from '../TodoCollection';

export default {
  component: TodoCollection,
  title: 'TodoCollection',
}

const Template = args => <TodoCollection {...args} />;

export const Default = Template.bind({});
Default.args = {
  todos: [
   {
		id: 1,
		title: 'title 1',
		isDone: false,
		isEdit: false,
	 },
	 {
		id: 2,
		title: 'title 2',
		isDone: true,
		isEdit: false,
	 },
	 {
		id: 3,
		title: 'title 3',
		isDone: false,
		isEdit: true,
	 }
  ],
};

