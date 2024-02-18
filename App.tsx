import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { MainNavigation } from "./src/navigation/main";
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
