import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React, { ChangeEventHandler, FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import fileImage from "@/assets/images/file.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface IDropzone {
  multiple?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
}

const Dropzone: FC<IDropzone> = ({ multiple, onChange, error, ...rest }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple,
    ...rest,
  });
  const [file, setFile] = useState<File[]>([]);

  useEffect(() => {
    if (onChange) {
      if (multiple) {
        setFile([...file, ...acceptedFiles]);
        onChange([...file, ...acceptedFiles] as any);
      } else {
        onChange(acceptedFiles?.[0] as any);
      }
    }
  }, [acceptedFiles]);

  return (
    <>
      <Box
        {...getRootProps()}
        className={`block p-10 border-dashed border cursor-pointer hover:opacity-70 transition-opacity ${
          error ? `border-red-400 bg-orange-100` : `border-gray-300 bg-gray-100`
        } rounded `}
      >
        <input {...getInputProps()} />
        <div className="flex gap-10 items-center">
          <div className="basis-56 object-cover">
            <Image className="h-auto w-full" src={fileImage} alt="file" />
          </div>
          <div>
            <Typography
              variant="h5"
              className={error ? `text-red-500` : undefined}
            >
              Kéo thả hoặc chọn tập tin hình ảnh
            </Typography>
            <Typography variant="body2">
              Kéo thả file ở đây hoặc bấm
              <span className="mx-1 text-blue-600 underline">mở thư mục</span>
              qua máy của bạn
            </Typography>
          </div>
        </div>
      </Box>
      {file.length !== 0 && (
        <Box className="my-6 flex flex-wrap">
          {file.map((file) => (
            <div className="m-1 relative w-20 h-20">
              <LazyLoadImage
                src={URL.createObjectURL(file)}
                alt="file"
                className="h-full object-cover"
              />
            </div>
          ))}
        </Box>
      )}
    </>
  );
};

export default Dropzone;
