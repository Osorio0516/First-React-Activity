import { Tabs } from "expo-router";
// npx expo install @expo/vector-icons
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

const SAGE = "#9FB8AC";
const GOLD = "#E8B85C";
const SURFACE = "#0E241C";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: GOLD,
        tabBarInactiveTintColor: SAGE,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          letterSpacing: 1,
          textTransform: "uppercase",
        },
        // Floating pill bar, same language on every platform — but
        // on web it's capped in width and centered instead of
        // stretching edge-to-edge across a wide browser window.
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.select({ ios: 34, web: 24, default: 20 }),
          height: 68,
          borderRadius: 24,
          backgroundColor: SURFACE,
          borderWidth: 1,
          borderColor: "rgba(232, 184, 92, 0.18)",
          paddingTop: 10,
          ...Platform.select({
            web: {
              left: "50%",
              width: 360,
              marginLeft: -180,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
              cursor: "pointer",
            },
            default: {
              left: 24,
              right: 24,
              shadowColor: "#000",
              shadowOpacity: 0.35,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 10 },
              elevation: 10,
            },
          }),
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "information-circle" : "information-circle-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}