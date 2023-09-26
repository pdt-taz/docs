//Meta Information
import _ from 'lodash'
import tabsPlugin from '@snippetors/vuepress-plugin-tabs';
import { feedPlugin } from "vuepress-plugin-feed2";
import { containerPlugin } from '@vuepress/plugin-container';
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { path } from '@vuepress/utils'
//import autoMetaPlugin from "vuepress-plugin-autometa";  // This plugin may not be compatible with Vue2.  Need to check Meta tags to see if they are same as 1.x versions.
// HTML Redirect doesn't have a Vue2 option yet and V1 doesn't work
//import htmlRedirect from '@vuepress/plugin-html-redirect';

const autometa_options = {
    site: {
        name   : 'Rundeck / Process Automation Documentation',
        twitter: 'rundeck',
    },
    canonical_base: 'https://docs.rundeck.com',
}

function getPlugins(setup) {
    const plugins = [
        tabsPlugin([""]),
        feedPlugin({
            hostname: 'docs.rundeck.com',
            rss: true,
            json: true,
            sort:  entries => _.reverse( _.sortBy( entries, 'date' ) )
        }),
        containerPlugin(
            {
                type: 'deprecated',
                defaultTitle: {
                '/':'Deprecation Warning'
                },
            }, 
            {
                type: 'enterprise',
                defaultTitle: {
                '/':'Available in PagerDuty Process Automation Commercial products.'
                },
            },
            {
                type: 'tutorial',
                defaultTitle: {
                '/':'This tutorial is based on example code in the Welcome Projects.'
                },
            },
            {
                type: 'incubating',
                defaultTitle: {
                '/':'Incubating: This Feature or API is new! We may still have a few bugs or change some functionality in the future.'
                },
            },
            {
                type: 'betafeature',
                defaultTitle: {
                '/':'BETA FEATURE'
                },
            }
        ),
        copyCodePlugin({
            trimContent: true,
            selector: 'div[class*="language-"], extra-class',
            backgroundColor: '#383e4a'
        }),
        '@vuepress/register-components',
            {
                componentsDir: path.resolve(__dirname, './components'),
            },
            docsearchPlugin({
                // options
                locales: {
                    '/': {
                      placeholder: 'Search Documentation',
                      translations: {
                        button: {
                          buttonText: 'Search Documentation',
                        },
                      },
                    }
                },
                appId: 'GRSXNRCDRG',
                apiKey: 'c463f74d6f36a5af808650e0f69aadfa',
                indexName: 'prod_rundeck_docs',
                searchParameters: {
                    hitsPerPage: 10,
                    facetFilters: [ `version:${setup.base}` ]
                },
              }),
    //    autoMetaPlugin(autometa_options),
    //    htmlRedirect({
    //     countdown: 0,
    //    })
        ]

    // if (setup.base) {
    //     plugins.unshift([
    //         pwaPlugin(
    //         {
    //             serviceWorker: true,
    //             updatePopup: { 
    //                 message: "We updated some pages! Click this to see the latest docs.", 
    //                 buttonText: "Refresh Now" 
    //             },
    //             generateSWConfig: {
    //                 globIgnores: ['**/gtm.js']
    //             }
    //         })
    //     ]);
    // }

    return plugins;
}


export default getPlugins
