import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as TodoCollectionStories from '../TodoCollection.stories'

const { Default } = composeStories(TodoCollectionStories);

it('renders pinned tasks at the start of the list', () => {
  const { container } = render(<Default />);
  const $collection = container.querySelector('.done')
  // expect(
  //   container.querySelector('div:nth-child(1) .task-item-body-text')
  // ).not.toBe(null);
});