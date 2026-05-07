import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const projects = [
  {
    id: 1,
    title: 'Salon Management System',
    description:
      'Developed frontend components using React during a Java Full Stack internship, including booking workflows and user interface features.',
    techStack: ['React', 'Java', 'UI'],
    github: 'https://github.com/srivarshini06',
  },
  {
    id: 2,
    title: 'Hiring Management System',
    description:
      'Built as part of academic coursework with a focus on system design, core functionality, and workflow consistency.',
    techStack: ['Java', 'MySQL', 'System Design'],
    github: 'https://github.com/srivarshini06',
  },
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend connected',
    environment: process.env.NODE_ENV || 'development',
  });
});

app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});
