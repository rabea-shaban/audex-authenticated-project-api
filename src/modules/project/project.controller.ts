import { Request, Response, NextFunction } from "express";
import Project from "./project.model";

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;

    let projects;

    if (user.role === "ADMIN") {
      projects = await Project.find();
    } else {
      projects = await Project.find({
        owner: user.userId,
      });
    }

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};
