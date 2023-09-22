import * as ImageManipulator from "expo-image-manipulator";

const resizeImage = async (uri, width) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width } }],
    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
  );
  return manipResult.uri;
};

export default resizeImage;
