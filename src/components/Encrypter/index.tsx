import React, { useState, useRef } from 'react';

export default function Encrypter() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
      setError(null);
      event.dataTransfer.clearData();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClickDropArea = () => {
    fileInputRef.current?.click();
  };

  const handleModeChange = (newMode: 'encrypt' | 'decrypt') => {
    setMode(newMode);
    setError(null);
    setFile(null);
    setDownloadUrl(null);
  };

  const uploadFile = async () => {
    if (!file) {
      setError('请先选择一个文件');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const endpoint =
      mode === 'encrypt'
        ? 'https://api.ayamemc.org/encrypt'
        : 'https://api.ayamemc.org/decrypt';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('上传失败，请检查文件或稍后重试');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError('上传过程中出现错误，请检查网络或稍后重试');
    }
  };

  const downloadFile = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download =
        mode === 'encrypt'
          ? `${file?.name}.aes`
          : file?.name.replace(/\.aes$/, '');
      a.click();
    }
  };

  return (
    <div className="container margin-vert--lg">
      {/* 标题 */}
      <div className="text--center">
        <h2>AES 文件{mode === 'encrypt' ? '加密' : '解密'}</h2>
      </div>

      {/* 模式选择 */}
      <div className="button-group margin-bottom--md text--center">
        <button
          className={`button ${mode === 'encrypt' ? 'button--primary' : ''}`}
          onClick={() => handleModeChange('encrypt')}
          style={{ marginRight: '8px' }}
        >
          加密文件
        </button>
        <button
          className={`button ${mode === 'decrypt' ? 'button--primary' : ''}`}
          onClick={() => handleModeChange('decrypt')}
        >
          解密文件
        </button>
      </div>

      {/* 文件选择区域 */}
      <div
        className="card card--full-width text--center"
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          backgroundColor: 'var(--ifm-card-background-color)',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={handleClickDropArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <strong>{file.name}</strong>
        ) : (
          <span style={{ color: 'var(--ifm-color-emphasis-600)' }}>
            点击或拖拽文件到此区域上传
          </span>
        )}
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />

      {/* 按钮区域 */}
      <div className="text--center margin-top--md">
        <button
          className="button button--primary"
          onClick={uploadFile}
          disabled={!file}
          style={{ marginRight: '8px' }}
        >
          {mode === 'encrypt' ? '上传并加密' : '上传并解密'}
        </button>
        {downloadUrl && (
          <button className="button button--secondary" onClick={downloadFile}>
            下载{mode === 'encrypt' ? '加密' : '解密'}文件
          </button>
        )}
      </div>

      {/* 提示 */}
      {error && (
        <div className="alert alert--danger margin-top--md">
          {error}
        </div>
      )}
      {downloadUrl && (
        <div className="alert alert--success margin-top--md">
          文件处理成功，请点击下载。
        </div>
      )}
    </div>
  );
}