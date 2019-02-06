//
// JavaScript for RAINPLAY
//
$(document).ready(function() {
    console.log("RAINPLAY started...");

    // Weather API key
    var weatherApiKey = "5d1cc1876b69aaa35b49428d6c8f441b";

    // Spotify API key
    var spotifyApiKey = "BQBB55vzktO4FF6kGNa5hj-rZ7QWbJfLZLJQUL3B8XPBehPstidAZ3ZsbAlI0NTPvMqHjvCe_2bqoi1dQPVk2gJ6Jqq8mwLk52GRnJLbC4hEiohQdnO_BgYVR1g7sBfrLpqS9uJHnZqASe51TPHm7gYSREMhbPj42yNxZOtd_8uPlffkSn2oc14mQ4o1-6yifxrXM6_XvSiEoL-QSw";  
    
    // Default play list
    var defaultPlayList = "0e8nNKeq46thd42Z2HrXQc";

    // Call back function for the submit button
    $("#submit").click(function(event) {

        // Don't refresh the page
        event.preventDefault();
    
        // Clear the message area      
        $("#userMsg").text("");
    
        // Get the zipcode
        var zipCode = $("#inputZipCode").val().trim();
    
        // Ensure we have a zip code
        if (zipCode.length > 0) {
            getWeather(zipCode);
        } else
            $("#userMsg").text("Please enter a zip code");
    });
    
    // Function to create the weather query
    function createWeatherQuery(zipCode) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=" + weatherApiKey;
        return queryURL;
    }
    
    // AJAX function to get the weather based on the zip code
    function getWeather(zipCode) {
        $.ajax({
            url: createWeatherQuery(zipCode),
            method: "GET",
            success: function(response) {
                console.log(response);
                var currentWeather = response.weather[0].main;
                var city = response.name;
                $("#userMsg").text(city + " : " + currentWeather);
                getPlaylistByWeather(city, currentWeather);
            },
            error: function(data){          
                $("#userMsg").text("No weather results for zipcode " + $("#inputZipCode").val().trim());    
            }  
        });
    };

    function getPlaylistByWeather(city, weatherDescription) {
        $.ajax({ 
            url: "https://api.spotify.com/v1/users/alexcurington/playlists",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + spotifyApiKey
            },
            success: function(response) {
                console.log(response);
                console.log(weatherDescription);
                var playListId = null;
                for (var i = 0; i < response.items.length; i++) {
                    var playListName = response.items[i].name;
                    if (weatherDescription.toLowerCase() === playListName.toLowerCase()) {
                        playListId = response.items[i].id; 
                        console.log("playlist name=" + playListName + " playListId=" + playListId);
                        break;
                    }
                }
                $("#playlist").empty();
                if (playListId == null) {                    
                    $("#userMsg").text("No playlist defined for the current weather in " + city);
                    playListId = defaultPlayList;
                }
                $("#playlist").append("<iframe src=\"https://open.spotify.com/embed/user/alexcurington/playlist/" + playListId + "\" width=\"450\" height=\"550\" frameborder=\"0\" allowtransparency=\"true\" allow=\"encrypted-media\"></iframe>");
            },
            error: function(data){
                $("#playlist").empty();             
                $("#userMsg").text("Spotify Error: Unable to retrieve playlists at this time.");
                $("#playlist").append("<iframe src=\"https://open.spotify.com/embed/user/alexcurington/playlist/" + defaultPlayList + "\" width=\"450\" height=\"550\" frameborder=\"0\" allowtransparency=\"true\" allow=\"encrypted-media\"></iframe>");
            }
        });
    }
    $("#inputZipCode").val("75211");
    getWeather("75211");
});
