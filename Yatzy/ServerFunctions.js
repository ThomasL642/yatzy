const BASE_URL = 'http://localhost:3000/data';



async function fetchAllData() {
    try {
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();
        console.log('All data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching all data:', error);
    }
}

async function fetchValue(name) {
    try {
        const response = await fetch(`http://localhost:3000/data/${name}`);
        if (!response.ok) {
            throw new Error('Data not found');
        }
        const data = await response.json();
        console.log(`${name}:`, data.value);
        return data.value;
    } catch (error) {
        console.error(`Error fetching value for ${name}:`, error);
    }
}

async function updateValue(name, newValue) {
    try {
        const response = await fetch(`http://localhost:3000/data/${name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: newValue }),
        });

        const data = await response.json();
        console.log(`Updated ${name}:`, data);
        return data;
    } catch (error) {
        console.error(`Error updating value for ${name}:`, error);
    }
}

async function addData(name, value) {
    try {
        const response = await fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, value }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Data added:', result);
        return result;
    } catch (error) {
        console.error('Error adding data:', error);
    }
}

async function deleteData(name) {
    try {
        const response = await fetch(`http://localhost:3000/data/${name}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Data deleted:', result);
        return result;
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}



window.fetchAllData = fetchAllData;
window.fetchValue = fetchValue;
window.updateValue = updateValue;
window.addData = addData;
window.deleteData = deleteData;

