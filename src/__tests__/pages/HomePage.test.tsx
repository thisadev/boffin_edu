import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    
    const heading = screen.getByText('Boffin Institute of Data Science');
    expect(heading).toBeInTheDocument();
  });

  it('renders the course link', () => {
    render(<Home />);
    
    const courseLink = screen.getByRole('link', { name: (content) => content.includes('Courses') && content.includes('Explore our data science courses') });
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute('href', '/courses');
  });

  it('renders the register link', () => {
    render(<Home />);
    
    const registerLink = screen.getByRole('link', { name: (content) => content.includes('Register') && content.includes('Register for our upcoming courses') });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('renders the about us link', () => {
    render(<Home />);
    
    const aboutLink = screen.getByRole('link', { name: (content) => content.includes('About Us') && content.includes('Learn more about Boffin Institute') });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
