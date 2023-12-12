import React, { useEffect, useRef, useCallback } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { DocumentType } from "../documents";
import FileViewerComponent from "react-file-viewer";
import { useSelector } from "react-redux";
import { RootStateTask } from "../store";
// hàm xử lý để đồng bộ scroll của màn hình với view file
const disableScrolling = (element: HTMLElement | null) => {
  const preventDefault = (e: Event) => e.preventDefault();
  if (element) {
    element.addEventListener("wheel", preventDefault, { passive: false });
    element.addEventListener("touchmove", preventDefault, { passive: false });
  }
};

interface FileViewerProps {
  document: DocumentType;
  currentFileUrl?: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ document }) => {
  const currentFileUrl = useSelector(
    (state: RootStateTask) => state.tasks.currentFileUrl
  );
  const viewerRef = useRef<HTMLDivElement>(null);
  const fileUri = currentFileUrl || document.uri;
  const fileType = fileUri.split('.').pop()?.toLowerCase();
  

  const handleDisableScrolling = useCallback(() => {
    const iframe = viewerRef.current?.querySelector("iframe");
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
    if (fileType === 'pdf') {
      return <FileViewerComponent fileType="pdf" filePath={fileUri} />;

    }

    return (
      <DocViewer
      documents={[{ uri: fileUri, fileType }]}
        pluginRenderers={DocViewerRenderers}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false,
          },
        }}
        style={{ width: "100%", height: "100%" }}
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
