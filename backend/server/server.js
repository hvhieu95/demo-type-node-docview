const express = require('express');
const fileUpload = require('express-fileupload');
const libre = require('libreoffice-convert');
const fs = require('fs');
const path = require('path');
const app = express();


const cors = require('cors');
app.use(cors())

app.use(express.static('public')); // Phục vụ các file tĩnh từ thư mục 'public'
app.use(fileUpload());

// Tạo thư mục output nếu chưa tồn tại
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Endpoint để tải lên và chuyển đổi file
app.post('/convert', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Tên file được tải lên
  let pptxFile = req.files.presentation;
  let outputPath = path.join(outputDir, `${Date.now()}_converted.pdf`);

  // Sử dụng libreoffice-convert để chuyển đổi file
  libre.convert(pptxFile.data, '.pdf', undefined, (err, done) => {
    if (err) {
      console.error(`Error converting file: ${err}`);
      res.status(500).send('Error converting file.');
    } else {
      // Ghi file đã chuyển đổi ra đĩa
      const outputFile = path.join(outputDir, `${Date.now()}_converted.pdf`);
      fs.writeFileSync(outputFile, done);
  
      // Tạo URL cho file đã chuyển đổi
      const downloadUrl = `http://localhost:${port}/output/${path.basename(outputFile)}`;
  
      // Gửi URL trong phản hồi JSON
      res.json({ pdfUrl: downloadUrl });
    }
  });
  
});

// Phục vụ các file tĩnh từ thư mục 'output'
app.use('/output', express.static(path.join(__dirname, 'output')));

// Đặt cổng mà server sẽ lắng nghe
const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
