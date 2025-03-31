import React, { useState } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error, errorInfo) => {
    console.error('Error Boundary:', error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Chart failed to load. Please refresh the page.
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;