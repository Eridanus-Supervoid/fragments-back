const router = require('express').Router();
import { config } from "../config/config";
import * as request from "request";
import * as fs from "fs";

function textToSpeech(text: string) {
    const requestOptions: request.CoreOptions = {
        headers: {
            "Ocp-Apim-Subscription-Key": process.env.AZ,
        }
    };
    request.post(
        `${config.speech.bingSpeech.authEndPoint}/issueToken`,
        requestOptions,
        (err, response, body) => {
            const accessToken = response.body;
            const payLoad = `
            <speak version="1.0" xml:lang="es-MX">
            <voice xml:lang="es-MX" xml:gender="Female" name="es-MX-DaliaNeural">
            ${text}
            </voice>
            </speak>
            `;
            const requestOptions: request.CoreOptions = {
                headers: {
                    "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
                    "Content-Type": "application/ssml+xml",
                    "Host": "southcentralus.tts.speech.microsoft.com",
                    "Content-Length": payLoad.length,
                    "Authorization": "Bearer " + accessToken,
                    "User-Agent": "NodeJS"
                },
                body: payLoad
            };

            request.post(
                config.speech.bingSpeech.synthesizeUrl,
                requestOptions
            ).pipe(fs.createWriteStream(__dirname + "/output.mp3"));
        }
    )
}

router.post("/speech/textToSpeech", async(req, res) => {
    textToSpeech("Esta es la prueba definitiva.")
})

module.exports = router