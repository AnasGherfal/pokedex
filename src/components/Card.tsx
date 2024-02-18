import { StyleSheet, Image } from "react-native";
import {
  Pressable,
  Center,
  Heading,
  AspectRatio,
  HStack,
  Box,
  Stack,
  Skeleton,
} from "native-base";
import { useQuery } from "react-query";
import { Pokemon, get } from "../services/requests";
import { useNavigation } from "@react-navigation/native";
import type { MainStackScreenProps } from "../navigation/model";
import { formatNumber, getTypeColor } from "../utils/helper";
interface PokemonCardProps {
  url: string;
  name: string;
}

export function Card({ url, name }: PokemonCardProps) {
  const { data, isLoading, isError } = useQuery<Pokemon>(
    ["pokemon", name],
    () => get(url)
  );

  const navigation =
    useNavigation<MainStackScreenProps<"Pokemons">["navigation"]>();
  if (isLoading)
    return (
      <Stack flex={1} space={1} borderRadius={10} m="2" p="5">
        <Skeleton h="32" />
        <Skeleton.Text px="4" />
      </Stack>
    );
  if (isError || !data) return null;

  return (
    <Pressable
      flex={1}
      m="2"
      p="5"
      borderRadius={10}
      backgroundColor={getTypeColor(data.types[0].type.name) + ".600"}
      onPress={() => navigation.navigate("Details", { name, url })}
    >
      <Center>
        <AspectRatio ratio={1} width="90%">
          <Image
            source={{
              uri: data.sprites.other["official-artwork"].front_default,
            }}
            alt="image"
          />
        </AspectRatio>
      </Center>

      <Heading color="white" textTransform="capitalize">
        {" "}
        {data.name} {formatNumber(data.id)}
      </Heading>

      <HStack>
        {data.types.map((type: any) => (
          <Box
            key={type.type.name}
            px="2"
            mr="1"
            backgroundColor={getTypeColor(type.type.name) + ".400"}
            borderRadius={10}
            _text={{
              color: "white",
              fontSize: "xs",
            }}
          >
            {type.type.name}
          </Box>
        ))}
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 32,
  },
  name: {
    fontWeight: "bold",
    fontSize: 32,
  },
});
