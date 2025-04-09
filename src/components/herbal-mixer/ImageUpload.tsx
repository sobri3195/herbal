
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

const ImageUpload = ({ imageUrl, setImageUrl }: ImageUploadProps) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isImageUploading, setIsImageUploading] = useState(false);

  async function uploadImage(file: File) {
    setIsImageUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Simulasikan panggilan API untuk sementara
      setTimeout(() => {
        setImageUrl(URL.createObjectURL(file));
        toast({
          title: "Berhasil!",
          description: "Gambar berhasil diunggah.",
        });
        setIsImageUploading(false);
      }, 1500);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oh tidak! Ada kesalahan.",
        description: error.message || "Gagal mengunggah gambar",
      });
      setIsImageUploading(false);
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      uploadImage(acceptedFiles[0]);
    },
  });

  const thumbs = files.map((file: any) => (
    <div key={file.name} className="inline-flex rounded-md border border-muted">
      <img
        src={file.preview}
        alt={file.name}
        className="rounded-md object-cover"
        width={100}
        height={100}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  return (
    <div>
      <Label>Gambar</Label>
      <div
        className="border-dashed border-2 border-muted/50 relative rounded-md cursor-pointer h-[200px]"
        {...getRootProps()}
      >
        <Input {...getInputProps()} className="hidden" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-muted">
          {isImageUploading ? (
            <>
              Mengunggah{" "}
              <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828-.586l-5.691 5.691-2.121-2.121a2 2 0 0 0-2.828-.586L3 12" />
              </svg>
              <p className="text-sm">Klik untuk mengunggah atau seret dan lepas</p>
              <em className="text-xs">
                (Hanya file gambar *.jpeg, *.jpg dan *.png yang diterima)
              </em>
            </>
          )}
        </div>
        {thumbs.length > 0 ? (
          <aside className="flex mt-4">{thumbs}</aside>
        ) : imageUrl ? (
          <aside className="flex mt-4">
            <div className="inline-flex rounded-md border border-muted">
              <img
                src={imageUrl}
                alt="Diunggah"
                className="rounded-md object-cover"
                width={100}
                height={100}
              />
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
};

export default ImageUpload;
