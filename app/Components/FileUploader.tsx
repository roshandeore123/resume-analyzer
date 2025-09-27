import {  useState,useCallback } from "react"
import {useDropzone} from 'react-dropzone'
import { formatSize } from "~/lib/utils";

interface FileUploaderProps{
    onFileSelect?:(file:File|null)=>void;
}
const FileUploader = ({onFileSelect}:FileUploaderProps) => {
    //const [file, setFile]=useState();

    const onDrop = useCallback((acceptedFiles :File[])=> {
    const File=acceptedFiles[0] || null;

    onFileSelect ?.(File);
  }, [onFileSelect]);

  const maxFileSize=20*1024*1024;

  const {getRootProps, getInputProps, isDragActive,acceptedFiles} = useDropzone({onDrop,
    multiple:false,
    accept:{'application/pdf':['.pdf']},
    maxSize:maxFileSize,
})
const File=acceptedFiles[0] || null;
  return (
    <div className='w-full gradient-border'> 
     <div {...getRootProps()}>
      <input {...getInputProps()} />

      <div className="space-y-4 cursor-pointer">
       
        {File ?(
          <div className="uploader-selected-file" onClick={(e)=>e.stopPropagation()}>
             <img src="/images/pdf.png" alt="pdf" className="size-10 " />
             <div className="flex item-center space-x-3">
             
             <div>
                <p className="text-sm font-medium  text-gray-700 truncate max-w-xs">
                    {File.name}
                </p>
                 <p className="text-sm text-gray-500">
                  {formatSize(File.size)}
                  </p>
             </div>
           </div>
            <button className="p-2 cursor-pointer" onClick={(e)=>{
              onFileSelect?.(null)
            }}>
              <img src="/icons/cross.svg " alt="remove" className="w-4 h-4"/>
            </button>
          </div>
          
        ):(
            <div>
               <div className="mx-auto w-16 h-16 flex itema-center justify-center mb-2">
                 <img src="/icons/info.svg" alt="upload" className="size-20"/>

               </div>
                <p className="text-lg text-gray-500">
                    <span className="font-semibold">
                        Click to upload
                    </span> or drag amd drop

                </p>
                <p className="text-lg text-gray-500"> PDF (max {formatSize(maxFileSize)})</p>
            </div> 
        )}
      </div>
    </div>
    </div>
  )
}

export default FileUploader
