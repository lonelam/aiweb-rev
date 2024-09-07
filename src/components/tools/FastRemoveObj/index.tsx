import ImageBatchUploader from '@/components/ImageBatchUploader';
import ImagePromptTasksCreator from '@/components/ImagePromptTasksCreator';
import ImageTaskListPreview from '@/components/ImageTaskListPreview';
import { createFastRemoveObjectTask } from '@/services/tasks/fast-remove-obj';
import { Col, Row, Typography, UploadFile } from 'antd';
import { useCallback, useState } from 'react';
import RemoveObjectSvg from './remove_object.svg'; // Replace with appropriate SVG
const { Title, Paragraph } = Typography;

const FastRemoveObject = () => {
  const [currentOperation, setCurrentOperation] = useState('upload');
  const [uploadedFileList, setUploadedFileList] = useState<UploadFile<any>[]>(
    [],
  );
  const [taskIds, setTaskIdsState] = useState<number[]>([]);

  const handleUploadFinish = useCallback((fileList: UploadFile<any>[]) => {
    setUploadedFileList(fileList);
    setCurrentOperation('creating');
  }, []);

  const setTaskIds = useCallback((newTaskIds: number[]) => {
    setTaskIdsState(newTaskIds);
    setCurrentOperation('waiting');
  }, []);

  return (
    <div className="bg-neutral-1 px-4 py-8 sm:px-6 sm:py-16 md:px-8 lg:py-20 xl:px-10 min-h-screen">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={18} lg={14} className="text-center">
          <Title level={1} className="flex justify-center items-center gap-2">
            <img
              alt="AI Icon"
              src={RemoveObjectSvg}
              className="inline-block h-8 w-8 sm:h-14 sm:w-14 lg:h-18 lg:w-18 mr-2"
            />
            AI一键消除物体
          </Title>
          <Paragraph className="text-content-secondary">
            一键消除图像中的不需要的对象
          </Paragraph>
        </Col>

        {currentOperation === 'upload' && (
          <>
            <Col xs={24} md={18} lg={12} className="text-center">
              <ImageBatchUploader onUploadFinish={handleUploadFinish} />
            </Col>
          </>
        )}
        {currentOperation === 'creating' && (
          <ImagePromptTasksCreator
            uploadedFileList={uploadedFileList}
            setTaskIds={setTaskIds}
            createTaskFn={createFastRemoveObjectTask}
          />
        )}
        {currentOperation === 'waiting' && (
          <Col xs={24} md={18} lg={12} className="text-center">
            <ImageTaskListPreview taskIds={taskIds} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default FastRemoveObject;
