import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BookDetail() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const getCoverImage = () => {
    if (book?.covers?.length > 0) {
      return `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`;
    }
    return null;
  };

  const handleAddToReadingList = () => {
    if (!book || typeof book !== "object") {
      alert("Book data is not available.");
      return;
    }

    const id = book.id || book.key || null;
    const title = book.title || "Untitled";
    const author = Array.isArray(book.author_name)
      ? book.author_name.join(", ")
      : book.author || "Unknown Author";
    const year = book.first_publish_year || book.year || "Unknown Year";

    if (!id) {
      alert("This book cannot be added (missing ID).");
      return;
    }

    const newBook = { id, title, author, year };

    const savedList = JSON.parse(localStorage.getItem("readingList")) || [];
    const isAlreadyAdded = savedList.some((b) => b.id === id);

    if (!isAlreadyAdded) {
      savedList.push(newBook);
      localStorage.setItem("readingList", JSON.stringify(savedList));
      alert("Book added to your reading list!");
    } else {
      alert("This book is already in your reading list.");
    }
  };


  if (loading) return <p className="px-5 pt-10">Loading...</p>;
  if (!book) return <p className="px-5 pt-10 text-red-500">Book not found.</p>;

  return (
    <div className="pt-10 w-full max-w-6xl mx-auto px-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-mainColor underline"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-6 relative pl-3 before:content-[''] before:absolute before:w-[4px] before:h-3/4 before:bg-mainColor before:left-0 before:top-[50%] before:translate-y-[-50%]">
        Book Details
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md flex gap-6 max-[700px]:flex-col">
        <div className="flex flex-col items-center">
          {getCoverImage() ? (
            <img
              src={getCoverImage()}
              alt={`Cover of ${book.title}`}
              className="w-36 h-52 object-contain rounded"
            />
          ) : (
            <div className="w-36 h-52 bg-gray-100 flex items-center justify-center rounded">
              <i className="bi bi-book text-4xl text-gray-400"></i>
            </div>
          )}

          <button
            onClick={handleAddToReadingList}
            className="mt-2 bg-mainColor px-3 py-1 text-white rounded"
          >
            Add to List
          </button>
        </div>

        

        <div className="flex-1">

          <h2 className="text-2xl font-semibold">{book.title}</h2>

          {book.description && (
            <p className="mt-3 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          {book.excerpts && book.excerpts.length > 0 && (
            <blockquote className="mt-3 text-gray-600 italic border-l-4 border-mainColor pl-4 text-sm">
              “{book.excerpts[0].excerpt}”
            </blockquote>
          )}

          {book.first_publish_date && (
            <p className="mt-3 text-sm text-gray-500">
              <span className="font-medium">First Published:</span>{" "}
              {book.first_publish_date}
            </p>
          )}

          {book.subjects && (
            <div className="mt-4">
              <h3 className="font-medium mb-1">Subjects:</h3>
              <ul className="list-disc ml-5 text-sm text-gray-600 grid grid-cols-2 gap-x-4">
                {book.subjects.slice(0, 10).map((subj, index) => (
                  <li key={index}>{subj}</li>
                ))}
              </ul>
            </div>
          )}

          {book.links && book.links.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-1">External Links:</h3>
              <ul className="list-disc ml-5 text-sm text-blue-600">
                {book.links.slice(0, 5).map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
