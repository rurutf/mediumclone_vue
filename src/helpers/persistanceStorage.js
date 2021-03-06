// Помощник wrapper для работы с объектами или массивами в localStorage (setItem и getItem работают только со строками)
export const getItem = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        console.log('Error getting data from localStorage', e);
        return null;
    }
};

export const setItem = (key, data) => {
    //принимает 2 параметра - key - куда мы записываем, data - что мы записываем
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.log('Error saving data in localStorage', e);
    }
};
