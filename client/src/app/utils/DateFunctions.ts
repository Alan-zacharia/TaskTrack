export function getDateFunction(date : string) {
    const today = new Date();
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    let displayDate = '';
    let color = '';

    if (normalizedDate.toDateString() === today.toDateString()) {
        displayDate = "Today";
        color = 'green'; 
    } else if (normalizedDate.toDateString() === new Date(today.setDate(today.getDate() + 1)).toDateString()) {
        displayDate = "Tomorrow";
        color = 'blue'; 
    } else if (normalizedDate.toDateString() === new Date(today.setDate(today.getDate() - 2)).toDateString()) {
        displayDate = "Yesterday";
        color = 'red'; 
    } else if (normalizedDate.toDateString() === new Date(today.setDate(today.getDate() + 2)).toDateString()) {
        displayDate = normalizedDate.toLocaleDateString(); 
        color = 'orange'; 
    } else {
        displayDate = normalizedDate.toLocaleDateString(); 
        color = 'gray'; 
    }

    return { displayDate, color };
}

export const getTodayDate = () => {
    let today = new Date();
    let day: string | number = today.getDate();
    let month: string | number = today.getMonth() + 1;
    let year: string | number = today.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return `${year}-${month}-${day}`;
  };
  