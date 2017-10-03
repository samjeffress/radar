const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/radar', (req, res) => {
  res.json([
    {id: 1, x: 3, y: 3, z: 100, type: 'tools', quadrant: 'tools', name: 'thing', ring: 'adopt', updatedAt: Date()},
    {id: 2, x: 4, y: 4, z: 300, type: 'languages', quadrant: 'languages', name: 'cats', ring: 'trash', updatedAt: Date()},
    {id: 3, x: 5, y: 5, z: 900, type: 'process', quadrant: 'process', name: 'talking', ring: 'adopt', updatedAt: Date()},
  ]);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Radar listening on ${port}`);
