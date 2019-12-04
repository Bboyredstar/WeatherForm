const keyID = "2a1ad423e9fad1a3ceda81fda56b1366";
const mesureCelsius = "metric"
const cityName = "Rostov-on-Don"
var mainForm = new Vue({
    el: "#mainForm",
    data: {
        desctiption: " ",
        mainTemp: " ",
        minTemp: " ",
        maxTemp: " ",
        pressure: " ",
        windSpeed: " ",
        currentDay: " ",
        iconTop: " ",

    },
    methods: {
        getWeather: function () {

            fetch("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + ",RU&appid=" + keyID + "&units=" + mesureCelsius + "&lang=ru&cnt=1")
                .then(response => response.json())
                .then(data => this.getElements(data))
                .catch(response => console.log("Error"));
        },
        getElements: function (data) {
            this.minTemp = data.list[0].temp.min.toFixed(1) + " °C"
            this.maxTemp = data.list[0].temp.max.toFixed(1) + " °C"
            this.pressure = data.list[0].pressure + ' мм рт. ст.'
            this.windSpeed = data.list[0].speed.toFixed(1) + ' м./с.'
            this.mainTemp = ((data.list[0].temp.day + data.list[0].temp.morn + data.list[0].temp.eve) / 3).toFixed(1) + " °C"
            this.iconTop = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png"
            this.description = data.list[0].weather[0].description
            this.currentDay = new Date().getDate()
        },
    },

    beforeMount() {
        this.getWeather();

    }
})
