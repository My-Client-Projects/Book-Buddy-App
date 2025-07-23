import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { useSearch } from "../context/SearchContext";
import AddBook from "../components/AddBook";

const Home = () => {
  
  const { query, setQuery, results, setResults } = useSearch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`
      );
      const data = await res.json();

      if (data.docs && data.docs.length > 0) {
        const formattedResults = data.docs.map((book) => ({
          id: book.key,
          title: book.title || "Untitled",
          author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
          year: book.first_publish_year || "Unknown Year",
          coverId: book.cover_i,
          editionCount: book.edition_count,
          ebookAccess: book.ebook_access,
        }));
        setResults(formattedResults);
      } else {
        setResults([]);
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = (book) => {
    setReadingList((prev) => [...prev, book]);
    setShowForm(false);
  };

  useEffect(() => {
    const savedList = localStorage.getItem("readingList");
    if (savedList) {
      setReadingList(JSON.parse(savedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("readingList", JSON.stringify(readingList));
  }, [readingList]);

  return (
    <div className="dashboard pt-10 px-5 flex flex-1 flex-col w-[83vw] justify-between gap-[20px] max-[920px]:w-[90%]">
      <div className="flex items-center justify-center gap-2 relative pl-2">
        <div className="w-[3px] h-[70%] bg-mainColor relative left-0"></div>
        <i className="bi bi-book text-[28px] text-mainColor"></i>
        <h1 className="text-[30px] font-bold">Book Buddy</h1>
        <div className="w-[3px] h-[70%] bg-mainColor relative left-0"></div>
      </div>

      <div className="search flex items-center px-[15px] gap-[5px] bg-[#F7F7F7] border-[#0F0D83]/[0.1] border-[0.8px] border-solid rounded-[8px]">
        <i className="bi bi-search text-[20px] flex items-center"></i>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search by title, author, or subject..."
          className="bg-[#F7F7F7] text-[18px] text-[#666] py-[5px] w-[100%] focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-mainColor text-white px-4 py-2 rounded ml-2"
        >
          Search
        </button>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="w-[140px] h-[40px] bg-mainColor text-white px-4 rounded ml-2"
      >
        {showForm ? "Close Form" : "Add Book"}
      </button>

      {showForm && <AddBook onAdd={handleAddBook} />}

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor"></div>
        </div>
      )}

      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {!loading && query && results.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No books found. Try a different search term.
        </div>
      )}

      <div className="info-cards flex flex-col gap-[20px]">
        {results.length > 0 &&
          results.reduce((rows, book, index) => {
            if (index % 4 === 0) rows.push([]);
            rows[rows.length - 1].push(book);
            return rows;
          }, []).map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-between gap-[20px] max-[1000px]:flex-wrap"
            >
              {row.map((book, index) => (
                <BookCard
                  key={`${book.id}-${index}`}
                  id={book.id}
                  coverImage={
                    book.coverId
                      ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
                      : null
                  }
                  title={book.title}
                  author={book.author}
                  year={book.year}
                  editionCount={book.editionCount}
                  ebookAccess={book.ebookAccess}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;