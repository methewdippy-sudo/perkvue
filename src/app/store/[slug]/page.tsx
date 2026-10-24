import DealsPage, { generateMetadata, generateStaticParams } from "../../deals/[slug]/page";

export const dynamic = "force-static";
export { generateMetadata, generateStaticParams };
export default DealsPage;
