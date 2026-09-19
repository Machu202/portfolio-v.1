import { useState, useEffect } from 'react';

export default function Hobby() {
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts?category=Hobby&page=${currentPage}&size=5`)
      .then(response => response.json())
      .then(data => {
        setHobbies(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  }, [currentPage]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`http://localhost:8080/api/posts/${id}`, {
        method: 'DELETE',
      })
      .then(() => {
        setHobbies(hobbies.filter(hobby => hobby.id !== id));
      })
      .catch(error => console.error("Error deleting post:", error));
    }
  };

  return (
    <div className="page-container">
      <h2>My Hobbies</h2>
      {loading ? <p>Loading...</p> : (
        <div className="card-list">
          {hobbies.map((hobby) => (
            <article className="hobby-post" key={hobby.id}>
              {hobby.imageUrl && (
                <img 
                  src={hobby.imageUrl} 
                  alt={hobby.title} 
                  className="card-image" 
                  onError={(e) => e.target.style.display = 'none'} 
                />
              )}
              {/* ------------------- */}
              <h3>{hobby.title}</h3>
              <p>{hobby.content}</p>
              
              <button 
                onClick={() => handleDelete(hobby.id)}
                style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Delete Post
              </button>
            </article>
          ))}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center', alignItems: 'center' }}>
        <button 
          disabled={currentPage === 0} 
          onClick={() => setCurrentPage(currentPage - 1)}
          style={{ padding: '0.5rem 1rem', cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}>
          Previous
        </button>
        
        <span>Page {currentPage + 1} of {totalPages === 0 ? 1 : totalPages}</span>
        
        <button 
          disabled={currentPage + 1 >= totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
          style={{ padding: '0.5rem 1rem', cursor: currentPage + 1 >= totalPages ? 'not-allowed' : 'pointer' }}>
          Next
        </button>
      </div>
    </div>
  );
}