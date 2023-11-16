import api from '@/services/api';

export default async function Home() {

    const { data: sectionsData } = await api.sections.findMany();

    const {
        hero,
        about,
        skills,
        projects,
        drawings
    } = api.sections.filterSections(["hero", "about", "skills", "projects", "drawings"], sectionsData);


    const { data: skillsListData, error: skillsListError } = await api.skillsList.findMany();

    const { data: projectsData, error: projectsError } = await api.projects.findMany();

    const { data: drawingsGalleryData, error: drawingsGalleryError } = await api.drawings.findMany();

    return (
        <main className="min-h-[200vh]">
        
        </main>
    )
}
