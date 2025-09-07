// Service to manage doctor profile data including selected insurances
export interface DoctorProfile {
  id: string;
  name: string;
  selectedInsurances: string[];
  experience: string;
  education: string;
  languages: string[];
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
        languages: ["English", "Spanish"]
      },
      {
        id: "2", 
        name: "Dr. Nicholas Tello",
        selectedInsurances: ["Blue Cross Blue Shield", "Humana", "UnitedHealth"],
        experience: "8+ years",
        education: "MD, MDS",
        languages: ["English", "French"]
      },
      {
        id: "3",
        name: "Dr. Harold Bryant", 
        selectedInsurances: ["Cigna", "Kaiser Permanente", "AARP"],
        experience: "12+ years",
        education: "MD, PhD",
        languages: ["English", "German"]
      },
      {
        id: "4",
        name: "Dr. Sandra Jones",
        selectedInsurances: ["Humana", "Medicare", "Medicaid"],
        experience: "15+ years", 
        education: "MD, Cardiology",
        languages: ["English", "Portuguese"]
      },
      {
        id: "5",
        name: "Dr. Charles Scott",
        selectedInsurances: ["UnitedHealth", "Tricare", "VA Health Care"],
        experience: "6+ years",
        education: "MD, Neurology",
        languages: ["English", "Italian"]
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
}

export default DoctorProfileService;
