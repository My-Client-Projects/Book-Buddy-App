import { useEffect, useState } from "react";
import AddBook from "../components/AddBook";

const ReadingList = () => {
  const [readingList, setReadingList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const savedList = localStorage.getItem("readingList");
    if (savedList) setReadingList(JSON.parse(savedList));
  }, []);

  const handleAddBook = (book) => {
    if (editingBook) {
      const updatedList = readingList.map(b => 
        b.id === editingBook.id ? { ...book, id: editingBook.id } : b
      );
      setReadingList(updatedList);
      localStorage.setItem("readingList", JSON.stringify(updatedList));
    } else {
      
      const newBook = { ...book, id: crypto.randomUUID() };
      const updatedList = [...readingList, newBook];
      setReadingList(updatedList);
      localStorage.setItem("readingList", JSON.stringify(updatedList));
    }
    setShowAddModal(false);
    setEditingBook(null);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this book?")) {
      const updatedList = readingList.filter(book => book.id !== id);
      setReadingList(updatedList);
      localStorage.setItem("readingList", JSON.stringify(updatedList));
    }
  };

  return (
    <div className="pt-10 px-5 flex flex-1 flex-col w-[83vw] justify-between gap-[20px] max-[920px]:w-[90%]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Reading List</h1>
        <button
          onClick={() => {
            setEditingBook(null);
            setShowAddModal(true);
          }}
          className="bg-mainColor text-white px-4 py-2 rounded hover:opacity-90"
        >
          Add Book
        </button>
      </div>

      {readingList.length === 0 ? (
        <p className="text-gray-600">No books added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Author</th>
                <th className="px-4 py-2 border">Year</th>
                <th className="px-4 py-2 border">ISBN</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {readingList.map((book, index) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2">{book.title}</td>
                  <td className="border px-4 py-2">{book.author}</td>
                  <td className="border px-4 py-2">{book.year}</td>
                  <td className="border px-4 py-2">{book.isbn}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="px-3 py-1 bg-blue-600 text-black rounded hover:bg-blue-700 transition-colors"
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-black rounded hover:bg-red-700 transition-colors"
                        onClick={() => handleDelete(book.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <AddBook 
              onAdd={handleAddBook}
              initialData={editingBook}
              onClose={() => {
                setShowAddModal(false);
                setEditingBook(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingList;