import { ImageType } from '@/app/dashboard/add/AddProductForm';
import { useCallback } from 'react';
import {useDropzone} from 'react-dropzone'

interface SelectImageProps {
    handleFileChange : (file: File) =>  void,
    item?: ImageType
}

const SelectImage:React.FC<SelectImageProps> = ({handleFileChange, item}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        handleFileChange(acceptedFiles[0])
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return ( 
    <div {...getRootProps()} className='border-dashed border-slate-500  border-2 p-4 cursor-pointer'>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
    }
    </div> );
}
 
export default SelectImage;