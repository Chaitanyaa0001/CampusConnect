import { prisma } from "../utils/prisma";

export const getProjectByIdService = async (projectId: string) => {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    return project;
};