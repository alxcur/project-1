
    var access_token1 = "BQCCLGlxkxh5vKLmQqwZCvkbgB2-lGNaMqs44uJnUHzRsWm2m6obyMkke0lyS0d9B3Jnf0sMjMZkHlhSVk0r-Dw0OuyiTboP5R7ylyEfMNHfkKpVll3GgvNprWyRqtuFu2zm8rgJxLvulVW6bis-eOmgfOQqf-ZmHbXe1oBM69NTmBS94DFLvDwJf3R5BHKg2Jt8Y9MCXaX9kqsUsA";   
   
    // Call back function for the submit button
    $("#new-playlist-button").click(function(event) {

        // Clear the message area      
        $("#userMsg").text("");

        // Get the playlist
        var playListName = $("#new-playlist-name").val().trim();

        // Ensure we have a playlist name
        if (playListName.length > 0) {
            createPlayList(access_token1, playListName);
        } else
            $("#userMsg").text("Please enter a playlist to create");
    });

    // Call back function for the get playlist button
    $("#get-playlist-button").click(function(event) {

        // Clear the message area      
        $("#userMsg").text("");

       getPlaylists(access_token1);
        //getTopTracks(access_token1);
        //$("#spot").append("<iframe src=\"https://open.spotify.com/embed/user/alexcurington/playlist/46qnLPzQ5OgnfOI0B6ybZ2\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\" allow=\"encrypted-media\"></iframe>");
        
    });

    function createPlayList(access_token, playListName) {
        console.log(access_token)
        console.log("Getting the playlist");

        var playListData =  {
            "name": playListName,
            "description": "Clear Day Playlist",
            "public": true,
        };

        console.log(playListData);

        $.ajax({     
            //url: "https://api.spotify.com/v1/playlists/0e8nNKeq46thd42Z2HrXQc",    
            url: "https://api.spotify.com/v1/users/erp71cojkp993udl58hv1rpy4/playlists",
            method: "POST",
            data: JSON.stringify(playListData),
            headers: {
                "Authorization": "Bearer " + access_token
            },
            success: function(response) {
                $(".recommendations").show();
                console.log(response);
                //mapOverSongs(response.items);
            }
        });
    }

    function getPlaylists(access_token) {
        console.log(access_token)
        $.ajax({     
            //url: "https://api.spotify.com/v1/users/erp71cojkp993udl58hv1rpy4/playlists",    
            url: "https://api.spotify.com/v1/users/alexcurington/playlists",
            method: "GET",
            headers: {
            "Authorization": "Bearer " + access_token
            },
            success: function(response) {
            $(".recommendations").show();
            console.log(response);
            console.log("we are here!!!");
            var pl = response.items[0].id;
            //
            // loop thru the weather array an match the playlist name
            //
            $("#spot").append("<iframe src=\"https://open.spotify.com/embed/user/alexcurington/playlist/" + pl + " width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\" allow=\"encrypted-media\"></iframe>");
            }
        });
    }

    function getTopTracks(access_token) {
        console.log(access_token)
        $.ajax({     
            url: "https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF",
            headers: {
            "Authorization": "Bearer " + access_token
            },
            success: function(response) {
            $(".recommendations").show();
            console.log(response);
            //mapOverSongs(response.items);
            }
        });
    }
