import React, { useState, useRef } from 'react';

export default function Encrypter() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理文件选择（通过 input 选择）
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  // 拖拽上传处理
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

  // 点击区域触发隐藏的 input
  const handleClickDropArea = () => {
    fileInputRef.current?.click();
  };

  // 切换加密或解密模式
  const handleModeChange = (newMode: 'encrypt' | 'decrypt') => {
    setMode(newMode);
    setError(null);
  };

  // 上传文件（调用后端 API）
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

  // 下载文件，不删除按钮
  const downloadFile = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download =
        mode === 'encrypt'
          ? `${file?.name}.aes`
          : file?.name.replace(/\.aes$/, '');
      a.click();
      // 保留下载链接，用户可重复点击下载
    }
  };

  return (
    <div className="container margin-vert--lg">
      {/* 标题 */}
      <div className="text--center">
        <h2>AES 文件{mode === 'encrypt' ? '加密' : '解密'}</h2>
      </div>

      {/* 模式选择区域：单独一行 */}
      <div className="text--center margin-bottom--md">
        <button
          className="button"
          onClick={() => handleModeChange('encrypt')}
          style={{ marginRight: '8px' }}
        >
          加密文件
        </button>
        <button className="button" onClick={() => handleModeChange('decrypt')}>
          解密文件
        </button>
      </div>

      {/* 文件选择区域：单独一行，支持点击和拖拽 */}
      <div className="text--center margin-bottom--md">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClickDropArea}
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            cursor: 'pointer',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
          }}
        >
          {file ? (
            <span>已选择文件: {file.name}</span>
          ) : (
            <span>点击或拖拽文件到此区域以上传</span>
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
      <div className="text--center">
        <button
          onClick={uploadFile}
          disabled={!file}
          className="button"
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

      {/* 错误提示 */}
      {error && (
        <div className="alert alert--danger margin-top--md" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}