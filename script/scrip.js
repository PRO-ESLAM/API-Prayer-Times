import axios from "https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm";

let cityes = [
  { aribcName: "القاهره", isoName: "Al Qāhirah" },
  { aribcName: "الاسكندريه", isoName: "Al Iskandarīyah" },
  { aribcName: "اسوان", isoName: "Aswān" },
  { aribcName: "الاقصر", isoName: "Al Uqşur	" },
];

for (const city of cityes) {
  let content = `   <option> ${city.aribcName}   </option>
                    
                    `;
  document.getElementById("select-cityes").innerHTML += content;
}

document
  .getElementById("select-cityes")
  .addEventListener("change", function () {
    document.getElementById("city-now").innerHTML = this.value;
    let cityName = "";

    for (const city of cityes) {
      if (city.aribcName == this.value) {
        cityName = city.isoName;
      }
    }
    getTimingsOfCityes(cityName);
  });

function getTimingsOfCityes(cityName) {
  let mainParms = {
    country: "EG",
    city: cityName,
    date: "16/8/2023",
  };

  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: mainParms,
    })
    .then(function (response) {
      const timings = response.data.data.timings;
      document.getElementById("fahr-time").innerHTML =
        response.data.data.timings.Fajr;
      document.getElementById("sihr-time").innerHTML =
        response.data.data.timings.Dhuhr;
      document.getElementById("asr-time").innerHTML =
        response.data.data.timings.Asr;
      document.getElementById("makhreb-time").innerHTML =
        response.data.data.timings.Maghrib;
      document.getElementById("ashaa-time").innerHTML =
        response.data.data.timings.Isha;
      const readableData = response.data.data.date.readable;
      const weekDay = response.data.data.date.hijri.weekday.ar;
      document.getElementById("data-day").innerHTML =
        weekDay + " " + readableData;

      // console.log(response.data.data.date.hijri.weekday.ar);
      // console.log(readableData + " " +  weekDay);
    })
    .catch(function (error) {
      console.log(error);
    });
}
