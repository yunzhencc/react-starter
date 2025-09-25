import { addCollection } from '@iconify/react'
import { parseSVGContent } from '@iconify/utils';

interface IconInfo {
	body: string;
	width: number;
	height: number;
}

let iconCollection: Record<string, IconInfo> | null = null;

async function registerLocalIcons() {
  if (iconCollection) {
		return;
	}

  const svgModules = import.meta.glob('../../assets/icons/*.svg', {
		query: '?raw',
		eager: true,
		import: 'default',
	});
  const icons: Record<string, IconInfo> = {};

  for (const [path, svgContent] of Object.entries(svgModules)) {
    try {
      const iconName = path.split('/').pop()?.replace('.svg', '');

      if (iconName) {
        const parsedSVG = parseSVGContent(svgContent as string);

        if (!parsedSVG) {
					console.warn(`Failed to parse SVG: ${iconName}`);
					continue;
				}

        if (!parsedSVG.body) {
					console.warn(`Failed to get SVG body for ${iconName}`);
					continue;
				}

        let width = 24;
				let height = 24;
        if (parsedSVG.attribs?.viewBox) {
          const viewBox = parsedSVG.attribs.viewBox.split(' ');

          if (viewBox.length === 4) {
						width = Number.parseInt(viewBox[2], 10);
						height = Number.parseInt(viewBox[3], 10);
					}
        }

        icons[iconName] = {
					body: parsedSVG.body,
					width,
					height,
				};
      }
    } catch (error) {
      console.error(error);
    }
  }

  iconCollection = icons;

  const result = addCollection({
		prefix: 'local',
		icons,
		width: 24,
		height: 24,
	});

  if (!result) {
		console.warn('Failed to add icon collection');
	}
}

export {
  registerLocalIcons,
}
