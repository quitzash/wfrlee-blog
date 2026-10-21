// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/blog/_astro/*",
    "/blog/.assetsignore",
    "/blog/.htaccess",
    "/blog/favicon.ico",
    "/blog/favicon.svg",
    "/blog/web.config",
    "/blog/images/hourly-micro-stays.jpg",
    "/blog/images/og-default.jpg",
    "/blog/images/pexels-2375361-10585076.jpg",
    "/blog/images/pexels-abul-lais-2161703794-39470815.jpg",
    "/blog/images/pexels-abul-lais-2161703794-39470841.jpg",
    "/blog/images/pexels-abul-lais-2161703794-39470846.jpg",
    "/blog/images/pexels-al-amin-muhammad-988616478-34214025.jpg",
    "/blog/images/pexels-andromeda99-19924689.jpg",
    "/blog/images/pexels-curtis-cheng-2154926261-38490446.jpg",
    "/blog/images/pexels-enginakyurt-15483696.jpg",
    "/blog/images/pexels-fernanda-da-silva-lopes-2055473628-29379902.jpg",
    "/blog/images/pexels-homegrounds-co-3480562-5200278.jpg",
    "/blog/images/pexels-hussain-awan-2780712-4321707.jpg",
    "/blog/images/pexels-kashyap197-37909605.jpg",
    "/blog/images/pexels-kashyap197-37909633.jpg",
    "/blog/images/pexels-ketut-subiyanto-4907455.jpg",
    "/blog/images/pexels-konevi-34246941.jpg",
    "/blog/images/pexels-konevi-34246946.jpg",
    "/blog/images/pexels-louie-alma-2154387078-33197282.jpg",
    "/blog/images/pexels-mdamirumar-34744916.jpg",
    "/blog/images/pexels-mikhail-nilov-7820326.jpg",
    "/blog/images/pexels-mloky96-35761.jpg",
    "/blog/images/pexels-nicolas-rueda-175965148-12639108.jpg",
    "/blog/images/pexels-nietjuhart-14131701.jpg",
    "/blog/images/pexels-ocean-19947936.jpg",
    "/blog/images/pexels-oktay-koseoglu-42034955-37644602.jpg",
    "/blog/images/pexels-olly-3768095.jpg",
    "/blog/images/pexels-pavel-danilyuk-6812435.jpg",
    "/blog/images/pexels-pavel-danilyuk-7654190.jpg",
    "/blog/images/pexels-planespotter-geneva-1877406873-29894746.jpg",
    "/blog/images/pexels-railgunbreaker-38876606.jpg",
    "/blog/images/pexels-rrodriguesim-16108899.jpg",
    "/blog/images/pexels-zhicheng-zhang-312594413-38809871.jpg",
    "/blog/images/riyadh-airport-layover.jpg",
    "/blog/images/ultimate-jeddah-layover-guide.jpg",
    "/blog/ar/rss.xml",
    "/blog/ar/blog/*",
    "/blog/ar/cities/jeddah",
    "/blog/ar/cities/riyadh",
    "/blog/ar/cities/dammam",
    "/blog/ar/cities/al-khobar",
    "/blog/ar/cities/jazan",
    "/blog/ar/cities/al-madinah",
    "/blog/robots.txt",
    "/blog/rss.xml",
    "/blog/blog/*",
    "/blog/cities/jeddah",
    "/blog/cities/riyadh",
    "/blog/cities/dammam",
    "/blog/cities/al-khobar",
    "/blog/cities/jazan",
    "/blog/cities/al-madinah"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "C:\\Users\\20190026516\\wfrlee-blog\\.wrangler\\tmp\\pages-8EkC1N\\bundledWorker-0.7133894344814564.mjs";
import { isRoutingRuleMatch } from "C:\\Users\\20190026516\\wfrlee-blog\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
export * from "C:\\Users\\20190026516\\wfrlee-blog\\.wrangler\\tmp\\pages-8EkC1N\\bundledWorker-0.7133894344814564.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=6xoul2yrko.js.map
