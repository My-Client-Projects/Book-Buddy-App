import React, { useState, useEffect } from "react";
import IconCard from "../../components/dashboard-comps/IconCard";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBooks = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=12`
      );
      const data = await response.json();
      
      if (data.docs && data.docs.length > 0) {
        const formattedResults = data.docs.map(book => ({
          id: book.key,
          title: book.title || "Untitled",
          author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
          year: book.first_publish_year || "Unknown Year",
          coverId: book.cover_i,
          editionCount: book.edition_count,
          ebookAccess: book.ebook_access
        }));
        setSearchResults(formattedResults);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
      console.error("Error fetching books:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      searchBooks();
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const chunkedResults = [];
  for (let i = 0; i < searchResults.length; i += 4) {
    chunkedResults.push(searchResults.slice(i, i + 4));
  }

  return (
    <div className="dashboard pt-10 px-5 flex flex-1 flex-col w-[79vw] justify-between gap-[20px] max-[920px]:w-[90%]">
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
          className="bg-[#F7F7F7] text-[18px] text-[#666] py-[5px] max-[720px]:w-[100%] focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-4">{error}</div>
      )}

      {!isLoading && searchTerm && searchResults.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No books found. Try a different search term.
        </div>
      )}

      <div className="info-cards flex flex-col gap-[20px]">
        {chunkedResults.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-between gap-[20px] max-[1000px]:flex-wrap"
          >
            {row.map((book, index) => (
              <IconCard
                key={`${book.id}-${index}`}
                id={book.id}
                coverImage={book.coverId ? 
                  `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg` : 
                  null}
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