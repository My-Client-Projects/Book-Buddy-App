import { useForm } from "react-hook-form";

const AddBook = ({ onAdd, initialData, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: initialData || {
      title: "",
      author: "",
      year: "",
      isbn: ""
    }
  });

  const onSubmit = (data) => {
    onAdd(data);
    reset();
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-mainColor">
        {initialData ? "Edit Book" : "Add Book Manually"}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border rounded p-2"
          />
          {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            {...register("author", { required: true })}
            className="w-full border rounded p-2"
          />
          {errors.author && <p className="text-red-500 text-sm">Author is required</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            type="text"
            {...register("year", {
              required: true,
              pattern: /^\d{4}$/
            })}
            className="w-full border rounded p-2"
          />
          {errors.year && (
            <p className="text-red-500 text-sm">Enter a valid 4-digit year</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">ISBN</label>
          <input
            type="text"
            {...register("isbn", {
              required: true,
              pattern: /^(\d{10}|\d{13})$/
            })}
            className="w-full border rounded p-2"
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm">
              ISBN must be 10 or 13 digit number
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-mainColor text-white px-4 py-2 rounded hover:opacity-90"
          >
            {initialData ? "Save Changes" : "Add Book"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddBook;