import http from 'http';
import express from 'express';

const app = express();

export function startServer(port: any) {
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use.`);
    } else {
      console.error('An error occurred while starting the server:', err);
    }
    process.exit(1);
  });
}
