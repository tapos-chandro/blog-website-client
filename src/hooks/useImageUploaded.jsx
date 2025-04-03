import { useEffect, useState } from "react";

const useImageUploaded = (image) => {
  const [uploadUrl, setUploadUrl] = useState(null);
  const [loading, seLoading] = useState(true);

  useEffect(() => {
    if (!image) {
      setUploadUrl(null);
      // setLoading(false);
      return;
    }else{
      setUploadUrl(null)
      seLoading(true)
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
          setUploadUrl(null)
          // console.log("uploaded image url", data.data.url);
          seLoading(true)
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
  }, [image]);

  return { uploadUrl, setUploadUrl, loading };
};

export default useImageUploaded;
