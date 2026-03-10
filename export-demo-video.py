from __future__ import annotations

import math
import subprocess
import sys
import textwrap
import wave
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
EXPORT_DIR = ROOT / "exports"
FRAME_DIR = EXPORT_DIR / "demo-frames"
SCRIPT_PATH = EXPORT_DIR / "demo-script.txt"
AUDIO_PATH = EXPORT_DIR / "demo-narration.wav"
VIDEO_PATH = EXPORT_DIR / "ai-gateway-demo.mp4"
VTT_PATH = EXPORT_DIR / "ai-gateway-demo.vtt"
TEMP_VIDEO_PATH = EXPORT_DIR / "ai-gateway-demo-silent.mp4"

WIDTH = 1280
HEIGHT = 720
FPS = 24

STEPS = [
    {
        "title": "Consentext AI Gateway",
        "subtitle": "Governed health AI routing before any model step begins.",
        "image": "01-walkthrough.png",
        "narration": "This is Consentext AI Gateway. It is the governed product layer for sensitive health AI requests. The trust boundary is chosen before any AI action happens.",
    },
    {
        "title": "Four Governed Lanes",
        "subtitle": "The lane is the core product decision, not a model picker.",
        "image": "02-lanes.png",
        "narration": "The main feature is the lane system. Each lane changes the boundary, the controls, and the return behavior.",
    },
    {
        "title": "Guided Task Selection",
        "subtitle": "The same request can be compared fairly across lanes.",
        "image": "03-guidance.png",
        "narration": "The task composer keeps the comparison honest. The product can also recommend the right lane and explain why.",
    },
    {
        "title": "Boundary Review",
        "subtitle": "Nothing runs until inside versus outside use is reviewed.",
        "image": "04-review.png",
        "narration": "Before any request runs, the product stops at boundary review. It makes clear what stays inside, what may leave, and which controls are active.",
    },
    {
        "title": "External Controls",
        "subtitle": "Approval, payload minimization, and provider mode stay visible.",
        "image": "05-external.png",
        "narration": "For the external lanes, the site keeps approval, payload minimization, and provider connection mode visible, including managed and bring your own key options.",
    },
    {
        "title": "Governed Return Flow",
        "subtitle": "Results come back labeled, referenced, and auditable.",
        "image": "06-result.png",
        "narration": "When the result comes back, it is lane labeled and returned through Consentext. Provenance, references, and the audit trail stay visible.",
    },
    {
        "title": "Side-by-Side Comparison",
        "subtitle": "Tradeoffs are easy to scan across all four lanes.",
        "image": "07-compare.png",
        "narration": "The compare view makes the tradeoffs easy to scan. The same task is compared across all four lanes for boundary, connection, payload, and output.",
    },
    {
        "title": "Presenter Workflow",
        "subtitle": "Built for internal review, sharing, and repeatable demos.",
        "image": "08-presenter.png",
        "narration": "The prototype also includes presenter tools, including demo scenes, review mode, summaries, share links, and persistent state.",
    },
    {
        "title": "Why It Matters",
        "subtitle": "Consentext stays in the middle instead of handing users off to outside AI.",
        "image": "09-close.png",
        "narration": "The main takeaway is that this is not a generic AI front end. It is a governed product layer that keeps the trust boundary explicit and keeps Consentext in the middle.",
    },
    {
        "title": "Consentext AI Gateway",
        "subtitle": "Internal walkthrough for boss and team review. March 10, 2026.",
        "image": None,
        "narration": "That is the Consentext AI Gateway walkthrough. The product value is governed routing, visible boundaries, and Consentext staying in the middle.",
    },
]


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/georgiab.ttf" if bold else "C:/Windows/Fonts/georgia.ttf",
        "C:/Windows/Fonts/seguisb.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


TITLE_FONT = load_font(44, bold=True)
SUBTITLE_FONT = load_font(24)
BODY_FONT = load_font(20)
KICKER_FONT = load_font(18, bold=True)


def write_script() -> str:
    script = "\n\n".join(f"{step['title']}: {step['narration']}" for step in STEPS)
    EXPORT_DIR.mkdir(exist_ok=True)
    SCRIPT_PATH.write_text(script, encoding="utf-8")
    return script


