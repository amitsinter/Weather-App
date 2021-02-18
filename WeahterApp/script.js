let weather = {
    apiKey: "eb5ccc29a7ac38edd175c59a195a085d",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
         return response.json();
       //  this.displayWeather(data);
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data)
     {
      const  name  = data.name;
      const  icon = data.weather[0].icon; // const {icon,description}=data.weather[0] --> equals --> find the right data in the array by the name
      const description  = data.weather[0].description;
      const temp = data.main.temp;
      const humidity  = data.main.humidity;
      const  speed  = data.wind.speed;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Denver");