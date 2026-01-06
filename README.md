# music-quiz

A React/Next app for playing Spotify music quiz. Great for use with friends at a party.

**Warning:** Unfortunately, Spotify does not allow the creation of Spotify games via
their [Developer policy](https://developer.spotify.com/policy/). Thus, we cannot provide public access to the music-quiz
instance running on quiz.konga.dev (you will receive an error on login)

If you want to use this app anyway, you can register your own Spotify application and use the provided Docker image to
host music-quiz yourself.

## Getting Started

This project is not publicly accessible and must be self-hosted. To run it, you will need a Spotify Developer
application.

1. **Create a Spotify Application**
    * Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and log in.
    * Click on **"Create an app"**.
    * Enter a name and description, then click **"Create"**.
    * Click **"Edit Settings"** and add `http://localhost:3000/api/callback` as a Redirect URI.
    * Note down your **Client ID** and **Client Secret**.

2. **Set Up Your Environment**
    * Clone the repository: `git clone https://github.com/leikonga/music-quiz.git`
    * Navigate into the project directory: `cd music-quiz`
    * Create a local environment file by copying the example: `cp .env.example .env`
    * Open the `.env` file and fill in the `CLIENT_ID` and `CLIENT_SECRET` you got from the Spotify dashboard.

3. **Install & Run**
    * Install dependencies using pnpm: `pnpm install`
    * Run the development server: `pnpm dev`
    * Open [http://localhost:3000](http://localhost:3000) in your browser.

If you plan on hosting the app on a website, make sure to also add `https://<your-domain>/api/callback` as a Redirect
URI.

## License

This project is licensed under the [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/).
