import { useForm } from "react-hook-form";

const AddBook = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    onAdd(data); 
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-1"
    >
      <h2 className="text-2xl font-bold mb-4 text-mainColor">Add Book Manually</h2>

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

      <button
        type="submit"
        className="bg-mainColor text-white w-full py-2 rounded hover:opacity-90"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBook;
