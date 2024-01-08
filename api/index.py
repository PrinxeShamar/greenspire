from flask import Flask
from flask_cors import CORS
from moviepy.editor import *
from gtts import gTTS
import time
from supabase import create_client, Client

app = Flask(__name__)
CORS(app)

def get_tts_audio_clip(text, file_name):
    tts_clip = gTTS(text, slow=False)
    tts_clip.save(file_name)
    audio_clip = AudioFileClip(file_name)
    return audio_clip

@app.route("/api/problems/<id>")
def index(id):
    supabase: Client = create_client("https://hpvhyormhqzyycknztly.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhwdmh5b3JtaHF6eXlja256dGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNDU1Mzg5NiwiZXhwIjoyMDIwMTI5ODk2fQ.gjQpluE78qTAYksDEkmLiW4Xa7_-vCQhOlUP3dEkiy8")
    response = supabase.table('test').select("*").eq('id', id).execute()
    
    problem = response.data[0]['gpt']['Summarized Problem']
    solution = response.data[0]['gpt']['Summarized Solution']

    problem_audio = get_tts_audio_clip(problem, f"{id}-problem.wav")
    problem_text_clip = TextClip(problem, bg_color='yellow', color='green', size = (360, 640), method='caption').set_duration(problem_audio.duration).set_pos('center').set_start(1)
    problem_background = (ImageClip("./api/green.png").set_duration(problem_audio.duration + 2)).set_audio(problem_audio.set_start(1))
    part1 = CompositeVideoClip([problem_background, problem_text_clip])

    solution_audio = get_tts_audio_clip(solution, f"{id}-solution.wav")
    solution_text_clip = TextClip(solution, bg_color='green', color='yellow', size = (360, 640), method='caption').set_duration(solution_audio.duration).set_start(1).set_pos('center')
    solution_background = (ImageClip("./api/yellow.png").set_duration(solution_audio.duration + 2)).set_audio(solution_audio.set_start(1))
    part2 = CompositeVideoClip([solution_background, solution_text_clip])

    promo_background = (ImageClip("./api/promo.png").set_duration(1))
    part3 = CompositeVideoClip([promo_background])

    result = concatenate_videoclips([part1, part2, part3])
    result.write_videofile(f"./{id}-output.mp4", fps=1)

    with open(f"{id}-output.mp4", 'rb') as f:
        supabase.storage.from_("videos").upload(file=f, path=f"{id}-output.mp4", file_options={"content-type": "video/mp4"})

    return f"{id}-output.mp4"