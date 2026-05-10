'use client';

import { AuthenticatedLayout } from '@/shared/layouts/authenticated-layout';
import { ProjectGrid } from '@/features/project/components/project-grid';
import { projectsData } from '@/data/projects';
import { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

const categories = [
  'Mobile Development',
  'Web Development',
  'AI/ML',
  'Data Science',
  'IoT/Embedded',
];

export default function ProjectsPage() {
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProjects(term, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProjects(searchTerm, category);
  };

  const filterProjects = (term: string, category: string) => {
    let filtered = projectsData;

    if (term) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(term.toLowerCase()) ||
          project.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((project) => project.category === category);
    }

    setFilteredProjects(filtered);
  };

  return (
    <AuthenticatedLayout>
      <div className='p-6 md:p-8 space-y-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Project Collaboration</h1>
            <p className='text-muted-foreground mt-1'>
              Find teammates and collaborate on exciting campus projects
            </p>
          </div>
          <Button className='bg-primary hover:bg-primary/80 text-primary-foreground'>
            + Create Project
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Search Projects
              </label>
              <Input
                placeholder='Search by title or description'
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className='w-full'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className='w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
              >
                <option value=''>All categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

        <div>
          <h2 className='text-lg font-semibold text-foreground mb-4'>
            Available Projects ({filteredProjects.length})
          </h2>
          <ProjectGrid projects={filteredProjects} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
