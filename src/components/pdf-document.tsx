/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  View,
  Page,
  Font,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

interface PdfDocumentProps {
  affirmativeUrl: string | null;
  negativeUrl: string | null;
  affirmativeText: string;
  negativeText: string;
  title: string;
}

export const PdfDocument = (props: PdfDocumentProps) => {
  const { affirmativeUrl, negativeUrl, affirmativeText, negativeText, title } =
    props;

  Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
  });

  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 40,
      // backgroundColor: "#E4E4E4",
    },
    text: {
      fontFamily: "Roboto",
      fontSize: 50,
      fontWeight: 600,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },

    qrSection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 100,
    },
    qr: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    qrTitle: {
      fontFamily: "Roboto",
      fontSize: 30,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.qrSection}>
          <View style={styles.qr}>
            <Text style={styles.qrTitle}>{affirmativeText}</Text>
            <Image
              src={affirmativeUrl || ""}
              style={{ width: 200, height: 200 }}
            />
          </View>

          <View style={styles.qr}>
            <Text style={styles.qrTitle}>{negativeText}</Text>
            <Image
              src={negativeUrl || ""}
              style={{ width: 200, height: 200 }}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};
