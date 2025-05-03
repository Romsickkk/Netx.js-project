import RedirectToast from "@/ui/redirect-toast";

type RootTemplateProps = { children: React.ReactNode };

export default function RootTemplate({ children }: RootTemplateProps) {
  return (
    <>
      <div>{children}</div>
      <RedirectToast />
    </>
  );
}
