import { useState, useEffect } from 'react';

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts?category=Project&page=${currentPage}&size=5`)
      .then(response => response.json())
      .then(data => {
        setProjects(data.content); 
        setTotalPages(data.totalPages); 
        setLoading(false);
      });
  }, [currentPage]); 

  // NEW: Delete function
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`http://localhost:8080/api/posts/${id}`, {
        method: 'DELETE',
      })
      .then(() => {
        // Instantly remove the deleted post from the screen
        setProjects(projects.filter(project => project.id !== id));
      })
      .catch(error => console.error("Error deleting post:", error));
    }
  };

  return (
    <div className="page-container">
      <h2>Projects & Experience</h2>
      {loading ? <p>Loading...</p> : (
        <div className="card-list">
          {projects.map((project) => (
            <div className="card" key={project.id}>
              
              {/* THIS IS THE IMAGE TAG */}
              {project.imageUrl && (
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="card-image" 
                  onError={(e) => e.target.style.display = 'none'} 
                />
              )}
              {/* ------------------- */}

              <h3>{project.title}</h3>
              <p>{project.content}</p>
              
              <button 
                onClick={() => handleDelete(project.id)}
                style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Delete Post
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center', alignItems: 'center' }}>
        <button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <span>Page {currentPage + 1} of {totalPages === 0 ? 1 : totalPages}</span>
        <button disabled={currentPage + 1 >= totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}