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

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(event.target.value as 'encrypt' | 'decrypt');
    setFile(null);
    setDownloadUrl(null);
  };

  const processFile = async () => {
    if (!file) {
      alert('请先选择一个文件');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const endpoint =
      mode === 'encrypt'
        ? 'https://shrill-dust-d687.happyrespawnanchor.workers.dev/encrypt'
        : 'https://shrill-dust-d687.happyrespawnanchor.workers.dev/decrypt';

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      alert(`${mode === 'encrypt' ? '加密' : '解密'}失败`);
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
      a.download = mode === 'encrypt' ? `${file?.name}.aes` : file?.name.replace('.aes', '') || '解密文件';
      a.click();
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>AES 文件{mode === 'encrypt' ? '加密' : '解密'}</h2>
      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="mode">选择模式：</label>
        <select id="mode" value={mode} onChange={handleModeChange}>
          <option value="encrypt">加密</option>
          <option value="decrypt">解密</option>
        </select>
      </div>
      <input type="file" onChange={handleFileChange} style={{ marginBottom: '12px' }} />
      <button
        onClick={processFile}
        disabled={!file}
        style={{
          marginRight: '8px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {mode === 'encrypt' ? '上传并加密' : '上传并解密'}
      </button>
      {downloadUrl && (
        <button
          onClick={downloadFile}
          style={{
            padding: '10px 20px',
            backgroundColor: '#008CBA',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          下载{mode === 'encrypt' ? '加密' : '解密'}文件
        </button>
      )}
    </div>
  );
}