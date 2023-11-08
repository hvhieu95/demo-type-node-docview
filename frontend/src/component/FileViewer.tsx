import React, { useEffect, useRef, useCallback } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { DocumentType } from '../documents';

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

 

  return (
    <div ref={viewerRef} className="file-viewer">
      <DocViewer
        documents={[{ uri: document.uri, fileType: document.fileType }]}
        pluginRenderers={DocViewerRenderers}
        config={{ header: { disableHeader: false, disableFileName: false, retainURLParams: false } }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default React.memo(FileViewer);