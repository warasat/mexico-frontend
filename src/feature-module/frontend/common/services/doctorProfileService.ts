// Service to manage doctor profile data including selected insurances
export interface DoctorProfile {
  id: string;
  name: string;
  selectedInsurances: string[];
  experience: string;
  education: string;
  languages: string[];
  specialtyRank?: number;
}

class DoctorProfileService {
  private static instance: DoctorProfileService;
  private profiles: Map<string, DoctorProfile> = new Map();

  private constructor() {
    // Initialize with some default data
    this.initializeDefaultProfiles();
  }

  public static getInstance(): DoctorProfileService {
    if (!DoctorProfileService.instance) {
      DoctorProfileService.instance = new DoctorProfileService();
    }
    return DoctorProfileService.instance;
  }

  private initializeDefaultProfiles() {
    // Initialize with default doctor profiles
    const defaultProfiles: DoctorProfile[] = [
      {
        id: "1",
        name: "Dr. Michael Brown",
        selectedInsurances: ["Aetna", "Blue Cross Blue Shield", "Cigna"],
        experience: "10+ years",
        education: "MD, PhD",
        languages: ["English", "Spanish"],
        specialtyRank: 3
      },
      {
        id: "2", 
        name: "Dr. Nicholas Tello",
        selectedInsurances: ["Blue Cross Blue Shield", "Humana", "UnitedHealth"],
        experience: "8+ years",
        education: "MD, MDS",
        languages: ["English", "French"],
        specialtyRank: 2
      },
      {
        id: "3",
        name: "Dr. Harold Bryant", 
        selectedInsurances: ["Cigna", "Kaiser Permanente", "AARP"],
        experience: "12+ years",
        education: "MD, PhD",
        languages: ["English", "German"],
        specialtyRank: 4
      },
      {
        id: "4",
        name: "Dr. Sandra Jones",
        selectedInsurances: ["Humana", "Medicare", "Medicaid"],
        experience: "15+ years", 
        education: "MD, Cardiology",
        languages: ["English", "Portuguese"],
        specialtyRank: 5
      },
      {
        id: "5",
        name: "Dr. Charles Scott",
        selectedInsurances: ["UnitedHealth", "Tricare", "VA Health Care"],
        experience: "6+ years",
        education: "MD, Neurology",
        languages: ["English", "Italian"],
        specialtyRank: 1
      },
      {
        id: "6",
        name: "Dr. Maria Rodriguez",
        selectedInsurances: ["Aetna", "Anthem Blue Cross Blue Shield", "Cigna", "Humana"],
        experience: "9+ years",
        education: "DDS, MS",
        languages: ["English", "Spanish"],
        specialtyRank: 2
      },
      {
        id: "7",
        name: "Dr. Ana Martinez",
        selectedInsurances: ["Blue Cross Blue Shield", "Kaiser Permanente", "Medicare", "Medicaid"],
        experience: "11+ years",
        education: "MD, OB-GYN",
        languages: ["English", "Spanish"],
        specialtyRank: 4
      },
      {
        id: "8",
        name: "Dr. Carlos Lopez",
        selectedInsurances: ["Aetna", "UnitedHealth", "Cigna", "AARP"],
        experience: "13+ years",
        education: "MD, Psychiatry",
        languages: ["English", "Spanish"],
        specialtyRank: 3
      },
      {
        id: "9",
        name: "Dr. Elena Garcia",
        selectedInsurances: ["Blue Cross Blue Shield", "Humana", "Tricare"],
        experience: "7+ years",
        education: "PhD, Psychology",
        languages: ["English", "Spanish"],
        specialtyRank: 2
      },
      {
        id: "10",
        name: "Dr. Roberto Silva",
        selectedInsurances: ["Aetna", "Anthem Blue Cross Blue Shield", "UnitedHealth", "VA Health Care"],
        experience: "5+ years",
        education: "MD, Emergency Medicine",
        languages: ["English", "Spanish"],
        specialtyRank: 1
      },
      {
        id: "11",
        name: "Dr. Carmen Vega",
        selectedInsurances: ["Cigna", "Humana", "Kaiser Permanente", "Medicare"],
        experience: "8+ years",
        education: "DC, Chiropractic",
        languages: ["English", "Spanish"],
        specialtyRank: 2
      },
      {
        id: "12",
        name: "Dr. Fernando Ruiz",
        selectedInsurances: ["Blue Cross Blue Shield", "Aetna", "Medicaid", "Tricare"],
        experience: "6+ years",
        education: "OD, Optometry",
        languages: ["English", "Spanish"],
        specialtyRank: 1
      },
      {
        id: "13",
        name: "Dr. Patricia Morales",
        selectedInsurances: ["UnitedHealth", "Cigna", "AARP", "Medicare"],
        experience: "14+ years",
        education: "MD, Ophthalmology",
        languages: ["English", "Spanish"],
        specialtyRank: 4
      },
      {
        id: "14",
        name: "Dr. Alejandro Torres",
        selectedInsurances: ["Humana", "Blue Cross Blue Shield", "Kaiser Permanente"],
        experience: "10+ years",
        education: "DPM, Podiatry",
        languages: ["English", "Spanish"],
        specialtyRank: 3
      },
      {
        id: "15",
        name: "Dr. Sofia Herrera",
        selectedInsurances: ["Aetna", "Anthem Blue Cross Blue Shield", "Cigna", "Medicaid"],
        experience: "12+ years",
        education: "MD, Dermatology",
        languages: ["English", "Spanish"],
        specialtyRank: 4
      },
      {
        id: "16",
        name: "Dr. Miguel Castro",
        selectedInsurances: ["UnitedHealth", "Tricare", "VA Health Care", "AARP"],
        experience: "16+ years",
        education: "MD, Orthopedic Surgery",
        languages: ["English", "Spanish"],
        specialtyRank: 5
      },
      {
        id: "17",
        name: "Dr. Laura Jimenez",
        selectedInsurances: ["Blue Cross Blue Shield", "Humana", "Medicare", "Medicaid"],
        experience: "9+ years",
        education: "MD, Family Medicine",
        languages: ["English", "Spanish"],
        specialtyRank: 3
      }
    ];

    defaultProfiles.forEach(profile => {
      this.profiles.set(profile.id, profile);
    });
  }

