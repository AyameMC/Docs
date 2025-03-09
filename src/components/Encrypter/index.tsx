import React, { useState, useRef } from 'react';

export default function Encrypter() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setError(null);
      setSuccess(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
      setError(null);
      setSuccess(null);
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
    setSuccess(null);
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
      setSuccess('文件处理成功，请点击下载按钮');
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
      // 不移除下载按钮，允许多次下载
    }
  };

  return (
    <div className="container margin-vert--lg">
      {/* 标题 */}
      <div className="text--center">
        <h2>AES 文件{mode === 'encrypt' ? '加密' : '解密'}</h2>
      </div>

      {/* 模式选择区域 */}
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
          加密文件
        </button>
        <button
          className={`button ${mode === 'decrypt' ? 'button--primary' : 'button--outline'}`}
          onClick={() => handleModeChange('decrypt')}
        >
          解密文件
        </button>
      </div>

      {/* 文件选择区域：居中，宽度限制为 400px */}
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
          }}
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
      </div>

      {/* 操作按钮区域 */}
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

      {/* 错误/成功提示 */}
      <div className="text--center margin-top--md">
        {error && (
          <div className="alert alert--danger" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert--success" role="alert">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}