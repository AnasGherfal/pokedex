import { MainStackScreenProps } from "../../navigation/model";
import { Pokemon, Species, get } from "../../services/requests";
import { useQuery } from "react-query";
import {
  Center,
  Heading,
  AspectRatio,
  HStack,
  Box,
  Stack,
  Spinner,
  Skeleton,
  Text,
  Image,
} from "native-base";
import {
  getTypeColor,
  formatNumber,
  removeEscapeCharacters,
} from "../../utils/helper";
export function Details({ route }: MainStackScreenProps<"Details">) {
  const { name, url } = route.params;

  const { data } = useQuery<Pokemon>(["pokemon", name], () => get(url));

  const { data: species, isLoading: isSpeciesLoading } = useQuery<Species>(
    ["species", name],
    () => get(data?.species.url || ""),
    {
      enabled: !!data,
    }
  );

  if (!data) return null;
  return (
    <Stack>
      <Center
        safeArea
        backgroundColor={getTypeColor(data.types[0].type.name) + ".600"}
      >
        <AspectRatio ratio={1} width="90%">
          <Image
            source={{
              uri: data.sprites.other["official-artwork"].front_default,
            }}
            alt="image"
          ></Image>
        </AspectRatio>
        <HStack
          justifyContent="space-between"
          width="100%"
          p="3"
          alignItems="center"
          position="absolute"
          bottom={0}
          left={0}
          right={0}
        >
          <Heading color="white" textTransform={"capitalize"} size="3xl">
            {name}
          </Heading>
          <Heading color="white">{formatNumber(data.id)}</Heading>
        </HStack>
      </Center>
      <Stack p="3">
        <HStack justifyContent="center">
          {data.types.map((type) => (
            <Center
              key={type.type.name}
              backgroundColor={getTypeColor(type.type.name) + ".600"}
              rounded="full"
              p="1"
              minW="32"
              _text={{
                color: "white",
                fontSize: "lg",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              mx="5"
            >
              {type.type.name}
            </Center>
          ))}
        </HStack>
        <Center>
          {isSpeciesLoading && <Skeleton.Text />}
          {!!species && (
            <Text fontSize="xl" mt="4">
              {removeEscapeCharacters(
                species.flavor_text_entries[0].flavor_text
              )}
            </Text>
          )}
        </Center>
      </Stack>
    </Stack>
  );
}
