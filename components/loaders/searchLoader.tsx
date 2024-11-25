import { ScrollView, View, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Skeleton } from "@rneui/base";

// Skeleton loader using <Skeleton />
export function SearchLoader() {
  const colorScheme = useColorScheme();

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
      }}
    >
      {[...Array(10)].map((_, index) => (
        <View
          key={index}
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 4,
            paddingVertical: 7,
          }}
        >
          {/* Image Skeleton */}
          <Skeleton
            style={{
              flex: 1,
              width: 60,
              height: 60,
              borderRadius: 10,

              maxWidth: 55,
            }}
          />
          {/* Content Skeleton */}
          <View
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: 5,
              width: "82%",
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 5,
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 3,
                  width: "82%",
                }}
              >
                {/* Icon Skeleton */}
                <Skeleton
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                  }}
                />
                {/* Title Skeleton */}
                <Skeleton
                  style={{
                    flex: 1,
                    height: 14,

                    borderRadius: 4,
                  }}
                />
              </View>
              {/* Overview Skeleton */}
              <Skeleton
                style={{
                  flex: 1,
                  height: 14,

                  borderRadius: 4,
                }}
              />
            </View>

            {/* Footer Skeleton */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                alignItems: "center",
              }}
            >
              {/* Star Icon Skeleton */}
              <Skeleton
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                }}
              />
              {/* Rating Skeleton */}
              <Skeleton
                style={{
                  width: 40,
                  height: 14,

                  borderRadius: 4,
                }}
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