def format_vtt_timestamp(seconds: float) -> str:
    total_millis = int(round(seconds * 1000))
    hours = total_millis // 3_600_000
    remainder = total_millis % 3_600_000
    minutes = remainder // 60_000
    remainder %= 60_000
    secs = remainder // 1000
    millis = remainder % 1000
    return f"{hours:02}:{minutes:02}:{secs:02}.{millis:03}"


def write_vtt(durations: list[float]) -> None:
    lines = ["WEBVTT", ""]
    elapsed = 0.0
    for index, step in enumerate(STEPS, start=1):
        start = elapsed
        end = elapsed + durations[index - 1]
        lines.append(str(index))
        lines.append(f"{format_vtt_timestamp(start)} --> {format_vtt_timestamp(end)}")
        lines.append(f"{step['title']}: {step['narration']}")
        lines.append("")
        elapsed = end
    VTT_PATH.write_text("\n".join(lines), encoding="utf-8")


def synthesize_audio(script: str) -> bool:
    escaped_script_path = str(SCRIPT_PATH).replace("'", "''")
    escaped_audio_path = str(AUDIO_PATH).replace("'", "''")
    command = f"""
$text = Get-Content -Raw '{escaped_script_path}';
$voice = New-Object -ComObject SAPI.SpVoice;
$token = $voice.GetVoices() | Where-Object {{ $_.GetDescription() -like '*Zira*' }} | Select-Object -First 1;
if (-not $token) {{ $token = $voice.GetVoices() | Select-Object -First 1 }};
$voice.Voice = $token;
$voice.Rate = -1;
$voice.Volume = 100;
$stream = New-Object -ComObject SAPI.SpFileStream;
$stream.Open('{escaped_audio_path}', 3, $false);
$voice.AudioOutputStream = $stream;
$voice.Speak($text) | Out-Null;
$stream.Close();
"""
    result = subprocess.run(
        ["powershell", "-NoProfile", "-Command", command],
        capture_output=True,
        text=True,
    )
    return result.returncode == 0 and AUDIO_PATH.exists()


def get_audio_duration() -> float | None:
    if not AUDIO_PATH.exists():
        return None
    with wave.open(str(AUDIO_PATH), "rb") as handle:
        return handle.getnframes() / float(handle.getframerate())


def estimate_durations(total_seconds: float | None) -> list[float]:
    base = []
    for step in STEPS:
        words = len(step["narration"].split())
        base.append(max(3.4, min(7.2, words * 0.28)))

    if total_seconds:
        scale = total_seconds / sum(base)
        return [max(2.6, value * scale) for value in base]
    return base


