import { Pet, Prisma, UserRole } from "@prisma/client";
import prisma from "../../shared/prisma";
import { paginationHelper } from "../../helper/paginationHelper";
import { petSearchAbleFields } from "./pet.constant";
import { IPaginationOptions } from "../../interface/iPaginationOptions";
import { IUploadFile } from "../../interface/file";
import { FileUploadHelper } from "../../helper/fileUploadHelper";

const createAPet = async (req: Record<string, any>): Promise<Pet> => {
  const file = req.file as IUploadFile;

  if (file) {
    const uploadPet = await FileUploadHelper.uploadToCloudinary(file);
    req.body.image = uploadPet?.secure_url;
  }
  const result = await prisma.pet.create({
    data: req.body,
  });
  return result;
};

const getFilteredPet = async (params: any, options: IPaginationOptions) => {
  if (params?.age) {
    params.age = Number(params.age);
  }
  // console.log(params);
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.PetWhereInput[] = [];
  andCondions.push({
    isDeleted: false,
  });

  if (params.searchTerm) {
    andCondions.push({
      OR: petSearchAbleFields.map((field) => ({
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

  const whereConditons: Prisma.PetWhereInput = { AND: andCondions };

  const result = await prisma.pet.findMany({
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
  });

  const total = await prisma.pet.count({
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

const getAPet = async (petId: string) => {
  const result = await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
      isDeleted: false,
    },
  });

  return result;
};

const updateAPet = async (petId: string, data: Partial<Pet>): Promise<Pet> => {
  await prisma.pet.findFirstOrThrow({
    where: {
      id: petId,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id: petId,
    },
    data,
  });

  return result;
};

const deleteAPet = async (petId: string): Promise<Pet> => {
  await prisma.pet.findFirstOrThrow({
    where: {
      id: petId,
      isDeleted: false,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id: petId,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

const analytics = async () => {
  // Total pet count
  const allPets = await prisma.pet.count({});

  // Count by species
  const dogs = await prisma.pet.count({ where: { species: "Dog" } });
  const cats = await prisma.pet.count({ where: { species: "Cat" } });
  const rabbits = await prisma.pet.count({ where: { species: "Rabbit" } }); // Ensure spelling matches data
  const birds = await prisma.pet.count({ where: { species: "Bird" } });
  const fishes = await prisma.pet.count({ where: { species: "Fish" } });

  // Count by gender
  const totalMale = await prisma.pet.count({ where: { gender: "MALE" } });
  const totalFemale = await prisma.pet.count({ where: { gender: "FEMALE" } });

  // Count by size
  // const totalSmall = await prisma.pet.count({ where: { size: "Small" } });
  // const totalMedium = await prisma.pet.count({ where: { size: "Medium" } });
  // const totalLarge = await prisma.pet.count({ where: { size: "Large" } });
  // const totalExtraLarge = await prisma.pet.count({
  //   where: { size: "Extra Large" },
  // });

  return {
    allPets,
    dogs,
    cats,
    rabbits,
    birds,
    fishes,
    totalMale,
    totalFemale,
    // totalSmall,
    // totalMedium,
    // totalLarge,
    // totalExtraLarge,
  };
};

export const PetServices = {
  createAPet,
  getFilteredPet,
  getAPet,
  updateAPet,
  deleteAPet,
  analytics,
};
