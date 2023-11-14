export type DocumentType = {
  id: string;
  name: string;
  uri: string;
  fileType:
    | "pdf"
    | "xlsx"
    | "docx"
    | "ppt"
    | "pptx"
    | "png"
    | "xls"
    | "doc"
    | "txt"
    | "jpg"
    |"html"
    |"jpeg"
    |"bmp"
    |"tiff";
  assign?: string;
  status?: string;
};

export const documents: DocumentType[] = [
  {
    id: "1",
    name: "file pdf",
    uri: " http://localhost:3001/output/1699427849674_converted.pdf",
 
    fileType: "pdf",
  },
  {
    id: "2",
    name: " file xlsx",
    uri: "https://transfer.sh/UScopyyw3K/file_example_XLSX_10.xlsx",
    fileType: "xlsx",
  },
  {
    id: "3",
    name: " file docx",
    uri: "https://transfer.sh/rvq45hMe0N/sample1.docx",
    fileType: "docx",
  },
  {
    id: "4",
    name: " file ppt",
    uri: "https://transfer.sh/9hXYSLu39h/file_example_PPT_1MB.ppt",
    fileType: "ppt",
  },
  {
    id: "5",
    name: " file xls",
    uri: "https://transfer.sh/bPNK1H5GGT/example.xls",
    fileType: "xls",
  },
  {
    id: "6",
    name: " file doc",
    uri: "https://transfer.sh/txjfHsRLr4/exsample.doc",
    fileType: "doc",
  },
  {
    id: "7",
    name: " file png",
    uri: "/Rikkei.png",
    fileType: "png",
  },
  {
    id: "8",
    name: " file txt",
    uri: "/example.txt",
    fileType: "txt",
  },
  {
    id: "9",
    name: " file pptx",
    uri: "https://transfer.sh/BWsNLYVXeT/example.pptx",
    fileType: "pptx",
  },
  {
    id: "10",
    name: " file html",
    uri:"/sample2.html",
    fileType: "html",
  },
  {
    id: "11",
    name: " file jpg",
    uri:"/sample.jpg",
    fileType: "jpg",
  },
  {
    id: "12",
    name: " file jpeg",
    uri:"/sample.jpeg",
    fileType: "jpeg",
  },
  {
    id: "13",
    name: " file tiff",
    uri:"/sample.tiff",
    fileType: "tiff",
  },
  {
    id: "14",
    name: " file bmp",
    uri:"/sample.bmp",
    fileType: "bmp",
  },
];

export default documents;
