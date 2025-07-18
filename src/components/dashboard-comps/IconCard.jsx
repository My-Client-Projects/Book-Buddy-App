import React from "react";

const IconCard = ({ 
  coverImage, 
  title, 
  author, 
  year, 
  description, 
  editionCount,
  ebookAccess 
}) => {
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
          <h2 className="text-lg font-semibold line-clamp-2">
            {title}
          </h2>
          
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">By:</span> {author}
          </p>
          
          <p className="text-sm text-gray-600">
            <span className="font-medium">Published:</span> {year}
          </p>
          
          {editionCount && (
            <p className="text-xs text-gray-500 mt-1">
              {editionCount} edition{editionCount !== 1 ? 's' : ''}
            </p>
          )}
          
          {ebookAccess && (
            <p className="text-xs mt-1">
              <span className={`px-2 py-1 rounded ${
                ebookAccess === 'borrowable' ? 
                  'bg-green-100 text-green-800' : 
                  'bg-gray-100 text-gray-800'
              }`}>
                {ebookAccess === 'borrowable' ? 'Ebook available' : 'No ebook'}
              </span>
            </p>
          )}
        </div>
      </div>
    
    </div>
  );
};

export default IconCard;