  public getDoctorProfile(doctorId: string): DoctorProfile | undefined {
    return this.profiles.get(doctorId);
  }

  public updateDoctorProfile(doctorId: string, profile: Partial<DoctorProfile>): void {
    const existingProfile = this.profiles.get(doctorId);
    if (existingProfile) {
      this.profiles.set(doctorId, { ...existingProfile, ...profile });
    } else {
      this.profiles.set(doctorId, profile as DoctorProfile);
    }
  }

  public getAllProfiles(): DoctorProfile[] {
    return Array.from(this.profiles.values());
  }

  public getDoctorInsurances(doctorId: string): string[] {
    const profile = this.profiles.get(doctorId);
    return profile?.selectedInsurances || [];
  }

  public updateDoctorInsurances(doctorId: string, insurances: string[]): void {
    const profile = this.profiles.get(doctorId);
    if (profile) {
      profile.selectedInsurances = insurances;
      this.profiles.set(doctorId, profile);
    }
  }

  public getDoctorSpecialtyRank(doctorId: string): number {
    const profile = this.profiles.get(doctorId);
    return profile?.specialtyRank ?? 0;
  }

  public updateDoctorSpecialtyRank(doctorId: string, specialtyRank: number): void {
    const profile = this.profiles.get(doctorId);
    if (profile) {
      profile.specialtyRank = specialtyRank;
      this.profiles.set(doctorId, profile);
    } else {
      this.profiles.set(doctorId, {
        id: doctorId,
        name: "",
        selectedInsurances: [],
        experience: "",
        education: "",
        languages: [],
        specialtyRank
      });
    }
  }
}

export default DoctorProfileService;
