import { useEffect, useRef } from "react";
import { Text, View, StyleSheet, Pressable, Animated } from "react-native";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  // Single orchestrated entrance: content breathes in from below, the
  // orb cluster settles a beat behind it. Nothing else animates —
  // the rest of the screen stays still and confident.
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

      {/* Decorative orb cluster — the signature element */}
      <Animated.View style={[styles.orbField, { opacity: orbFade }]}>
        <View style={[styles.orb, styles.orbLarge]} />
        <View style={[styles.orb, styles.orbSmall]} />
        <View style={styles.orbRing} />
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>MyApp</Text>

        <Link href="/about" style={styles.navLink}>
          About
        </Link>
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        <Animated.View
          style={[
            styles.content,
            { opacity: fade, transform: [{ translateY: rise }] },
          ]}
        >
          <View style={styles.eyebrowRow}>
            <View style={styles.eyebrowRule} />
            <Text style={styles.eyebrow}>Personal Welcome</Text>
            <View style={styles.eyebrowRule} />
          </View>

          <Text style={styles.heading}>
            Hey there,{"\n"}it's{" "}
            <Text style={styles.highlight}>UMAZING</Text>
            {"\n"}to see you
          </Text>

          <Text style={styles.subheading}>
            A React Native starter built with Expo Router — clean,
            considered, and ready for your next big idea.
          </Text>

          <Link href="/about" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <LinearGradient
                colors={["#E8B85C", "#D69A3E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>About me</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </LinearGradient>
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
    right: -80,
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
    right: 10,
    backgroundColor: "#1F6650",
    opacity: 0.55,
  },

  orbSmall: {
    width: 130,
    height: 130,
    top: 150,
    right: 160,
    backgroundColor: GOLD,
    opacity: 0.18,
  },

  orbRing: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 999,
    top: 40,
    right: 40,
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
    marginBottom: 22,
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

  heading: {
    fontSize: 42,
    fontWeight: "800",
    color: INK,
    lineHeight: 48,
    letterSpacing: -0.5,
    textAlign: "center",
  },

  highlight: {
    color: GOLD,
    fontStyle: "italic",
  },

  subheading: {
    marginTop: 20,
    fontSize: 16,
    color: SAGE,
    lineHeight: 25,
    marginBottom: 36,
    maxWidth: 340,
    textAlign: "center",
  },

  button: {
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: GOLD,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 26,
  },

  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: "#0B1210",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  buttonArrow: {
    color: "#0B1210",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 8,
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