import { TAcademicDepertment } from "./academicDepertment.interface";
import { AcademicDepertment } from "./academicDepertment.model";

const createAcademicDepertmentIntoDB = async (payload: TAcademicDepertment) => {
  const result = await AcademicDepertment.create(payload);
  return result;
};

const getAllAcademicDepertmentFromDB = async () => {
  const result = await AcademicDepertment.find().populate("academicFaculty");
  return result;
};

const getSingleAcademicDepertmentIntoDB = async (id: string) => {
  const result = await AcademicDepertment.findById(id);
  return result;
};

const updateAcademicDepertmentIntoDB = async (
  id: string,
  paylod: Partial<TAcademicDepertment>
) => {
  const result = await AcademicDepertment.findByIdAndUpdate(
    { _id: id },
    paylod,
    {
      new: true,
    }
  );
  return result;
};

export const academicDepertmentSevice = {
  createAcademicDepertmentIntoDB,
  getAllAcademicDepertmentFromDB,
  getSingleAcademicDepertmentIntoDB,
  updateAcademicDepertmentIntoDB,
};
