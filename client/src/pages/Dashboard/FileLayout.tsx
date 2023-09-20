import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { TagsInput } from "react-tag-input-component";
import { useAddFileMutation } from '../../store/services/api';
import { toast } from 'react-toastify';
const FileLayout = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [file, setFile] = useState<File>();
  const[addFile] = useAddFileMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
        const formData = new FormData()
        if(file) {
         formData.append('file',file)
        }
        selected.forEach((tag)=>{
          formData.append('filters',tag)
        })
        addFile(formData).unwrap().then(()=>{
             toast.success("File Successfully Added" ,{
              autoClose : 2000,
              pauseOnHover :false
             })
             
        }).catch(()=>{
          toast.error("Something went wrong while saving!")
        }).finally(()=>{
          setSelected([])
          setFile(undefined)
        })
    }
  return (
    <>
      <Breadcrumb pageName="Add File" />

      <div className="w-full">
        <div className="flex flex-col w-full">
          {/* <!-- Sign In Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Upload File
              </h3>
            </div>
            <form action="#" onSubmit={(e)=>handleSubmit(e)} encType='multipart/form-data'>
              <div className="p-6.5">
              <div className="flex flex-col gap-5.5 p-6.5">
              <div className='mb-3'>
                <label className="mb-3 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  onChange={(e)=>{
                    if(e.target.files){
                      setFile(e.target.files[0])
                    }
                  }}
               />
              </div>
              <div className='mb-3'>
                <label className="mb-3 block text-black dark:text-white">
                  Add Filters
                </label>
                <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="fruits"
                    placeHolder="enter filters"
                  />
              </div>
            </div>

                <button  type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray disabled:opacity-50">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileLayout;
