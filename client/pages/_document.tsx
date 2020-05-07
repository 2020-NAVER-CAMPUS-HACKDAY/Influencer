import Document, { DocumentContext } from 'next/document';
import { createGlobalStyle, ServerStyleSheet } from 'styled-components';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(
            <>
              <GlobalStyle />
              <App {...props} />
            </>,
        ),
      });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      sheet.seal();
    }
  }
}

export default CustomDocument;

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
  }
`;
