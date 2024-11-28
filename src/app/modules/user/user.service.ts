import { Prisma, User, UserRole, UserStatus } from "@prisma/client";
import prisma from "../../shared/prisma";
import { IPaginationOptions } from "../../interface/iPaginationOptions";
import { paginationHelper } from "../../helper/paginationHelper";
import { userSearchAbleFields } from "./user.constant";

const getUserInfo = async (userId: string): Promise<Partial<User>> => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserInfo = async (
  userId: string,
  data: Partial<User>
): Promise<Partial<User>> => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: userId,
      role: user.role,
    },
    data: {
      name: data.name,
      email: data.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const getAllUsers = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.UserWhereInput = { AND: andCondions };

  const result = await prisma.user.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const changeStatus = async (userId: string, data: Partial<User>) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const updatedStatus = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: data.role,
      status: data.status,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedStatus;
};
const deleteUser = async (userId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const deleteUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: UserStatus.DELETED,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return deleteUser;
};

const analytics = async () => {
  const allUsers = await prisma.user.count({});
  const totalAdmins = await prisma.user.count({
    where: {
      role: "ADMIN",
    },
  });

  const totalUsers = await prisma.user.count({
    where: {
      role: "USER",
    },
  });

  // Count users by statuses
  const totalActiveUsers = await prisma.user.count({
    where: {
      status: "ACTIVE",
    },
  });

  const totalDeletedUsers = await prisma.user.count({
    where: {
      status: "DELETED",
    },
  });

  const totalDeactiveUsers = await prisma.user.count({
    where: {
      status: "DEACTIVE",
    },
  });

  return {
    allUsers,
    totalAdmins,
    totalUsers,
    totalActiveUsers,
    totalDeletedUsers,
    totalDeactiveUsers,
  };
};

export const UserServices = {
  getUserInfo,
  updateUserInfo,
  getAllUsers,
  changeStatus,
  deleteUser,
  analytics,
};
