import { Center, Text, Stack, Spinner, Input } from "native-base";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Pokemon, getPokemon } from "../../services/requests";
import { MainStackScreenProps } from "../../navigation/model";
export function Search({ navigation }: MainStackScreenProps<"Search">) {
  const [name, setName] = useState("");

  const { data, error, isLoading } = useQuery<Pokemon[]>(
    ["pokemon", name],
    () => getPokemon(name.toLowerCase()),

    {
      enabled: !!name,
    }
  );

  useEffect(() => {
    if (data && data.length > 0) {
      data.forEach((pokemon) => {
        navigation.replace("Details", {
          name: pokemon.name,
          url: `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        });
      });
    }
  }, [data, navigation]);

  return (
    <Stack flex={1} p="2">
      <Input
        placeholder="Search"
        px="3"
        rounded="xl"
        py="4"
        fontSize={18}
        returnKeyType="search"
        backgroundColor={"white"}
        onSubmitEditing={({ nativeEvent }) => setName(nativeEvent.text)}
      ></Input>

      {isLoading ? (
        <Center flex="1">
          <Spinner accessibilityLabel="Loading..." />
        </Center>
      ) : (
        <Center flex="1">
          {!!error && (
            <Text fontSize="xl" color="gray.500">
              No results found for {name}
            </Text>
          )}
        </Center>
      )}
    </Stack>
  );
}
