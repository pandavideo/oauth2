const axios = require("axios");
const querystring = require("querystring");

// you can get these informations (client_id, client_secret, redirect_uri) in https://dashboard.pandavideo.com.br/#/settings/integrations
const client_id = "";
const client_secret = "";
const code = ""; // this you'll find in the step-1.html archive.
const redirect_uri = "";

// if (true) it will test api key
const make_test = true;

const oauth2 = async () => {
  try {
    const query = querystring.stringify({
      grant_type: "authorization_code",
      code,
      client_id,
      client_secret,
      redirect_uri,
    });

    const tokens = await axios.post(
      `https://auth.pandavideo.com.br/oauth2/token`,
      query,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    // you gonna use this refresh token if the token expires, use it to get a new token
    const refresh_token = tokens.data.refresh_token; // (DO NOT SHARE IT)

    // this token you gonna use in (Panda) apis
    const token = tokens.data.access_token;

    console.log("tokens", tokens.data);

    if (make_test) {
      // it will return 3 videos of your account
      const videos = await axios.get(
        `https://api-v2.pandavideo.com/videos/all?all_status=1&limit=3`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      console.log("Your account videos", videos.data.videos);
    }
  } catch (error) {
    console.log("ERROR", error.data);
  }
};

oauth2();
