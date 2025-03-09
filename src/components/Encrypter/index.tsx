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

    try {
      const response = await fetch('https://api.ayamemc.org', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('上传失败');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error(error);
      alert('上传过程中出现错误');
    }
  };

  const downloadFile = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${file.name}.aes`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
      setFile(null);
    }
  };

  return (
    <div className="container margin-vert--lg">
      <div className="text--center">
        <h2>Ayame 加盟模型追踪工具</h2>
        <input type="file" onChange={handleFileChange} className="margin-bottom--md" />
        <div>
          <button
            onClick={uploadFile}
            disabled={!file}
            className="button button--primary margin-right--sm"
          >
            上传并加密
          </button>
          {downloadUrl && (
            <button onClick={downloadFile} className="button button--secondary">
              下载加密文件
            </button>
          )}
        </div>
      </div>
    </div>
  );
}