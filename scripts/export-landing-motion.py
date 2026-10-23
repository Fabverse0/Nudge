"""Create Nudge derivatives from the two licensed animation source archives."""
import json
import subprocess
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
    if name == 'phone':
        (SOURCE / 'phone-source.json').write_text(json.dumps(animation, separators=(',', ':')), encoding='utf-8')
        subprocess.run(['node', 'scripts/build-phone-story.mjs'], check=True)
        continue
    recolor(animation)
    animation['layers'] = [layer for layer in animation['layers'] if layer.get('refId') != 'comp_0']
    animation['assets'] = []
    for row, (start, end) in enumerate(((95, 225), (250, 448))):
        points = [[568 + i * 18, 660 + row * 54 + offset] for i, offset in enumerate((0, -7, 3, -5, 1, -6, 0))]
        handles = [[0, 0] for _ in points]
        animation['layers'].insert(4, {
            'ddd': 0, 'ind': 100 + row, 'ty': 4, 'nm': f'Nudge neutral note {row + 1}',
            'ip': 0, 'op': 555, 'st': 0,
            'ks': {'o': {'a': 1, 'k': [
                {'t': 0, 's': [100], 'h': 1},
                {'t': 530, 's': [100], 'i': {'x': [.7], 'y': [1]}, 'o': {'x': [.3], 'y': [0]}},
                {'t': 552, 's': [0]},
            ]}, 'p': {'a': 0, 'k': [0, 0, 0]}, 'a': {'a': 0, 'k': [0, 0, 0]}, 's': {'a': 0, 'k': [100, 100, 100]}, 'r': {'a': 0, 'k': 0}},
            'shapes': [
                {'ty': 'sh', 'ks': {'a': 0, 'k': {'v': points, 'i': handles, 'o': handles, 'c': False}}},
                {'ty': 'st', 'c': {'a': 0, 'k': [49/255, 95/255, 94/255, 1]}, 'o': {'a': 0, 'k': 100}, 'w': {'a': 0, 'k': 4}, 'lc': 2, 'lj': 2},
                {'ty': 'tm', 's': {'a': 0, 'k': 0}, 'e': {'a': 1, 'k': [
                    {'t': start, 's': [0], 'i': {'x': [.67], 'y': [1]}, 'o': {'x': [.33], 'y': [0]}},
                    {'t': end, 's': [100]},
                ]}, 'o': {'a': 0, 'k': 0}, 'm': 1},
            ],
        })
    animation['nm'] = f'Nudge {name}, adapted from credited LottieFiles source'
    (DESTINATION / f'{name}.json').write_text(json.dumps(animation, separators=(',', ':')), encoding='utf-8')
    print(name, animation['fr'], animation['op'], (DESTINATION / f'{name}.json').stat().st_size)
