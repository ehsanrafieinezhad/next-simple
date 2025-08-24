import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  output: "standalone",
  images:{
    domains: ['storage.c2.liara.space'],
  }
};

export default withNextIntl(nextConfig);
