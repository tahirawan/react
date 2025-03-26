import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import {useState} from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    });

    function handleAddTask(text) {
        setProjectsState(prevState => {
            const taskId = Math.random();

            const newTask = {
                text: text,
                id: taskId,
                projectId: prevState.selectedProjectId
            }
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks]
            }
        })
    }

    function handleDeleteTask(taskId) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(
                    (task) => task.id !== taskId
                    //(task) => task.id === taskId && task.projectId !== prevState.selectedProjectId
                )
            }
        });
    }

    function handlerSelectProject(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: id,
            }
        });
    }

    function handleAddProject(projectData) {
        setProjectsState(prevState => {
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId
            }
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject]
            }
        })
    }

    function handleProjectCreate() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null,
            }
        });
    }

    function handleProjectCreateCancel() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            }
        });
    }

    function handleDeleteProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(
                    (project) => project.id !== prevState.selectedProjectId
                )
            }
        });
    }

    const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

    let content = <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectsState.tasks}
    />

    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAddProject={handleAddProject} onProjectCreateCancel={handleProjectCreateCancel}/>
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onProjectCreate={handleProjectCreate}/>
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                projects={projectsState.projects}
                onProjectCreate={handleProjectCreate}
                onSelectProject={handlerSelectProject}
                selectProjectId={projectsState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;
