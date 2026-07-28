import { useEffect, useRef } from "react";
import { Text, View, StyleSheet, Pressable, Image, Animated } from "react-native";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function AboutScreen() {
  // Same entrance choreography as the home screen: orb settles first,
  // then content rises into place — keeps the two screens feeling
  // like one app rather than two separate templates.
  const rise = useRef(new Animated.Value(24)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const orbFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(orbFade, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 620,
          useNativeDriver: true,
        }),
        Animated.spring(rise, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={["#081410", "#0E241C", "#081410"]}
      style={styles.page}
    >
      <Stack.Screen options={{ headerShown: false }} />

      {/* Decorative orb cluster — mirrored from the home screen, left side this time */}
      <Animated.View style={[styles.orbField, { opacity: orbFade }]}>
        <View style={[styles.orb, styles.orbLarge]} />
        <View style={[styles.orb, styles.orbSmall]} />
        <View style={styles.orbRing} />
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>MyApp</Text>

        <Link href="/asdf" style={styles.navLink}>
          Home
        </Link>
      </View>

      {/* Main Content */}
      <View style={styles.hero}>
        <Animated.View
          style={[
            styles.content,
            { opacity: fade, transform: [{ translateY: rise }] },
          ]}
        >
          <View style={styles.eyebrowRow}>
            <View style={styles.eyebrowRule} />
            <Text style={styles.eyebrow}>About Me</Text>
            <View style={styles.eyebrowRule} />
          </View>

          <View style={styles.identityRow}>
            <Image
              source={require("../../../assets/images/Haru.jpg")}
              style={styles.avatar}
            />
            <Text style={styles.name}>Carlos Miguel Osorio</Text>
            <Text style={styles.role}>Developer Student</Text>
          </View>

          <Text style={styles.subheading}>
            Hi, I'm Carlos — I build apps that make everyday tasks a little
            easier. I created this project to explore React Native and
            Expo Router, and to share what I'm learning along the way.
          </Text>

          <Link href="/" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonArrow}>←</Text>
              <Text style={styles.buttonText}>Back home</Text>
            </Pressable>
          </Link>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerRule} />
        <Text style={styles.footerText}>Built with React Native & Expo</Text>
      </View>
    </LinearGradient>
  );
}

const INK = "#F5EFE0";
const SAGE = "#9FB8AC";
const GOLD = "#E8B85C";

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  orbField: {
    position: "absolute",
    top: -60,
    left: -90,
    width: 340,
    height: 340,
  },

  orb: {
    position: "absolute",
    borderRadius: 999,
  },

  orbLarge: {
    width: 260,
    height: 260,
    top: 10,
    left: 10,
    backgroundColor: "#1F6650",
    opacity: 0.55,
  },

  orbSmall: {
    width: 130,
    height: 130,
    top: 150,
    left: 160,
    backgroundColor: GOLD,
    opacity: 0.18,
  },

  orbRing: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 999,
    top: 40,
    left: 40,
    borderWidth: 1,
    borderColor: "rgba(232, 184, 92, 0.35)",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 20,
  },

  logo: {
    color: INK,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  navLink: {
    color: SAGE,
    fontSize: 15,
    fontWeight: "600",
  },

  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },

  content: {
    maxWidth: 420,
    alignItems: "center",
  },

  eyebrowRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },

  eyebrowRule: {
    width: 28,
    height: 1,
    backgroundColor: GOLD,
    marginHorizontal: 10,
  },

  eyebrow: {
    color: GOLD,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },

  identityRow: {
    alignItems: "center",
    marginBottom: 24,
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: GOLD,
    marginBottom: 14,
  },

  name: {
    fontSize: 24,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.3,
    textAlign: "center",
  },

  role: {
    fontSize: 14,
    fontWeight: "600",
    color: GOLD,
    marginTop: 4,
    letterSpacing: 0.3,
    textAlign: "center",
  },

  subheading: {
    fontSize: 16,
    color: SAGE,
    lineHeight: 25,
    marginBottom: 36,
    maxWidth: 360,
    textAlign: "center",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(232, 184, 92, 0.45)",
    paddingVertical: 14,
    paddingHorizontal: 24,
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  buttonArrow: {
    color: GOLD,
    fontSize: 16,
    fontWeight: "800",
    marginRight: 8,
  },

  buttonText: {
    color: INK,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  footer: {
    paddingBottom: 36,
    paddingHorizontal: 28,
    alignItems: "center",
  },

  footerRule: {
    height: 1,
    width: 60,
    backgroundColor: "rgba(159, 184, 172, 0.18)",
    marginBottom: 16,
  },

  footerText: {
    color: "#5C7268",
    fontSize: 12,
    letterSpacing: 0.4,
  },
});