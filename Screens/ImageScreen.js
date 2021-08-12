import React from "react";
import AppFormImagePicker from "../Component/ImageHandling/AppFormImage";
import AppForm from "../Component/ImageHandling/AppForm";

function ImageScreen(props) {
  const handleSubmit = (value) => {
    console.log(value);
  };
  return (
    <AppForm
      initialValues={{
        images: [],
      }}
      onSubmit={handleSubmit}
    >
      <AppFormImagePicker name="images" />
    </AppForm>
  );
}

export default ImageScreen;
