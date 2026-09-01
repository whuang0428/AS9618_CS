from pathlib import Path
import sys

from PIL import Image


def main() -> None:
    output = Path(sys.argv[1])
    sources = [Path(value) for value in sys.argv[2:]]
    if not sources:
        raise SystemExit("No source tiles supplied")
    images = [Image.open(source).convert("RGB") for source in sources]
    width = images[0].width
    if any(image.width != width for image in images):
        raise SystemExit("Tile widths differ")
    canvas = Image.new("RGB", (width, sum(image.height for image in images)), "white")
    top = 0
    for image in images:
        canvas.paste(image, (0, top))
        top += image.height
        image.close()
    canvas.save(output, format="PNG", optimize=False)


if __name__ == "__main__":
    main()