def fit_image(image: Image.Image, width: int, height: int) -> Image.Image:
    image = image.convert("RGB")
    ratio = max(width / image.width, height / image.height)
    resized = image.resize((math.ceil(image.width * ratio), math.ceil(image.height * ratio)))
    left = max(0, (resized.width - width) // 2)
    top = max(0, (resized.height - height) // 2)
    return resized.crop((left, top, left + width, top + height))


def compose_frame(step: dict, index: int, total: int) -> Image.Image:
    canvas = Image.new("RGB", (WIDTH, HEIGHT), "#0f1720")
    draw = ImageDraw.Draw(canvas)

    draw.rounded_rectangle((34, 30, WIDTH - 34, HEIGHT - 30), radius=34, fill="#152633")
    draw.rounded_rectangle((54, 150, WIDTH - 54, HEIGHT - 84), radius=26, fill="#0c141b")

    if step["image"]:
        image_path = FRAME_DIR / step["image"]
        screenshot = fit_image(Image.open(image_path), WIDTH - 128, 430)
        canvas.paste(screenshot, (64, 164))
    else:
        gradient = Image.new("RGB", (WIDTH - 128, 430), "#102431")
        gradient_draw = ImageDraw.Draw(gradient)
        gradient_draw.rounded_rectangle((0, 0, gradient.width, gradient.height), radius=28, fill="#102431")
        gradient_draw.ellipse((-80, -40, 220, 220), fill="#1e6b66")
        gradient_draw.ellipse((gradient.width - 260, 120, gradient.width + 40, 420), fill="#b88a2b")
        gradient_draw.text((60, 72), "CONSENTEXT", font=KICKER_FONT, fill="#cfe0ea")
        gradient_draw.text((60, 118), "AI Gateway", font=load_font(54, bold=True), fill="white")
        gradient_draw.text((60, 194), "Governed routing for sensitive health AI", font=load_font(28), fill="#d8e4eb")
        gradient_draw.text((60, 256), "Built for internal review and product storytelling", font=load_font(24), fill="#d8e4eb")
        gradient_draw.text((60, 330), "March 10, 2026", font=BODY_FONT, fill="#cfe0ea")
        canvas.paste(gradient, (64, 164))

    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.rounded_rectangle((64, 486, WIDTH - 64, HEIGHT - 104), radius=24, fill=(10, 18, 26, 214))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(canvas)

    draw.text((74, 54), "CONSENTEXT AI GATEWAY DEMO", font=KICKER_FONT, fill="#b6c6d4")
    draw.text((74, 88), step["title"], font=TITLE_FONT, fill="white")
    subtitle = textwrap.fill(step["subtitle"], width=58)
    draw.multiline_text((74, 502), subtitle, font=SUBTITLE_FONT, fill="#e2e8ef", spacing=6)
    draw.text((74, HEIGHT - 84), f"Step {index + 1} of {total}", font=BODY_FONT, fill="#c6d3df")

    progress_width = WIDTH - 180
    progress_x = 74
    progress_y = HEIGHT - 52
    draw.rounded_rectangle((progress_x, progress_y, progress_x + progress_width, progress_y + 12), radius=999, fill="#304556")
    filled = int(progress_width * ((index + 1) / total))
    draw.rounded_rectangle((progress_x, progress_y, progress_x + filled, progress_y + 12), radius=999, fill="#3cb6ad")

    return canvas.convert("RGB")


def write_video(durations: list[float]) -> None:
    writer = imageio_ffmpeg.write_frames(
        str(TEMP_VIDEO_PATH),
        size=(WIDTH, HEIGHT),
        fps=FPS,
        codec="libx264",
        pix_fmt_out="yuv420p",
        output_params=["-movflags", "+faststart"],
    )
    writer.send(None)

    previous = None
    for index, step in enumerate(STEPS):
        current = compose_frame(step, index, len(STEPS))
        current_array = np.array(current)
        if previous is not None:
          for fade in range(8):
              alpha = (fade + 1) / 8
              blended = ((1 - alpha) * previous + alpha * current_array).astype(np.uint8)
              writer.send(blended)
        frame_count = max(1, int(durations[index] * FPS))
        for _ in range(frame_count):
            writer.send(current_array)
        previous = current_array

    writer.close()


def mux_audio() -> None:
    if not AUDIO_PATH.exists():
        TEMP_VIDEO_PATH.replace(VIDEO_PATH)
        return

    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    subprocess.run(
        [
            ffmpeg_exe,
            "-y",
            "-i",
            str(TEMP_VIDEO_PATH),
            "-i",
            str(AUDIO_PATH),
            "-filter:a",
            "loudnorm=I=-16:TP=-1.5:LRA=11",
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-shortest",
            str(VIDEO_PATH),
        ],
        check=True,
        capture_output=True,
    )
    TEMP_VIDEO_PATH.unlink(missing_ok=True)


def main() -> None:
    missing = [step["image"] for step in STEPS if step["image"] and not (FRAME_DIR / step["image"]).exists()]
    if missing:
        raise SystemExit(f"Missing captured frames: {', '.join(missing)}")

    script = write_script()
    synthesize_audio(script)
    durations = estimate_durations(get_audio_duration())
    write_vtt(durations)
    write_video(durations)
    mux_audio()
    print(f"Exported demo video: {VIDEO_PATH}")
    if AUDIO_PATH.exists():
        print(f"Generated narration: {AUDIO_PATH}")
    print(f"Saved script: {SCRIPT_PATH}")
    print(f"Saved captions: {VTT_PATH}")


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as exc:
        sys.stderr.write(exc.stderr.decode() if isinstance(exc.stderr, bytes) else str(exc.stderr))
        raise
