import { publishEvent } from "../events/publisher.js";
import { ROUTING_KEY } from "../events/routingKey.js";
import { ICreateProjectInput } from "../interface/IProjectsInput.js";
import { prisma } from "../utils/prisma.js";

export const postProjectService = async (data: ICreateProjectInput,userId: string) => {
    const project = await prisma.project.create({
        data: {
            userId,
            title: data.title,
            description: data.description,
            status:
                data.status ?? "IDEA_VALIDATION",
            isOpen:
                data.isOpen ?? true,
            teamSize:
                data.teamSize ?? 1,
            membersNeeded:
                data.membersNeeded ?? 0,
            techStack:
                data.techStack,
        },
    });

    await publishEvent(
        ROUTING_KEY.PROJECTS_KEY,
        {
            projectId: project.id,
            userId: project.userId,
        }
    );


    return project;
};