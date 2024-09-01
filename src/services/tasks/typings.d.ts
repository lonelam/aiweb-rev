declare namespace API {
  export type IFileUploadResponseData = {
    name: string;
    url: string;
  };
  export type TaskStatus =
    | 'init'
    | 'queueing'
    | 'pending'
    | 'running'
    | 'failed'
    | 'success';

  export interface IPublicTask {
    id: number;
    name: string;
    status: TaskStatus;
    data: string;
    resultData: string;
    progressData: string;
    createTime: Date;
    updateTime: Date;
    templateId: number;
    creatorId: number;
  }

  export interface ICreateTaskParams {
    templateId: number;
    data: string;
    name: string;
  }

  export type IPublicTemplateMeta = {
    image: string;
    description: string;
  };
  export type IPublicTemplate = {
    name: string;
    dataSchema: string;
    resultSchema: string;
    id: number;
    visible: boolean;
    createTime: Date;
    //   tasks: Task[];
    updateTime: Date;
    meta?: IPublicTemplateMeta;

    // deleteTime: Date;
  };
  export type IEditableTemplate = Omit<
    IPublicTemplate,
    'id' | 'createTime' | 'updateTime'
  > &
    Partial<Pick<IPublicTemplate, 'id'>>;

  export interface IRemoveBgData {
    image: string;
    prompt: string;
  }

  export interface IRmoveBgResultData {
    image: string;
  }
}
