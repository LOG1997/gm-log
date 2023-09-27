// uno.config.ts
import { defineConfig } from 'unocss';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import { presetExtra } from 'unocss-preset-extra';
// import { animatedRules } from './src/style/animated'
// import presetWind from '@unocss/preset-wind'
export default defineConfig({
    // ...UnoCSS options
    rules: [
        ['m-1', { margin: '0.25rem' }],
        [/^clip-path-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    ],
    presets: [
        // presetWind(),
        presetUno(),
        presetAttributify(),
        presetExtra(),
        presetIcons({
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': 'middle',
            },
        }),
    ],
});
