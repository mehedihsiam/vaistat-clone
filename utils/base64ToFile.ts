import getFileObject from './getFileObject';

const base64ToFile = (data: string, name = 'file.png', type = 'image/png') => {
  const blob = new Blob([data], {
    type: 'image/png',
    lastModified: new Date().getTime(),
  });

  const file = getFileObject({
    uri: data,
    fileName: name,
    fileSize: blob.size,
    customType: type,
  });

  return file;
};

export default base64ToFile;
