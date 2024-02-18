import { Center, Spinner, FlatList } from "native-base";
import { useInfiniteQuery } from "react-query"; // Import the useInfiniteQuery hook
import { getAllPokemons } from "../../services/requests"; // Import your fetchAllPokemon function here
import { Card } from "../../components/Card";

interface Pokemon {
  name: string;
  url: string;
}

export function Pokemon() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      "pokemon",
      async ({ pageParam = "" }) => {
        const response = await getAllPokemons({ pageParam });
        return response;
      },
      {
        getNextPageParam: (lastPage) => lastPage.next ?? false,
      }
    );

  const pokemon: Pokemon[] = data?.pages.flatMap((page) => page.results) ?? [];

  const loadMore = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading)
    return (
      <Center>
        <Spinner size="sm" color="red"></Spinner>
      </Center>
    );
  return (
    <FlatList
      data={pokemon}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <Card url={item.url} name={item.name} />}
      onEndReached={loadMore}
      contentInsetAdjustmentBehavior="automatic"
      ListFooterComponent={() =>
        isFetchingNextPage ? <Spinner mt="4" size="lg" color="red" /> : null
      }
    />
  );
}
