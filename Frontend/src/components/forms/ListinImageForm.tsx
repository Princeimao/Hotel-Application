import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ListinImageForm = ({ images, setImages }: Props) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...e.target.files]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-160">
      <div className="h-120 w-210 rounded-2xl bg-gray-100">
        <Label className="h-120 w-210 cursor-pointer flex flex-col items-center justify-center">
          <img src="../../../Drag_and_Drop.jpg" alt="" className="w-30" />
          <h4 className="text-gray-400 text-lg font-bold text-center">
            Drag and Drop
          </h4>
          <Input
            type="file"
            name="roomImages"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </Label>
      </div>

      <div className={`${images.length !== 0 ? "min-h-70 mb-40" : null}`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 w-full max-w-3xl">
          {images.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="w-full h-30 object-cover rounded-lg shadow"
              />
              <Button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListinImageForm;
