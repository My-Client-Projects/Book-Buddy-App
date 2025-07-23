import { Link } from "react-router-dom";

const BookCard = ({ id, coverImage, title, author, year, editionCount, ebookAccess }) => {

  const handleAddToReadingList = () => {
    const newBook = {
      id: id || crypto.randomUUID(),
      title: title || "Untitled",
      author: author || "Unknown Author",
      year: year || "Unknown Year",
    };

    const savedList = JSON.parse(localStorage.getItem("readingList")) || [];
    const isAlreadyAdded = savedList.some((b) => b.id === newBook.id);

    if (!isAlreadyAdded) {
      savedList.push(newBook);
      localStorage.setItem("readingList", JSON.stringify(savedList));
      alert("Book added to your reading list!");
    } else {
      alert("This book is already in your reading list.");
    }
  };

  return (
    <div className="info-card w-[24%] bg-white rounded-[10px] p-5 max-[1000px]:w-[250px] hover:translate-y-[-2px] transition-[0.6s] shadow-md hover:shadow-lg">
      <div className="flex gap-4">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`Cover of ${title}`}
            className="w-24 h-36 object-contain rounded"
          />
        ) : (
          <div className="w-24 h-36 bg-gray-100 flex items-center justify-center rounded">
            <i className="bi bi-book text-3xl text-gray-400"></i>
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>

          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">By:</span> {author}
          </p>

          <p className="text-sm text-gray-600">
            <span className="font-medium">Published:</span> {year}
          </p>

          {editionCount && (
            <p className="text-xs text-gray-500 mt-1">
              {editionCount} edition{editionCount !== 1 ? "s" : ""}
            </p>
          )}

          {ebookAccess && (
            <p className="text-xs mt-1">
              <span
                className={`px-2 py-1 rounded ${
                  ebookAccess === "borrowable"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {ebookAccess === "borrowable" ? "Ebook available" : "No ebook"}
              </span>
            </p>
          )}

          <Link
            to={`/book/${id.replace("/works/", "")}`}
            className="inline-block mt-3 text-sm text-mainColor font-medium underline"
          >
            View Details
          </Link>

          <button
            onClick={handleAddToReadingList}
            className="mt-2 bg-mainColor px-3 py-1 text-white rounded"
          >
            Add to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
