"""Create Nudge derivatives from the two licensed animation source archives."""
import json
from pathlib import Path
from zipfile import ZipFile

SOURCE = Path('docs/assets/landing-motion')
DESTINATION = Path('public/brand/landing/motion')


def recolor(value):
    if isinstance(value, dict):
        if value.get('ty') in ('fl', 'st') and isinstance(value.get('c', {}).get('k'), list):
            color = value['c']['k']
            if len(color) >= 3 and all(isinstance(c, (int, float)) for c in color[:3]):
                red, green, blue = color[:3]
                brightness = (red + green + blue) / 3
                if brightness > .88:
                    replacement = '#FAF8F4'
                elif brightness < .35:
                    replacement = '#315F5E'
                elif blue > red * 1.1:
                    replacement = '#7EADDB'
                elif red > green * 1.1:
                    replacement = '#E6D4BE'
                else:
                    replacement = '#679F9E'
                value['c']['k'] = [int(replacement[i:i+2], 16) / 255 for i in (1, 3, 5)] + [1]
        for child in value.values():
            recolor(child)
    elif isinstance(value, list):
        for child in value:
            recolor(child)


for name in ('phone', 'diary'):
    with ZipFile(SOURCE / f'{name}-original.lottie') as archive:
        animation = json.loads(archive.read(next(n for n in archive.namelist() if n.startswith('animations/'))))
    recolor(animation)
    if name == 'phone':
        animation['layers'] = [layer for layer in animation['layers'] if layer.get('nm') != 'Hand']
    else:
        animation['layers'] = [layer for layer in animation['layers'] if layer.get('refId') != 'comp_0']
        animation['assets'] = []
    animation['nm'] = f'Nudge {name}, adapted from credited LottieFiles source'
    (DESTINATION / f'{name}.json').write_text(json.dumps(animation, separators=(',', ':')), encoding='utf-8')
    print(name, animation['fr'], animation['op'], (DESTINATION / f'{name}.json').stat().st_size)
