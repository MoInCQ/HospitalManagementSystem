const rootUrl = "http://localhost:8080";

const createPrescriptionUrl = rootUrl + "/hims/prescription/submit";

const searchPrescriptionUrl = rootUrl + "/hims/prescription/search";

const searchClinicFormUrl = rootUrl + "/hims/clinic/clinic_form/search";

const queryClinicFormUrl = rootUrl + "/hims/clinic/clinic_form";

const retreatClinicFormsUrl = rootUrl + "/hims/clinic/retreats";

const retreatSingleClinicFormUrl = rootUrl + "/hims/clinic/retreat";

const registerClinicFormUrl = rootUrl + "/hims/clinic/clinic_register";

const queryDepartmentsUrl = rootUrl + "/hims/clinic/departments";

const queryDoctors = rootUrl + "/hims/clinic/doctors";

const loginUrl = rootUrl + "/hims/auth/login";

const registerUrl = rootUrl + "/hims/auth/register";

const removeMedicationUrl = rootUrl + "/hims/prescription/medication/remove";

const queryMedicationsUrl = rootUrl + "/hims/prescription/medications";

const fullRefundPrescriptionUrl = rootUrl + "/hims/prescription/refund";

export default {
  rootUrl,
  createPrescriptionUrl,
  searchPrescriptionUrl,
  searchClinicFormUrl,
  queryClinicFormUrl,
  retreatClinicFormsUrl,
  retreatSingleClinicFormUrl,
  registerClinicFormUrl,
  queryDepartmentsUrl,
  queryDoctors,
  loginUrl,
  registerUrl,
  removeMedicationUrl,
  queryMedicationsUrl,
  fullRefundPrescriptionUrl
};
