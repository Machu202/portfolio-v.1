import { useState } from 'react';

export default function Admin() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    category: 'Project'
  });
  const [imageFile, setImageFile] = useState(null); // New state for PC files
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Grabs the selected file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending to server...');

    // Use FormData instead of JSON for file uploads
    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('category', formData.category);
    dataToSend.append('content', formData.content);
    dataToSend.append('imageUrl', formData.imageUrl);
    if (imageFile) {
      dataToSend.append('imageFile', imageFile);
    }

    // Notice we do NOT set 'Content-Type' manually when using FormData
    fetch('http://localhost:8080/api/posts/upload', {
      method: 'POST',
      body: dataToSend
    })
    .then(response => response.json())
    .then(data => {
      setStatus('Success! Post saved to database.');
      setFormData({ title: '', content: '', imageUrl: '', category: 'Project' });
      setImageFile(null);
      // Reset the file input visually
      document.getElementById('fileInput').value = ''; 
    })
    .catch(error => {
      setStatus('Failed to upload post.');
    });
  };

  return (
    <div className="page-container">
      <h2>Admin Dashboard</h2>
      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <input type="text" name="title" placeholder="Post Title" value={formData.title} onChange={handleChange} required style={{ padding: '0.5rem' }} />

          <select name="category" value={formData.category} onChange={handleChange} style={{ padding: '0.5rem' }}>
            <option value="Project">Project (FPT University, etc.)</option>
            <option value="Hobby">Hobby (Keyboards, etc.)</option>
            <option value="MovieGame">Movie & Game (Events, Anime, etc.)</option>
          </select>

          {/* New dual image upload section */}
          <div style={{ padding: '1rem', border: '1px dashed #555' }}>
            <p style={{ marginBottom: '0.5rem' }}><strong>Image Source (Choose One):</strong></p>
            <input type="text" name="imageUrl" placeholder="1. Paste an Image URL..." value={formData.imageUrl} onChange={handleChange} style={{ padding: '0.5rem', width: '100%', marginBottom: '0.5rem' }} />
            <p>OR</p>
            <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '0.5rem' }} />
          </div>

          <textarea name="content" placeholder="Write your post content here..." value={formData.content} onChange={handleChange} required style={{ padding: '0.5rem', minHeight: '150px' }} />

          <button type="submit" style={{ padding: '0.75rem', backgroundColor: 'var(--accent-color)', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Publish Post</button>
        </form>
        {status && <p style={{ marginTop: '1rem', color: 'var(--accent-color)' }}>{status}</p>}
      </div>
    </div>
  );
}