import React, { useState } from 'react';


export default function Encrypter() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('请先选择一个文件');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const url = mode === 'encrypt' ? '/encrypt' : '/decrypt';
    const response = await fetch(`https://aes-file-encryptor.your-worker-name.workers.dev${url}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      alert(`${mode === 'encrypt' ? '加密' : '解密'}失败`);
      return;
    }

    const blob = await response.blob();
    const newUrl = URL.createObjectURL(blob);
    setDownloadUrl(newUrl);
  };

  const downloadFile = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = mode === 'encrypt' ? `${file?.name}.aes` : file?.name.replace(/\.aes$/, '');
      a.click();
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>AES 文件加密/解密</h2>
      <input type="file" onChange={handleFileChange} style={{ marginBottom: '12px' }} />
      <div style={{ marginBottom: '12px' }}>
        <button onClick={() => setMode('encrypt')} disabled={mode === 'encrypt'}>加密模式</Button>
        <button onClick={() => setMode('decrypt')} disabled={mode === 'decrypt'}>解密模式</Button>
      </div>
      <button onClick={handleUpload} disabled={!file} style={{ marginRight: '8px' }}>
        {mode === 'encrypt' ? '上传并加密' : '上传并解密'}
      </button>
      {downloadUrl && (
        <button onClick={downloadFile}>
          下载{mode === 'encrypt' ? '加密' : '解密'}文件
        </button>
      )}
    </div>
  );
}
