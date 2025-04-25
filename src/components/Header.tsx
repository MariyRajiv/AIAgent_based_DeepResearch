import React, { useState } from 'react';
import { Search, BookOpen, Save, Settings, X } from 'lucide-react';
import { useResearchContext } from '../context/ResearchContext';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { clearCurrentResearch, currentResearch, saveResearch } = useResearchContext();
  const { theme, setTheme } = useTheme();
  const [showSearchTip, setShowSearchTip] = useState(false);
  const [showSaveTip, setShowSaveTip] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [showPreviews, setShowPreviews] = useState(true);
  const [searchDepth, setSearchDepth] = useState('Advanced');

  const handleSearch = () => {
    const searchForm = document.querySelector('form');
    if (searchForm) {
      searchForm.scrollIntoView({ behavior: 'smooth' });
    }
    setShowSearchTip(true);
    setTimeout(() => setShowSearchTip(false), 2000);
  };

  const handleSave = () => {
    if (currentResearch?.id) {
      saveResearch(currentResearch.id);
      setShowSaveTip(true);
      setTimeout(() => setShowSaveTip(false), 2000);
    }
  };

  const handleNewResearch = () => {
    clearCurrentResearch();
    const searchForm = document.querySelector('form');
    if (searchForm) {
      searchForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveSettings = () => {
    // Save all settings
    localStorage.setItem('settings', JSON.stringify({
      autoSave,
      showPreviews,
      searchDepth,
      theme
    }));
    setShowSettings(false);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white p-4 shadow-md relative dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="flex items-center justify-center p-2 bg-blue-700 rounded-lg mr-3 dark:bg-blue-800">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold text-2xl">DeepResearch AI</h1>
            <p className="text-blue-200 text-sm">Powered by Agentic Intelligence</p>
          </div>
        </div>
        
        <nav className="flex items-center space-x-2">
          <div className="relative">
            <button 
              onClick={handleSearch}
              className="p-2 hover:bg-blue-700 rounded-full transition-colors dark:hover:bg-blue-800"
              title="Focus search"
            >
              <Search className="h-5 w-5" />
            </button>
            {showSearchTip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-blue-900 text-white text-xs rounded whitespace-nowrap">
                Scroll to search
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={handleSave}
              className={`p-2 rounded-full transition-colors ${
                currentResearch?.status === 'complete' 
                  ? 'hover:bg-blue-700 text-white dark:hover:bg-blue-800' 
                  : 'text-blue-300 cursor-not-allowed'
              }`}
              disabled={currentResearch?.status !== 'complete'}
              title={currentResearch?.status === 'complete' ? 'Save research' : 'No completed research to save'}
            >
              <Save className="h-5 w-5" />
            </button>
            {showSaveTip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-blue-900 text-white text-xs rounded whitespace-nowrap">
                Research saved!
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-blue-700 dark:bg-blue-800' : 'hover:bg-blue-700 dark:hover:bg-blue-800'}`}
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>

            {showSettings && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-gray-800 dark:text-gray-200 z-50">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Settings</h3>
                    <button 
                      onClick={() => setShowSettings(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={autoSave}
                          onChange={(e) => setAutoSave(e.target.checked)}
                          className="rounded text-blue-600 dark:bg-gray-700"
                        />
                        <span className="text-sm">Auto-save research</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox"
                          checked={showPreviews}
                          onChange={(e) => setShowPreviews(e.target.checked)}
                          className="rounded text-blue-600 dark:bg-gray-700"
                        />
                        <span className="text-sm">Show source previews</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Search depth</label>
                      <select 
                        value={searchDepth}
                        onChange={(e) => setSearchDepth(e.target.value)}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm text-sm dark:bg-gray-700"
                      >
                        <option>Basic</option>
                        <option>Advanced</option>
                        <option>Comprehensive</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Theme</label>
                      <select 
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as 'system' | 'light' | 'dark')}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm text-sm dark:bg-gray-700"
                      >
                        <option value="system">System</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                  <button 
                    onClick={handleSaveSettings}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={handleNewResearch}
            className="ml-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors dark:bg-emerald-700 dark:hover:bg-emerald-600"
            title="Start new research"
          >
            New Research
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;