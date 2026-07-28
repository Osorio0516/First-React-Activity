import { useEffect, useRef } from "react";
import { Text, View, StyleSheet, Pressable, Animated } from "react-native";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function NotFoundScreen() {
  // Same choreography as the rest of the app, but the ring settles
  // visibly off-center from the orb — a quiet visual echo of "off
  // the path" rather than a decorative flourish.
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
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={["#081410", "#0E241C", "#081410"]}
        style={styles.page}
      >
        {/* Orb + ring, deliberately off-axis from one another */}
        <Animated.View style={[styles.orbField, { opacity: orbFade }]}>
          <View style={styles.orb} />
          <View style={styles.orbRing} />
        </Animated.View>

        <View style={styles.hero}>
          <Animated.View
            style={[
              styles.content,
              { opacity: fade, transform: [{ translateY: rise }] },
            ]}
          >
            <Text style={styles.bigNumber}>404</Text>

            <View style={styles.eyebrowRow}>
              <View style={styles.eyebrowRule} />
              <Text style={styles.eyebrow}>Page not found</Text>
            </View>

            <Text style={styles.heading}>
              This page took a{"\n"}
              <Text style={styles.highlight}>wrong turn</Text>
            </Text>

            <Text style={styles.subheading}>
              The link may be broken, or the page has moved. Head back and
              try again.
            </Text>

            <Link href="/" asChild>
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
                  <Text style={styles.buttonArrow}>←</Text>
                  <Text style={styles.buttonText}>Back home</Text>
                </LinearGradient>
              </Pressable>
            </Link>
          </Animated.View>
        </View>
      </LinearGradient>
    </>
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
    top: "50%",
    left: "50%",
    width: 320,
    height: 320,
    marginTop: -220,
    marginLeft: -160,
  },

  orb: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 999,
    top: 20,
    left: 40,
    backgroundColor: "#1F6650",
    opacity: 0.5,
  },

  orbRing: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 999,
    top: 70,
    left: 90,
    borderWidth: 1,
    borderColor: "rgba(232, 184, 92, 0.4)",
  },

  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },

  content: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
  },

  bigNumber: {
    fontSize: 64,
    fontWeight: "800",
    color: "transparent",
    WebkitTextStroke: "1px " + GOLD,
    textShadowColor: "rgba(232, 184, 92, 0.35)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
    letterSpacing: 2,
    marginBottom: 18,
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
    marginRight: 10,
  },

  eyebrow: {
    color: GOLD,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },

  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: INK,
    textAlign: "center",
    lineHeight: 38,
    letterSpacing: -0.3,
  },

  highlight: {
    color: GOLD,
    fontStyle: "italic",
  },

  subheading: {
    marginTop: 18,
    fontSize: 16,
    color: SAGE,
    textAlign: "center",
    lineHeight: 25,
    marginBottom: 36,
    maxWidth: 300,
  },

  button: {
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

  buttonArrow: {
    color: "#0B1210",
    fontSize: 16,
    fontWeight: "800",
    marginRight: 8,
  },

  buttonText: {
    color: "#0B1210",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});