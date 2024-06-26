// packages
import {Dimensions, PixelRatio} from 'react-native';

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
const widthPercentageToDP = widthPercent => {
  let screenWidth = Dimensions.get('window').width;
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */
const heightPercentageToDP = heightPercent => {
  let screenHeight = Dimensions.get('window').height;
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

/**
 * Event listener function that detects orientation change (every time it occurs) and triggers
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 * @param {object} classComponent This Screen's class component this variable.
 *                                listenOrientationChange() needs it to invoke the class's setState
 *                                (this.setState()) method and trigger screen rerender.
 * @param {object} setStateHook A set-state function, typically from useState().
 *                              listenOrientationChange() calls it to set the state value and
 *                              trigger screen rerender.
 * @throws {Error} If neither or both of the params are set.  Must only set ONE of them.
 */
const listenOrientationChange = ({
  classComponentThis = null,
  setStateHook = null,
}) => {
  Dimensions.addEventListener('change', newDimensions => {
    // Retrieve and save new dimensions
    let screenWidth = newDimensions.window.width;
    let screenHeight = newDimensions.window.height;

    let orientation = screenWidth < screenHeight ? 'Portrait' : 'Landscape';

    // Trigger screen's rerender with a state update of the orientation variable
    if (classComponentThis && !setStateHook) {
      classComponentThis.setState(orientation);
    } else if (setStateHook && !classComponentThis) {
      setStateHook(orientation);
    } else {
      throw new Error(
        'Must set only ONE of classComponentThis or setStateHook',
      );
    }
  });
};

/**
 * Wrapper function that removes orientation change listener and should be invoked in
 * componentWillUnmount lifecycle method of every class component (UI screen) that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 */
const removeOrientationListener = () => {
  //@ts-ignore
  Dimensions?.removeEventListener('change', () => {});
};

const largp = percent =>
  widthPercentageToDP('100') > heightPercentageToDP('100')
    ? widthPercentageToDP(percent)
    : heightPercentageToDP(percent);

const smlp = percent =>
  widthPercentageToDP('100') > heightPercentageToDP('100')
    ? heightPercentageToDP(percent)
    : widthPercentageToDP(percent);

export {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as roc,
  smlp,
  largp,
};
