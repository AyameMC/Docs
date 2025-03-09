import React, { useState, useRef } from 'react';

export default function AyameModelEncryptor() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

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
    setProgress(null);
  };

  const uploadFile = async () => {
    if (!file) {
      setError('请先选择一个文件。');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const endpoint =
      mode === 'encrypt'
        ? 'https://api.ayamemc.org/encrypt'
        : 'https://api.ayamemc.org/decrypt';

    try {
      setProgress(0);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', endpoint, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const blob = new Blob([xhr.response], { type: 'application/octet-stream' });
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setProgress(null);
        } else {
          setError('上传失败，请检查文件或稍后重试。');
          setProgress(null);
        }
      };

      xhr.onerror = () => {
        setError('上传过程中出现错误，请检查网络或稍后重试。');
        setProgress(null);
      };

      xhr.responseType = 'blob';
      xhr.send(formData);
    } catch (err) {
      console.error(err);
      setError('上传过程中出现错误，请检查网络或稍后重试。');
      setProgress(null);
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

      {/* 加密/解密选择 */}
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

      {/* 拖拽上传区域 */}
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

      {/* 按钮与进度条 */}
      <div className="text--center margin-top--md">
        <button
          onClick={uploadFile}
          disabled={!file}
          className="button button--primary"
          style={{ marginBottom: '8px', width: '200px' }}
        >
          {mode === 'encrypt' ? '上传并加密' : '上传并解密'}
        </button>

        {downloadUrl && (
          <button
            onClick={downloadFile}
            className="button button--primary"
            style={{ width: '200px' }}
          >
            下载文件
          </button>
        )}
      </div>

      {/* 进度条 */}
      {progress !== null && (
        <div
          className="progress-bar"
          style={{
            maxWidth: '400px',
            margin: '16px auto 0',
            height: '6px',
            backgroundColor: 'var(--ifm-color-emphasis-200)',
            borderRadius: '4px',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: 'var(--ifm-color-primary)',
              borderRadius: '4px',
            }}
          />
        </div>
      )}

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