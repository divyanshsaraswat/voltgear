// This is a shim for web and Android where the tab bar is generally opaque.
import { Colors } from "@/constants/Colors";
export default undefined;

export function useBottomTabOverflow() {
  return Colors.background;
}
