import React, { useState, useRef } from 'react';

export default function AyameModelEncryptor() {
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
        ? 'https://shrill-dust-d687.happyrespawnanchor.workers.dev/encrypt'
        : 'https://shrill-dust-d687.happyrespawnanchor.workers.dev/decrypt';

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
      <div className="text--center">
        <h2>Ayame 加密模型解析器</h2>
      </div>

      <div
        className="margin-bottom--md"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <button
          className={`button ${mode === 'encrypt' ? 'button--primary' : 'button--outline'}`}
          onClick={() => handleModeChange('encrypt')}
        >
          加密模型
        </button>
        <button
          className={`button ${mode === 'decrypt' ? 'button--primary' : 'button--outline'}`}
          onClick={() => handleModeChange('decrypt')}
        >
          解密模型
        </button>
      </div>

      <div
        className="margin-bottom--md"
        style={{
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <div
          onClick={handleClickDropArea}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="card card--shadow"
          style={{
            border: '2px dashed var(--ifm-color-emphasis-200)',
            padding: '20px',
            borderRadius: '4px',
            backgroundColor: 'var(--ifm-card-background-color)',
            cursor: 'pointer',
            textAlign: 'center'
          }}
        >
          {file ? (
            <strong>{file.name}</strong>
          ) : (
            <span style={{ color: 'var(--ifm-color-emphasis-600)' }}>
              点击或拖拽文件到此上传
            </span>
          )}
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </div>

      <div className="text--center margin-top--md">
        <button
          onClick={uploadFile}
          disabled={!file}
          className="button button--primary"
          style={{ marginRight: '8px' }}
        >
          {mode === 'encrypt' ? '上传并加密' : '上传并解密'}
        </button>
        {downloadUrl && (
          <button onClick={downloadFile} className="button">
            下载{mode === 'encrypt' ? '加密' : '解密'}文件
          </button>
        )}
      </div>

      {error && (
        <div className="text--center margin-top--md">
          <div className="alert alert--danger" role="alert">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}