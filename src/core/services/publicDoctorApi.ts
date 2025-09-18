const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://doctor-appointment-system-backend-rho.vercel.apppi';

export type PublicDoctor = {
	id: string;
	displayName: string;
	designation: string;
	image: string;
	location: string;
	experience: string;
	insurances: string[];
	specialtyRank: number;
	availability: 'available' | 'unavailable';
  languages?: string[];
  servicesOffered?: string[];
};

export type ListDoctorsResponse = {
	success: boolean;
	page: number;
	limit: number;
	total: number;
	results: PublicDoctor[];
};

class PublicDoctorApi {
	async list(params: {
		q?: string;
		city?: string;
		specialty?: string;
		page?: number;
		limit?: number;
		sort?: 'rank' | 'name';
	} = {}) {
		const usp = new URLSearchParams();
		Object.entries(params).forEach(([k, v]) => {
			if (v !== undefined && v !== null && v !== '') usp.set(k, String(v));
		});
		const res = await fetch(`${API_BASE_URL}/doctors?${usp.toString()}`);
		if (!res.ok) throw new Error('Failed to list doctors');
		return (await res.json()) as ListDoctorsResponse;
	}
}

export default new PublicDoctorApi();


