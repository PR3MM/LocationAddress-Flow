// ProResolve Error Logger
// Project: 2
// Framework: React
// Generated: 2025-01-04T15:31:59.632Z


import { useEffect } from 'react';

const logError = async (errorData) => {
  try {
    await fetch('https://dandy-brash-driver.glitch.me/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...errorData,
        projectId: '677954703aa3af2c9f1d1cc1',
        userId: 'user_2rAWu0hs0FYfX4sNqZfu3ZIlLdn',
        timestamp: new Date().toISOString(),
        framework: 'React'
      })
    });
  } catch (err) {
    console.error('Failed to log error:', err);
  }
};

export const useErrorLogger = () => {
  useEffect(() => {
    window.onerror = (msg, url, lineNo, columnNo, error) => {
      logError({
        message: msg,
        source: url,
        lineNumber: lineNo,
        columnNumber: columnNo,
        stack: error?.stack
      });
    };

    window.addEventListener('unhandledrejection', (event) => {
      logError({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        type: 'unhandledrejection'
      });
    });

    return () => {
      window.onerror = null;
      window.removeEventListener('unhandledrejection', logError);
    };
  }, []);
};

// Installation Instructions:
// 1. Copy this code into a file named 'errorLogger.js' in your project
// 2. Import and use the hook in your root component:
//    import { useErrorLogger } from './errorLogger';
//    function App() {
//      useErrorLogger();
//      return <YourApp />;
//    }