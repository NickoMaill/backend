const axios = require('axios')


function getCountries() {

	axios.get("http://localhost:8000/countries/all").then((res) => {
		countriesName = res.data.map((country) => {
			return country.name.common;
		});
        // console.log(res)
		console.log(countriesName.join(" - "));
	});
}

getCountries();