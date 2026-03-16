import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './ResumeWindow.css';

// Set up the worker from local public directory
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const ResumeWindow = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string>('');

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setError('');
  }

  function onDocumentLoadError(error: Error): void {
    console.error('PDF load error:', error);
    setError(`Failed to load PDF: ${error.message}`);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  return (
    <div className="resume-window">
      <div className="resume-toolbar">
        <button className="resume-button" onClick={goToPrevPage} disabled={pageNumber <= 1}>
          ◀ Previous
        </button>
        <span className="resume-page-info">
          Page {pageNumber} of {numPages}
        </span>
        <button className="resume-button" onClick={goToNextPage} disabled={pageNumber >= numPages}>
          Next ▶
        </button>
        <a
          href="/Resume.pdf"
          download="Shubham_Singhal_Resume.pdf"
          className="resume-button"
          style={{ marginLeft: 'auto', textDecoration: 'none', display: 'inline-block' }}
        >
          💾 Download
        </a>
      </div>
      <div className="resume-content">
        {error ? (
          <div className="resume-loading">{error}</div>
        ) : (
          <Document
            file="/Resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div className="resume-loading">Loading PDF...</div>}
          >
            <Page
              pageNumber={pageNumber}
              width={760}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        )}
      </div>
    </div>
  );
};

export default ResumeWindow;
