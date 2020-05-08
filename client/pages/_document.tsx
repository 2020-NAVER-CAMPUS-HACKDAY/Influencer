import React from 'react';
import Document, {
  Html, Head, Main, NextScript, DocumentContext,
} from 'next/document';
import { ServerStyleSheet as StyledComponentsSheet } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';
import GlobalStyles from 'components/GlobalStyles';
import getLocale from 'utils/getLocale';

interface Props {
  locale: string;
}

class CustomDocument extends Document<Props> {
  public static async getInitialProps(ctx: DocumentContext) {
    const styledComponentsSheet = new StyledComponentsSheet();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => materialUiSheets.collect(
          styledComponentsSheet.collectStyles(
            <>
              <GlobalStyles />
              materialUiSheets.collect(<App {...props} />)
            </>,
          ),
        ),
      });

      const initialProps = await Document.getInitialProps(ctx);
      const locale = getLocale(ctx.query);
      return {
        ...initialProps,
        locale,
        styles: (
          <>
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </>
        ),
      };
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      styledComponentsSheet.seal();
    }
  }

  public render() {
    return (
      <Html lang={this.props.locale.split('-')[0]}>
        <Head />
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
