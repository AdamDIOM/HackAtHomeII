async function GetVirusStats(){
    countryName = document.getElementById("country").value
    const response1 = await fetch("https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true")
    .then(response1 => response1.json());
    json1 = response1
    console.log(json1)

    found = false;
    for(country in json1){
        if (json1[country].country == countryName) {
            output = json1[country].infected - TryParseInt(json1[country].deceased, 0) - TryParseInt(json1[country].recovered, 0)
            console.log(output)
            document.getElementById("out").innerHTML = `Max cases = ${output}.
            `;
            if(output > 100) document.getElementById("out").innerHTML += "Hacking at home is recommended.";
            
            found = true;
        }
    }
    if(!found) document.getElementById("out").innerHTML = "Country not found";
    const response2 = await fetch("https://www.worldpop.org/rest/data/pop/wpgp")
    .then(response2 => response2.json());
    json2 = response2
    console.log(json2)
}


function TryParseInt(str,defaultValue) {
    var retValue = defaultValue;
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}