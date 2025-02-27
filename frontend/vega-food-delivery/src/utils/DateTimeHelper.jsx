//converter for epoch to date time
export const EpochToDateTime = (epochDate) => {
    // Convert epoch timestamp to milliseconds
    const unixMilliSeconds = Number(epochDate) / 1000;

    // Create a new Date object
    const date = new Date(unixMilliSeconds);

    // Get month name abbreviation
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthAbbr = monthNames[date.getMonth()];

    // Extract the date and time components
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Construct the date and time string
    const dateTimeString = `${monthAbbr} ${day}, ${year}, ${hours}:${minutes}:${seconds}`;

    return dateTimeString;
}

//converter for date time to epoch
export const DateTimeToEpoch = (dateTimeString) => {
    const epoch = Math.floor(new Date(dateTimeString).getTime()).toString(); // Convert milliseconds to seconds
    return epoch;
}

export const convertDateToEpochForInput = (value) => {
    if (value != '' && value != null) {
        if (value.includes('-')) {
            const epoch = Math.floor(new Date(value).getTime() / 1000.0);
            const epochString = epoch.toString();
            return epochString;
        } else {
            return value;
        }
    }
    return '';
}
