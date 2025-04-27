import { ThemeProvider as BaseThemeProvider } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <BaseThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </BaseThemeProvider>
  );
}

export default ThemeProvider;
