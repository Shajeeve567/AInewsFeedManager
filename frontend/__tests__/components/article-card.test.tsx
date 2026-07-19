import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ArticleCard } from '@/components/dashboard/article-card';
import { summarizeArticle } from '@/lib/api';

// Mock the API module
jest.mock('@/lib/api', () => ({
  summarizeArticle: jest.fn(),
  getArticleById: jest.fn(() => Promise.resolve({ data: { summary: "Loaded summary" } }))
}));

// Mock phospher icons to prevent SVG errors in JSDOM
jest.mock('@phosphor-icons/react', () => ({
  Bookmark: () => <div data-testid="icon-bookmark" />,
  BookmarkSimple: () => <div data-testid="icon-bookmark-simple" />,
  Clock: () => <div data-testid="icon-clock" />,
  ArrowSquareOut: () => <div data-testid="icon-arrow" />,
  Sparkle: () => <div data-testid="icon-sparkle" />,
  X: () => <div data-testid="icon-x" />,
  CircleNotch: () => <div data-testid="icon-circlenotch" />
}));

const mockArticle = {
  id: 1,
  title: "Test Article Title",
  link: "https://example.com",
  content: "This is the content of the article for testing purposes.",
  publishedAt: new Date().toISOString(),
  source: { name: "Test Source" },
  summary: null
};

describe('ArticleCard Component', () => {
  it('renders article information correctly', () => {
    render(<ArticleCard article={mockArticle} saved={false} onSave={jest.fn()} onClick={jest.fn()} />);
    
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    expect(screen.getByText(/This is the content/i)).toBeInTheDocument();
  });

  it('calls summarizeArticle API when summarize button is clicked', async () => {
    render(<ArticleCard article={mockArticle} saved={false} onSave={jest.fn()} onClick={jest.fn()} />);
    
    const summarizeButton = screen.getByText('Summarize');
    fireEvent.click(summarizeButton);
    
    expect(summarizeArticle).toHaveBeenCalledWith(1);
    
    // Check if modal opens
    expect(screen.getByText('AI Summary')).toBeInTheDocument();
    
    // Initially shows loading state since summary is null
    expect(screen.getByText(/Reading the article and generating summary/i)).toBeInTheDocument();
  });
});
