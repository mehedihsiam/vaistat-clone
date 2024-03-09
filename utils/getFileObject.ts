import mime from 'mime';
import {Asset} from 'react-native-image-picker';

type FileType = Asset & {
  customType?: string;
};

const getFileObject = (asset: FileType) => {
  const newImageUri = 'file:///' + asset.uri?.split('file:/').join('');
  return {
    name: asset.fileName,
    size: asset.fileSize,
    type: asset.customType || mime.getType(newImageUri),
    uri: asset.uri,
  };
};

export default getFileObject;
