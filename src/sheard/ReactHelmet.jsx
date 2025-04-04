
import { Helmet } from "react-helmet";

const ReactHelmet = ({title}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>

    </Helmet>
  );
};

export default ReactHelmet;
