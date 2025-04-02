import { useState } from "react";

const useImageUploaded = (image) => {
  const [uploadUrl, setUploadUrl] = useState(null);
  const [loading, seLoading] = useState(true);

  if (image == null) {
    return "";
  }

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KYE}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        // console.log("uploaded image url", data.data.url);
        setUploadUrl(data.data.url || "not url");
        seLoading(false);
      } else {
        // console.error("uploaded failed", data);
        seLoading(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  uploadImage();

  return { uploadUrl, setUploadUrl, loading , uploadImage};
};

export default useImageUploaded;
