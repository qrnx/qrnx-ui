import styles from "@/components/layout.module.css";
import { cn } from "@/lib/utils";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={cn(styles["container-wrapper"], "flex grow")}>
      <div
        className={cn(
          styles.container,
          "flex-1 items-center justify-start flex-col flex grow"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { Layout };
