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

  export interface IBatchFetchTasksParams {
    taskIds: number[];
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

  export interface IBaseImageData {
    image: string;
  }

  export interface IBasePromptData {
    prompt: string;
  }

  export interface IRemoveBgData extends IBaseImageData, IBasePromptData {
    prompt: string;
  }

  export interface IRmoveBgResultData extends IBaseImageData {
    image: string;
  }

  export interface IFastClearifyData extends IBaseImageData, IBasePromptData {
    image: string;
    prompt: string;
  }

  export interface IFastClearifyResultData extends IBaseImageData {
    image: string;
  }

  export interface IFastExpandData extends IBaseImageData, IBasePromptData {
    image: string;
    prompt: string;
  }

  export interface IFastExpandResultData extends IBaseImageData {
    image: string;
  }

  export interface IFastRemoveObjData extends IBaseImageData, IBasePromptData {
    image: string;
    prompt: string;
  }

  export interface IFastRemoveObjResultData extends IBaseImageData {
    image: string;
  }
}
