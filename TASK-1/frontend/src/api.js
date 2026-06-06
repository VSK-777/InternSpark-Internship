const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_URL = `${API_BASE_URL}/api/employees`;

export const getEmployees = async () => {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch employees');
        return await res.json();
    } catch (error) {
        throw new Error('Network error or server is down.');
    }
};

export const createEmployee = async (employee) => {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        });
        if (!res.ok) {
            const errorMsg = await res.text();
            throw new Error(errorMsg || 'Failed to create employee');
        }
        return await res.json();
    } catch (error) {
        throw new Error(error.message || 'Network error.');
    }
};

export const updateEmployee = async (id, employee) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        });
        if (!res.ok) {
            const errorMsg = await res.text();
            throw new Error(errorMsg || 'Failed to update employee');
        }
        return await res.json();
    } catch (error) {
        throw new Error(error.message || 'Network error.');
    }
};

export const deleteEmployee = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete employee');
        return true;
    } catch (error) {
        throw new Error('Network error.');
    }
};
