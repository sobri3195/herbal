
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "./ImageUpload";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  description: z.string().min(10, {
    message: "Deskripsi harus minimal 10 karakter.",
  }),
  category: z.string({
    required_error: "Silakan pilih kategori.",
  }),
});

interface HerbalBlendFormProps {
  defaultValues: {
    name: string;
    description: string;
    category: string;
  };
  isEditing: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  isEdit: boolean;
}

const HerbalBlendForm = ({
  defaultValues,
  isEditing,
  onSubmit,
  imageUrl,
  setImageUrl,
  isEdit
}: HerbalBlendFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Nama</Label>
                <FormControl>
                  <Input placeholder="Nama Campuran Herbal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Label>Kategori</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Tea">Teh</SelectItem>
                    <SelectItem value="Tincture">Tingtur</SelectItem>
                    <SelectItem value="Capsule">Kapsul</SelectItem>
                    <SelectItem value="Topical">Topikal</SelectItem>
                    <SelectItem value="Other">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label>Deskripsi</Label>
              <FormControl>
                <Textarea
                  placeholder="Jelaskan campuran herbal Anda"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />

        <Button type="submit" disabled={isEditing}>
          {isEditing ? (
            <>
              {isEdit ? "Memperbarui" : "Membuat"}{" "}
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
          ) : isEdit ? (
            "Perbarui campuran herbal"
          ) : (
            "Buat campuran herbal"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default HerbalBlendForm;
