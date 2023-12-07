import React, { useEffect, useRef, useCallback } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { DocumentType } from '../documents';
import FileViewerComponent from 'react-file-viewer';
const disableScrolling = (element: HTMLElement | null) => {
  const preventDefault = (e: Event) => e.preventDefault();
  if (element) {
    element.addEventListener('wheel', preventDefault, { passive: false });
    element.addEventListener('touchmove', preventDefault, { passive: false });
  }
};

interface FileViewerProps {
  document: DocumentType;
}

const FileViewer: React.FC<FileViewerProps> = ({ document }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleDisableScrolling = useCallback(() => {
    const iframe = viewerRef.current?.querySelector('iframe');
    if (iframe && iframe.contentDocument) {
      disableScrolling(iframe.contentDocument.body);
    }
  }, []);

  useEffect(() => {
    handleDisableScrolling();
  }, [handleDisableScrolling]);

 

  // Xác định loại viewer dựa trên loại file
  const renderViewer = () => {
    // Nếu là PDF, sử dụng react-file-viewer
    if (document.fileType === 'pdf') {
      return <FileViewerComponent fileType="pdf" filePath={document.uri} />;
    }
    // Nếu không phải là PDF, sử dụng react-doc-viewer
    return (
      <DocViewer
        documents={[{ uri: document.uri, fileType: document.fileType }]}
        pluginRenderers={DocViewerRenderers}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false
          }
        }}
        style={{ width: '100%', height: '100%' }}
      />
    );
  };


  return (
    <div ref={viewerRef} className="file-viewer">
   {renderViewer()}
    </div>
  );
};

export default React.memo(FileViewer);