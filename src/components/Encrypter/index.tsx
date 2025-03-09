import React, { useState } from 'react';

export default function EncryptFile() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setError(null); // 清除错误提示
    }
  };

  const handleModeChange = (newMode: 'encrypt' | 'decrypt') => {
    setMode(newMode);
    setFile(null);
    setDownloadUrl(null);
    setError(null);
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
      a.download = mode === 'encrypt' ? `${file?.name}.aes` : file?.name.replace('.aes', '');
      a.click();
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
      setFile(null);
    }
  };

  return (
    <div className="container margin-vert--lg">
      <div className="text--center">
        <h2>AES 文件{mode === 'encrypt' ? '加密' : '解密'}</h2>

        {/* 模式切换按钮 */}
        <div className="button-group margin-bottom--md">
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

        {/* 文件选择 */}
        <input type="file" onChange={handleFileChange} className="margin-bottom--md" />
        <div>
          <button
            onClick={uploadFile}
            disabled={!file}
            className="button button--primary margin-right--sm"
          >
            {mode === 'encrypt' ? '上传并加密' : '上传并解密'}
          </button>
          {downloadUrl && (
            <button onClick={downloadFile} className="button button--secondary">
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
    </div>
  );
}