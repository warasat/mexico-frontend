const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface DoctorProfilePayload {
	firstName?: string;
	lastName?: string;
	displayName?: string;
	designation?: string;
	phones?: string[];
	email?: string;
	address?: {
		address?: string;
		city?: string;
		state?: string;
		country?: string;
		pincode?: string;
	};
	experience?: string;
	insurances?: string[];
	servicesOffered?: string[];
	aboutMe?: string;
	knownLanguages?: string[];
	specialtyRank?: number;
}

function getAuthHeaders(includeJsonContentType = true) {
	const token = localStorage.getItem('token');
	const headers: Record<string, string> = {};
	if (includeJsonContentType) headers['Content-Type'] = 'application/json';
	if (token) headers['Authorization'] = `Bearer ${token}`;
	return headers;
}

class DoctorProfileApi {
	async getMe() {
		const res = await fetch(`${API_BASE_URL}/doctors/me`, {
			method: 'GET',
			headers: getAuthHeaders(false),
		});
		if (!res.ok) throw new Error('Failed to fetch profile');
		return res.json();
	}

	async updateMe(payload: DoctorProfilePayload) {
		const res = await fetch(`${API_BASE_URL}/doctors/me`, {
			method: 'PUT',
			headers: getAuthHeaders(),
			body: JSON.stringify(payload),
		});
		if (!res.ok) throw new Error('Failed to save profile');
		return res.json();
	}

	async uploadImage(file: File) {
		const token = localStorage.getItem('token');
		const form = new FormData();
		form.append('image', file);
		const res = await fetch(`${API_BASE_URL}/doctors/me/upload-image`, {
			method: 'POST',
			headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			body: form,
		});
		if (!res.ok) throw new Error('Failed to upload image');
		return res.json();
	}
}

export default new DoctorProfileApi();


