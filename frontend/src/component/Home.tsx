import React, { useState, ChangeEvent  } from "react";
import { Link } from "react-router-dom";
import { useDocuments } from "../DocumentContext";
import { DocumentType } from "../documents";
import axios from "axios";

const Home: React.FC = () => {
  const { documents } = useDocuments();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Kiểm tra xem có file nào được chọn không
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]; 
      const formData = new FormData();
      formData.append('presentation', file);
      setUploading(true);
  
      axios.post('http://localhost:3001/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // Xử lý response ở đây
        setUploading(false);
        alert('File converted successfully. Download link: ' + response.data.pdfUrl);
      })
      .catch((error) => {
        console.error('Error:', error);
        setUploading(false);
      });
    } else {
      // Xử lý trường hợp không có file nào được chọn
      alert('Please select a file to upload.');
    }
  };
  

  return (
    <div className="home-container home-page">
      <h1 className="mb-4">Home</h1>
      <input type="file" onChange={handleFileUpload} accept=".ppt,.pptx,.xlsx,.xls" disabled={uploading} />
      {uploading && <p>Converting file...</p>}
      <div className="list-file-content">
        <table className="table table-hover table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">名ファイル</th>
              <th scope="col">アサイン</th>
              <th scope="col">ステータス</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc: DocumentType) => (
              <tr key={doc.id} className="list-file">
                <td>
                  <Link
                    to={`/document/${doc.id}`}
                    className="text-decoration-none"
                  >
                    {doc.name}
                  </Link>
                </td>
                <td> {doc.assign || " 未指定"}</td>
                <td>{doc.status || "未確認"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
