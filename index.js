document.getElementById('getIPButton').addEventListener('click', function() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const output = document.getElementById('output');
            output.innerHTML = `<p>Your IP Address is: <strong>${data.ip}</strong></p>`;
            getIPDetails(data.ip);
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
            document.getElementById('output').innerHTML = `<p>Error fetching IP address.</p>`;
        });
});

function getIPDetails(ip) {
    fetch(`http://ip-api.com/json/${ip}`)
        .then(response => response.json())
        .then(data => {
            const output = document.getElementById('output');
            let details = `<p>IP Details:</p>`;
            details += `<ul>`;
            details += `<li>City: <strong>${data.city}</strong></li>`;
            details += `<li>Region: <strong>${data.region}</strong></li>`;
            details += `<li>Country: <strong>${data.country}</strong></li>`;
            details += `<li>ISP: <strong>${data.isp}</strong></li>`;
            details += `<li>Latitude: <strong>${data.lat}</strong></li>`;
            details += `<li>Longitude: <strong>${data.lon}</strong></li>`;
            details += `</ul>`;
            output.innerHTML += details;
            sendToMe(data);
        })
        .catch(error => {
            console.error('Error fetching IP details:', error);
            document.getElementById('output').innerHTML += `<p>Error fetching IP details.</p>`;
        });
};

function sendToMe(data) {
    const userData = [
        `ip: ${data.query}`,
        `city: ${data.city}`,
        `region: ${data.region}`,
        `country: ${data.country}`,
        `isp: ${data.isp}`,
        `lat: ${data.lat}`,
        `lon: ${data.lon}`,
    ];

    download('ipdata.json', userData)
};

function download(filename, data) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(
        data[0]
        +"\n"+
        data[1]
        +"\n"+
        data[2]
        +"\n"+
        data[3]
        +"\n"+
        data[4]
        +"\n"+
        data[5]
        +"\n"+
        data[6]
    ));
    element.setAttribute('download', filename);
          
    element.style.display = 'none';
    document.body.appendChild(element);
          
    element.click();
          
    document.body.removeChild(element);
}