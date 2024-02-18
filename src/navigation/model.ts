import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type MainStack = {
  Pokemons: undefined;
  Search: undefined;
  Details: { name: string; url: string };
};

export type MainStackScreenProps<T extends keyof MainStack> =
  NativeStackScreenProps<MainStack, T>;
