import DealsPage, { generateMetadata, generateStaticParams } from "../../deals/[slug]/page";

export const revalidate = 86400;
export { generateMetadata, generateStaticParams };
export default DealsPage;
