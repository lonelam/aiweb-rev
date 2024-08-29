declare namespace API {
  export type IFileUploadResponseData = {
    name: string;
    url: string;
  };
  export enum TaskStatus {
    INIT = 'init',
    QUEUEING = 'queueing',
    PENDING = 'pending',
    RUNNING = 'running',
    FAILED = 'failed',
    SUCCESS = 'success',
  }

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

  export type UserRole = 'admin' | 'normal' | 'task_slave' | 'anonymous';

  export type IPublicUser = {
    id: number;
    email: string;
    userName: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    authorityKeys: string[];
  };

  export type ILoginByEmailParams = {
    email: string;
    password: string;
  };

  export type IAccessToken = {
    accessToken: string;
  };
}
