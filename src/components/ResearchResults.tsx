import React, { useState } from 'react';
import { ExternalLink, ThumbsUp, ThumbsDown, Bookmark, Share2 } from 'lucide-react';
import { Research, Source } from '../types';

interface ResearchResultsProps {
  research: Research | null;
}

const SourceItem: React.FC<{ source: Source }> = ({ source }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    setIsLiked(false);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors dark:bg-gray-800">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-blue-800 dark:text-blue-400 line-clamp-1">{source.title}</h3>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
          {Math.round(source.relevanceScore * 100)}% relevant
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{source.snippet}</p>
      <div className="flex justify-between items-center">
        <a 
          href={source.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center"
        >
          Visit Source <ExternalLink className="ml-1 h-3 w-3" />
        </a>
        <div className="flex space-x-2">
          <button 
            onClick={handleLike}
            className={`transition-colors ${
              isLiked ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400'
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
          </button>
          <button 
            onClick={handleDislike}
            className={`transition-colors ${
              isDisliked ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400'
            }`}
          >
            <ThumbsDown className="h-4 w-4" />
          </button>
          <button 
            onClick={handleBookmark}
            className={`transition-colors ${
              isBookmarked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ResearchResults: React.FC<ResearchResultsProps> = ({ research }) => {
  const [isAnswerHelpful, setIsAnswerHelpful] = useState<boolean | null>(null);
  const [isAnswerBookmarked, setIsAnswerBookmarked] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [showAllSources, setShowAllSources] = useState(false);

  const handleAnswerHelpful = (helpful: boolean) => {
    setIsAnswerHelpful(helpful);
  };

  const handleAnswerBookmark = () => {
    setIsAnswerBookmarked(!isAnswerBookmarked);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(research?.query || '');
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  if (!research) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <div className="h-64 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-full mb-4">
            <BookOpenIcon className="h-12 w-12" />
          </div>
          <p className="text-lg font-medium">Start your research to see results</p>
          <p className="text-sm">Enter a query above to begin</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">Research Results</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Query: "{research.query}"
          {research.status === 'complete' && (
            <span className="ml-2 text-green-600 dark:text-green-400">• Complete</span>
          )}
          {research.status === 'researching' && (
            <span className="ml-2 text-blue-600 dark:text-blue-400">• Researching</span>
          )}
          {research.status === 'drafting' && (
            <span className="ml-2 text-yellow-600 dark:text-yellow-400">• Drafting</span>
          )}
        </p>
      </div>
      
      {(research.status === 'complete' || research.status === 'drafting') && (
        <>
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              Sources Found ({research.sources.length})
              <div className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                Tavily Search
              </div>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {research.sources
                .slice(0, showAllSources ? undefined : 4)
                .map(source => (
                  <SourceItem key={source.id} source={source} />
                ))
              }
            </div>
            
            {research.sources.length > 4 && (
              <button 
                onClick={() => setShowAllSources(!showAllSources)}
                className="text-blue-600 dark:text-blue-400 mt-4 text-sm hover:underline"
              >
                {showAllSources 
                  ? 'Show fewer sources' 
                  : `View all ${research.sources.length} sources`
                }
              </button>
            )}
          </div>
        </>
      )}
      
      {research.status === 'complete' && research.answer && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-gray-50 dark:bg-gray-900">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Generated Answer</h3>
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{research.answer}</p>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4">
              <button 
                onClick={() => handleAnswerHelpful(true)}
                className={`text-sm flex items-center transition-colors ${
                  isAnswerHelpful === true 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
                }`}
              >
                <ThumbsUp className="mr-1 h-4 w-4" /> Helpful
              </button>
              <button 
                onClick={() => handleAnswerHelpful(false)}
                className={`text-sm flex items-center transition-colors ${
                  isAnswerHelpful === false 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                }`}
              >
                <ThumbsDown className="mr-1 h-4 w-4" /> Not Helpful
              </button>
            </div>
            
            <div className="flex space-x-2 relative">
              <button 
                onClick={handleAnswerBookmark}
                className={`p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors ${
                  isAnswerBookmarked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                title={isAnswerBookmarked ? 'Remove bookmark' : 'Bookmark this answer'}
              >
                <Bookmark className="h-4 w-4" />
              </button>
              <button 
                onClick={handleShare}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900"
                title="Share this research"
              >
                <Share2 className="h-4 w-4" />
              </button>
              {showShareTooltip && (
                <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded">
                  Copied to clipboard!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {research.status === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
          <h3 className="font-medium mb-2">Error during research</h3>
          <p className="text-sm">{research.error || 'An unknown error occurred during the research process.'}</p>
        </div>
      )}
    </div>
  );
};

const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

export default ResearchResults;