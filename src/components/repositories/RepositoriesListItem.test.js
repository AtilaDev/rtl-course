import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RepositoriesListItem from './RepositoriesListItem';

// jest.mock('../tree/FileIcon', () => {
//   // Content of FileIcon.js
//   return () => {
//     return 'File Icon Component';
//   };
// });

function renderComponent() {
  const mockRepository = {
    full_name: 'facebook/react',
    language: 'JavaScript',
    description: 'React makes it painless to create good-looking UIs.',
    owner: {
      login: 'facebook',
    },
    name: 'react',
    html_url: 'https://github.com/facebook/react',
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={mockRepository} />
    </MemoryRouter>
  );

  return { mockRepository };
}

test('shows a link to the github homepage for this repository', async () => {
  const { mockRepository } = renderComponent();

  // In proffesional code NEVER DO THIS!
  // await act(async () => {
  //   await pause();
  // });

  await screen.findByRole('img', { name: /javascript/i });

  const link = screen.getByRole('link', {
    name: /github repository/i,
  });
  expect(link).toHaveAttribute('href', mockRepository.html_url);
});

// const pause = () => new Promise((resolve) => setTimeout(resolve, 100));

test('shows a fileicon with the appropriate icon', async () => {
  renderComponent();

  const icon = await screen.findByRole('img', { name: /javascript/i });
  expect(icon).toHaveClass('js-icon');
});

test('shows a link to the code editor page', async () => {
  const { mockRepository } = renderComponent();

  await screen.findByRole('img', { name: /javascript/i });

  const link = await screen.findByRole('link', {
    name: new RegExp(mockRepository.owner.login),
  });
  expect(link).toHaveAttribute(
    'href',
    `/repositories/${mockRepository.full_name}`
  );
});
