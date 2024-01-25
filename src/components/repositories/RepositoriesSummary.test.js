import { render, screen } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

const mockRepository = {
  stargazers_count: 100,
  open_issues: 30,
  forks: 5,
  language: 'JavaScript',
};

test('display information about the repository', async () => {
  render(<RepositoriesSummary repository={mockRepository} />);

  for (let key in mockRepository) {
    const value = mockRepository[key];
    const element = screen.getByText(new RegExp(value));
    expect(element).toBeInTheDocument();
  }
});
