import { useEffect, useRef, useState } from "react";

const ReadingList = () => {
  const [readingList, setReadingList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editBook, setEditBook] = useState({ title: "", author: "" });
  const isInitialized = useRef(false);

  useEffect(() => {
    const savedList = localStorage.getItem("readingList");
    if (savedList) setReadingList(JSON.parse(savedList));
    isInitialized.current = true;
  }, []);

  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem("readingList", JSON.stringify(readingList));
    }
  }, [readingList]);

  const handleDelete = (index) => {
    const updatedList = [...readingList];
    updatedList.splice(index, 1);
    setReadingList(updatedList);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditBook(readingList[index]);
  };

  const handleSave = () => {
    const updatedList = [...readingList];
    updatedList[editingIndex] = editBook;
    setReadingList(updatedList);
    setEditingIndex(null);
    setEditBook({ title: "", author: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Reading List</h1>
      {readingList.length === 0 ? (
        <p className="text-gray-600">No books added yet.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {readingList.map((book, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {editingIndex === index ? (
                    <input
                      className="border p-1"
                      value={editBook.title}
                      onChange={(e) =>
                        setEditBook({ ...editBook, title: e.target.value })
                      }
                    />
                  ) : (
                    book.title
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingIndex === index ? (
                    <input
                      className="border p-1"
                      value={editBook.author}
                      onChange={(e) =>
                        setEditBook({ ...editBook, author: e.target.value })
                      }
                    />
                  ) : (
                    book.author
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {editingIndex === index ? (
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReadingList;
