import { globalCss } from './stitches.config';

export const applyGlobalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
  html: {
    fontSize: '$base',
    backgroundColor: '$background',
    color: '$text',
  },
  body: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
    fontSize: '$base',
    lineHeight: '$m',
    letterSpacing: '$base',
    fontFamily: '$primary',
    backgroundColor: '$background',
    color: '$text',
  },
  fieldset: {
    //border: 0,
  },
});
