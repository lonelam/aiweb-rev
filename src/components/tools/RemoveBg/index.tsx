import { Button, Col, Row, Typography, UploadFile } from 'antd';
import { useCallback, useState } from 'react';
import RemoveBgTaskList from './remove-bg-task-list';
import RetouchSvg from './retouch.svg';
import ImageUploader from './uploader';
const { Title, Paragraph } = Typography;

const RemoveBg = () => {
  const [currentOperation, setCurrentOperation] = useState('upload');
  const [uploadedFileList, setUploadedFileList] = useState<UploadFile<any>[]>(
    [],
  );
  const handleUploadFinish = useCallback((fileList: UploadFile<any>[]) => {
    setUploadedFileList(fileList);
    setCurrentOperation('waiting');
  }, []);

  return (
    <div className="bg-neutral-1 px-4 py-8 sm:px-6 sm:py-16 md:px-8 lg:py-20 xl:px-10 min-h-screen">
      <Row gutter={[16, 16]} justify="center">
        {/* Header Section */}
        <Col xs={24} md={18} lg={14} className="text-center">
          <Title level={1} className="flex justify-center items-center gap-2">
            <img
              alt="AI Icon"
              src={RetouchSvg}
              className="inline-block h-8 w-8 sm:h-14 sm:w-14 lg:h-18 lg:w-18 mr-2"
            />
            AI一键消除背景
          </Title>
          <Paragraph className="text-content-secondary">
            一键批量消除背景，抠图、生成素材
          </Paragraph>
        </Col>

        {currentOperation === 'upload' && (
          <>
            <Col xs={24} md={18} lg={12} className="text-center">
              <ImageUploader onUploadFinish={handleUploadFinish} />
            </Col>

            <Col xs={24} md={18}>
              <div className="text-center mb-4">
                <Paragraph className="text-content-secondary">
                  手头没有图？试试其中一张【🏗施工中】
                </Paragraph>
                <div className="flex justify-center gap-2">
                  {['01.avif', '01.avif', '01.avif', '01.avif', '01.avif'].map(
                    (src, index) => (
                      <Button
                        key={index}
                        shape="default"
                        className="overflow-hidden bg-neutral-2 p-0"
                        style={{ width: '48px', height: '48px' }}
                      >
                        <img
                          alt={`Sample ${index + 1}`}
                          src={`/sample/${src}`}
                          className="object-cover h-full"
                        />
                      </Button>
                    ),
                  )}
                </div>
              </div>
            </Col>
          </>
        )}
        {currentOperation === 'waiting' && (
          <Col xs={24} md={18} lg={12} className="text-center">
            <RemoveBgTaskList uploadedFileList={uploadedFileList} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default RemoveBg;
