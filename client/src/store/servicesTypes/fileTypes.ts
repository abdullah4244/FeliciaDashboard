export type Filter = {
    id : number;
    tag :string;
    createdAt : string;
    updatedAt : string;
    fileId : number;
  }
export type File = {
  id : number;
  name :string;
  url : string;
  createdAt : string;
  updatedAt : string;
  filters : Filter[]
}

export interface GetFilesReponse {
    data : File[]
}