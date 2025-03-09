import React, { useState } from 'react';

export default function EncryptFile() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      alert('请先选择一个文件');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://api.ayamemc.org', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      alert('上传失败');
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
  };

  const downloadFile = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${file?.name}.aes`;
      a.click();
    }
  };

  return (
    <div className="container margin-vert--lg">
      <h2>AES 文件加密</h2>
      <input type="file" onChange={handleFileChange} className="margin-bottom--md" />
      <button onClick={uploadFile} disabled={!file} className="button button--primary margin-right--sm">
        上传并加密
      </button>
      {downloadUrl && (
        <button onClick={downloadFile} className="button button--secondary">
          下载加密文件
        </button>
      )}
    </div>
  );
}