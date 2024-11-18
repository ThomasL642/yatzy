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

async function compareValues(name1, name2) {
    try {
        const value1 = await fetchValue(name1);
        const value2 = await fetchValue(name2);

        if (value1 > value2) {
            console.log(`${name1} (${value1}) is greater than ${name2} (${value2})`);
        } else if (value1 < value2) {
            console.log(`${name1} (${value1}) is less than ${name2} (${value2})`);
        } else {
            console.log(`${name1} (${value1}) is equal to ${name2} (${value2})`);
        }
    } catch (error) {
        console.error('Error comparing values:', error);
    }
}

window.fetchAllData = fetchAllData;
window.fetchValue = fetchValue;
window.updateValue = updateValue;
window.compareValues = compareValues;

