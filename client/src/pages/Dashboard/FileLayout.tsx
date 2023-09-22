import { useMemo, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { TagsInput } from "react-tag-input-component";
import { useAddFileMutation, useGetAllFiltersQuery } from '../../store/services/api';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../store/store';
import { MultiSelect } from 'react-multi-select-component';
type Option = {
  label  :string;
  value : string;
}
const FileLayout = () => {
  const {role} = useAppSelector((state)=>state.activeUser.user);
  const {data} =useGetAllFiltersQuery()
  const [multiSelected,setMultiSelected] = useState<Option[]>([])
  const [selected, setSelected] = useState<string[]>([]);
  const [file, setFile] = useState<File>();
  const[addFile,{isLoading}] = useAddFileMutation();

  const uniqueFilters = useMemo(()=>{
    if(!data?.data) {
      return []
    }
    const uniqueIdentifier : any = {}
    return data?.data.map((item)=>({label : item.tag , value : item.tag})).filter((item)=>{
    if(uniqueIdentifier[item.label]) {
       return false
    }
    else {
      uniqueIdentifier[item.label] = item.value
      return true;
    }

    })
  },[data])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
        const formData = new FormData()
        if(file) {
         formData.append('file',file)
        }
        if(role === "admin"){
        selected.forEach((tag)=>{
          formData.append('filters',tag)
        })
       }
       else {
        multiSelected.forEach((item)=>{
          formData.append('filters',item.value)
        })
       }
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
          setMultiSelected([])
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

            { role === "admin" ? <div className='mb-3'>
                <label className="mb-3 block text-black dark:text-white">
                  Add Filters
                </label>
                <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="fruits"
                    placeHolder="enter filters"
                  />
              </div> : 
              <MultiSelect
              options={uniqueFilters}
              value={multiSelected}
              onChange={setMultiSelected}
              labelledBy="Select"
            />}
            </div>

                <button disabled={isLoading} type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray disabled:opacity-50">
                  {isLoading ? "Saving.." : "Save"}
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
