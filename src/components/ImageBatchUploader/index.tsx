import { getAuthHeaders } from '@/store/auth/state';
import { UploadOutlined } from '@ant-design/icons';

import { Button, message, Typography, Upload, UploadProps } from 'antd';
import { UploadFile } from 'antd/lib';
const { Paragraph } = Typography;
export interface IImageUploaderProps {
  onUploadFinish: (fileList: UploadFile<any>[]) => void;
}
const ImageBatchUploader = (props: IImageUploaderProps) => {
  const { onUploadFinish } = props;
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture-card',
    accept: 'image/jpeg,image/png,image/webp',
    headers: getAuthHeaders(),
    showUploadList: true,
    action: '/api/file/upload',
    onChange(info) {
      if (info.fileList.every((f) => f.status === 'done')) {
        // goto waiting phase
        onUploadFinish(info.fileList);
      }
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <Upload.Dragger {...uploadProps}>
      <Paragraph>点击</Paragraph>
      <Button type="primary" icon={<UploadOutlined />} className="mb-2">
        选择图片
      </Button>
      <Paragraph>或拖放文件到此处</Paragraph>
    </Upload.Dragger>
  );
};

export default ImageBatchUploader;
