import styles from "@/components/layout.module.css";
import { cn } from "@/lib/utils";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={styles["container-wrapper"]}>
      <div className={cn(styles.container, "flex-1 items-start ")}>
        {children}
      </div>
    </div>
  );
};

export { Layout };
