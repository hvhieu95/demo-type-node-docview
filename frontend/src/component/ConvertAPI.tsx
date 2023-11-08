import React, { useState, ChangeEvent } from "react";
import ConvertApi from "convertapi-js";

const ConvertApiComponent = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [inputUrl, setInputUrl] = useState<string>("");
  const [convertUrl, setConvertUrl] = useState<string>("");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setInputFile(event.target.files[0]);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  const convertFile = async () => {
    setIsConverting(true);
    setError(""); // Reset error message

    const convertApi = ConvertApi.auth("LvTMRD7fH7zSuVKw");
    const params = convertApi.createParams();

    if (inputFile) {
      params.add("file", inputFile);
    } else if (inputUrl) {
      params.add("file", new URL(inputUrl));
    } else {
      setError("Please provide a file or a URL.");
      setIsConverting(false);
      return;
    }

    const fileType = inputFile
      ? inputFile.name.split(".").pop()
      : inputUrl.split(".").pop();

    try {
      const result = await convertApi.convert(fileType || "pdf", "pdf", params);
      if (result.files && result.files.length > 0) {
        setConvertUrl(result.files[0].Url); // Use the URL from the first file object
        localStorage.setItem('result.files[0].Url', result.files[0].Url); 
      }
    } catch (error) {
      console.error("Error converting file:", error);
      setError("Error converting file. Please try again later.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx"
      />
      <input
        type="text"
        value={inputUrl}
        onChange={handleInputChange}
        placeholder="Enter the file URL to convert"
      />
      <button
        onClick={convertFile}
        disabled={isConverting || (!inputFile && !inputUrl)}
      >
        Convert to PDF
      </button>
      {isConverting && <p>Converting file...</p>}
      {error && <p>Error: {error}</p>}
      {convertUrl && (
        <div>
          PDF URL:{" "}
          <a href={convertUrl} target="_blank" rel="noopener noreferrer">
            {convertUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default ConvertApiComponent;