'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { Logger } from '@/shared/lib/logger';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Logger.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 font-sans">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center border border-red-100">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-500 mb-6">
              We encountered an unexpected error. Please try reloading the page.
            </p>
            {this.state.error && process.env.NODE_ENV === 'development' && (
                <div className="mb-6 p-4 bg-gray-100 rounded text-left overflow-auto max-h-32 text-xs font-mono text-red-800">
                    {this.state.error.toString()}
                </div>
            )}
            <Button variant="primary" onClick={this.handleReload} className="w-full justify-center">
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
