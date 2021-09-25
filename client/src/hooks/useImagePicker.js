import { useState, useRef } from "react";

export const useImagePicker = () => {
  const [placeholder, setPlaceholder] = useState();
  const [file, setFile] = useState();
  const inputFile = useRef(null);

  const onChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      setPlaceholder(URL.createObjectURL(file));
      setFile(file);
    }
    return file;
  };

  const onImageClick = () => {
    inputFile.current.click();
  };

  const resetPlaceholder = () => {
    setFile("");
    setPlaceholder("");
  };

  return {
    placeholder,
    file,
    inputFile,
    onChange,
    onImageClick,
    resetPlaceholder,
  };
};
