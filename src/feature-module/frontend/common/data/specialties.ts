export const specialtiesData = [
  { specialty: "Primary Care Physician (PCP)", diseases: ["Annual Physical","Diabetes Management","Hypertension","Cholesterol Check","Cold/Flu Symptoms"] },
  { specialty: "OB-GYN (Obstetrician-Gynecologist)", diseases: ["Annual Pap Smear","Birth Control","Prenatal Care","Pregnancy Problem","Vaginal Discharge","UTI"] },
  { specialty: "Dermatologist", diseases: ["Acne","Skin Rash","Mole Check","Eczema","Psoriasis","Hair Loss"] },
  { specialty: "Dentist", diseases: ["Dental Cleaning","Tooth Pain","Cavity Filling","Root Canal","Wisdom Tooth Extraction"] },
  { specialty: "Ear, Nose & Throat Doctor (ENT / Otolaryngologist)", diseases: ["Sinus Infection","Hearing Loss","Tonsillitis","Allergies","Sleep Apnea"] },
  { specialty: "Eye Doctor", diseases: ["Vision Exam","Glasses/Contacts Prescription","Cataract","Glaucoma","Eye Infection"] },
  { specialty: "Psychiatrist", diseases: ["Depression","Anxiety","ADHD","Bipolar Disorder","Medication Refill"] },
  { specialty: "Orthopedic Surgeon (Orthopedist)", diseases: ["Back Pain","Knee Pain","Shoulder Injury","Arthritis","Fracture Follow-Up"] },
  { specialty: "Chiropractor", diseases: ["Back Pain","Neck Pain","Sciatica","Spinal Adjustment","Joint Pain"] },
  { specialty: "Cardiologist", diseases: ["Chest Pain","Hypertension","Arrhythmia","High Cholesterol","Heart Disease Follow-Up"] },
  { specialty: "Gastroenterologist", diseases: ["Acid Reflux (GERD)","IBS","Colonoscopy","Abdominal Pain","Liver Disease"] },
  { specialty: "Neurologist", diseases: ["Migraine","Seizures","Multiple Sclerosis","Stroke Follow-Up","Neuropathy"] },
  { specialty: "Pediatrician", diseases: ["Well-Child Visit","Immunizations","Cold/Flu","Asthma","Allergies"] },
  { specialty: "Psychologist", diseases: ["Counseling","Anxiety","Depression","Trauma Therapy","Behavioral Therapy"] },
  { specialty: "Urologist", diseases: ["Kidney Stones","Prostate Exam","Urinary Tract Problems","Erectile Dysfunction","Incontinence"] },
  { specialty: "Pulmonologist", diseases: ["Asthma","COPD","Chronic Cough","Sleep Apnea","Lung Infection"] },
  { specialty: "Endocrinologist", diseases: ["Diabetes","Thyroid Disorder","Hormone Imbalance","Osteoporosis"] },
  { specialty: "Oncologist", diseases: ["Cancer Screening","Chemotherapy Follow-Up","Tumor Consultation"] },
  { specialty: "Rheumatologist", diseases: ["Rheumatoid Arthritis","Lupus","Joint Pain","Gout"] },
  { specialty: "Surgeon", diseases: ["Hernia","Gallstones","Appendicitis","Post-Op Follow-Up"] },
  { specialty: "Sports Medicine Specialist", diseases: ["Sports Injury","Knee Pain","Muscle Strain","Concussion"] },
  { specialty: "Urgent Care Specialist", diseases: ["Cold/Flu","Minor Injuries","Infections","Vaccinations"] },
  { specialty: "Podiatrist", diseases: ["Foot Pain","Plantar Fasciitis","Bunions","Ingrown Toenail"] },
  { specialty: "Plastic Surgeon", diseases: ["Cosmetic Consultation","Breast Surgery","Rhinoplasty","Reconstructive Surgery"] },
  { specialty: "Sleep Medicine Specialist", diseases: ["Insomnia","Sleep Apnea","Snoring","Restless Leg Syndrome"] },
  { specialty: "Allergist (Immunologist)", diseases: ["Seasonal Allergies","Asthma","Food Allergies","Immunotherapy"] },
  { specialty: "Hematologist", diseases: ["Anemia","Blood Clotting Disorder","Leukemia Follow-Up"] },
  { specialty: "Nephrologist", diseases: ["Kidney Disease","Dialysis Management","Hypertension"] },
  { specialty: "Infectious Disease Specialist", diseases: ["HIV/AIDS","Tuberculosis","COVID-19","Travel Medicine"] },
  { specialty: "Vascular Surgeon", diseases: ["Varicose Veins","Peripheral Artery Disease","Aneurysm"] },
  { specialty: "Colorectal Surgeon", diseases: ["Hemorrhoids","Colon Cancer","Anal Fissure"] },
  { specialty: "Audiologist", diseases: ["Hearing Test","Hearing Aids","Tinnitus"] },
  { specialty: "Dietitian / Nutritionist", diseases: ["Weight Management","Diabetes Nutrition","Meal Planning"] },
  { specialty: "Pain Management Specialist", diseases: ["Chronic Pain","Back Pain","Fibromyalgia"] },
  { specialty: "Orthodontist", diseases: ["Braces Consultation","Invisalign","Bite Issues"] },
  { specialty: "Oral Surgeon", diseases: ["Wisdom Teeth","Jaw Surgery","Dental Implants"] },
  { specialty: "Prosthodontist", diseases: ["Dental Crowns","Bridges","Dentures"] },
  { specialty: "Periodontist", diseases: ["Gum Disease","Dental Implants","Bone Grafting"] },
  { specialty: "Endodontist", diseases: ["Root Canal","Tooth Infection"] },
  { specialty: "Radiologist", diseases: ["Imaging Follow-Up","Mammogram","MRI/CT Scan Review"] },
  { specialty: "Midwife", diseases: ["Pregnancy Check-Up","Prenatal Care","Childbirth"] },
  { specialty: "Naturopathic Doctor", diseases: ["Holistic Health","Supplements","Alternative Medicine"] },
  { specialty: "Physiatrist (Physical Medicine)", diseases: ["Rehabilitation","Back Pain","Sports Injuries"] },
  { specialty: "Physical Therapist", diseases: ["Post-Surgery Rehab","Mobility Therapy","Injury Recovery"] }
];

export const getDiseasesForSpecialty = (specialty: string): string[] => {
  if (!specialty) return [];
  const sLower = specialty.toLowerCase();
  const found = specialtiesData.find((s) => s.specialty.toLowerCase().includes(sLower) || sLower.includes(s.specialty.toLowerCase()));
  return found ? found.diseases : [];
};


