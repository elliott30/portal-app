export function PageConfig(pageName: string, colorHex: string) {
  const pageConfig = JSON.stringify({
    "name": pageName,
    "htmlTitle": "test",
    "authorName": "Elliott Chapman",
    "slug": "carrot",
    "templatePath": "@hubspot/compass_theme/templates/compass_-_consultation.html",
    "themeSettingsValues": {
      "colors": {
        "primary_color": {
          "color": colorHex,
          // "color": "#FFF",
          "opacity": 100
        }
      }
    },
    "layoutSections": {/*
    "dnd__banner": {
      "cells": [],
      "cssClass": "",
      "cssId": "",
      "cssStyle": "",
      "label": "Banner",
      "name": "dnd__banner",
      "params": {},
      "rowMetaData": [
        {
          "cssClass": "dnd-section",
          "styles": {
            "backgroundImage": {
              "backgroundPosition": "MIDDLE_CENTER",
              "backgroundSize": "cover",
              "imageUrl": "https://7476511.fs1.hubspotusercontent-na1.net/hubfs/7476511/Zoned-Energy-Rating-Label-Image.jpg"
            },
            "forceFullWidthSection": false,
            "maxWidthSectionCentering": 940
          }
        }
      ],
      "rows": [
        {
          "0": {
            "cells": [],
            "cssClass": "",
            "cssId": "",
            "cssStyle": "",
            "name": "dnd__banner-column-1",
            "params": {
              "css_class": "dnd-column"
            },
            "rowMetaData": [
              {
                "cssClass": "dnd-row"
              }
            ],
            "rows": [
              {
                "0": {
                  "cells": [],
                  "cssClass": "",
                  "cssId": "",
                  "cssStyle": "",
                  "name": "dnd__banner-column-2",
                  "params": {
                    "css_class": "dnd-column"
                  },
                  "rowMetaData": [
                    {
                      "cssClass": "dnd-row"
                    },
                    {
                      "cssClass": "dnd-row"
                    }
                  ],
                  "rows": [
                    {
                      "0": {
                        "cells": [],
                        "cssClass": "",
                        "cssId": "",
                        "cssStyle": "",
                        "name": "dnd__banner-module-3",
                        "params": {
                          "css_class": "dnd-module",
                          "extra_classes": "widget-type-rich_text",
                          "html": "<h1>Start your Application Today</h1>\n<p>Tell people a little about what you're offering and the value you'll offer them.</p>",
                          "path": "@hubspot/rich_text",
                          "schema_version": 2,
                          "smart_objects": [],
                          "smart_type": "NOT_SMART",
                          "styles": {},
                          "wrap_field_tag": "div"
                        },
                        "rowMetaData": [],
                        "rows": [],
                        "type": "custom_widget",
                        "w": 12,
                        "x": 0
                      }
                    },
                    {
                      "0": {
                        "cells": [],
                        "cssClass": "",
                        "cssId": "",
                        "cssStyle": "",
                        "name": "dnd__banner-module-4",
                        "params": {
                          "button_text": "Get Started",
                          "css_class": "dnd-module",
                          "link": {
                            "no_follow": false,
                            "open_in_new_tab": false,
                            "rel": "",
                            "sponsored": false,
                            "url": {
                              "href": "#schedule-call",
                              "type": "EXTERNAL"
                            },
                            "user_generated_content": false
                          },
                          "path": "@hubspot/button",
                          "schema_version": 2,
                          "smart_objects": [],
                          "smart_type": "NOT_SMART",
                          "styles": {},
                          "wrap_field_tag": "div"
                        },
                        "rowMetaData": [],
                        "rows": [],
                        "type": "custom_widget",
                        "w": 12,
                        "x": 0
                      }
                    }
                  ],
                  "styles": {
                    "verticalAlignment": "MIDDLE"
                  },
                  "type": "cell",
                  "w": 6,
                  "x": 0
                }
              }
            ],
            "styles": {
              "verticalAlignment": "MIDDLE"
            },
            "type": "cell",
            "w": 12,
            "x": 0
          }
        }
      ],
      "type": "cell",
      "w": 12,
      "x": 0
    },
    "dnd__header": {
      "cells": [],
      "cssClass": "",
      "cssId": "",
      "cssStyle": "",
      "label": "Header",
      "name": "dnd__header",
      "params": {},
      "rowMetaData": [
        {
          "cssClass": "dnd-section",
          "styles": {
            "forceFullWidthSection": false,
            "maxWidthSectionCentering": 940
          }
        }
      ],
      "rows": [
        {
          "0": {
            "cells": [],
            "cssClass": "",
            "cssId": "",
            "cssStyle": "",
            "name": "dnd__header-module-1",
            "params": {
              "css_class": "dnd-module",
              "extra_classes": "widget-type-logo",
              "img": {
                "alt": "logo",
                "height": 50,
                "override_inherited_src": true,
                "src": "https://7476511.fs1.hubspotusercontent-na1.net/hubfs/7476511/logo.png",
                "width": 173
              },
              "path": "@hubspot/logo",
              "schema_version": 2,
              "smart_objects": [],
              "smart_type": "NOT_SMART",
              "styles": {},
              "wrap_field_tag": "div"
            },
            "rowMetaData": [],
            "rows": [],
            "type": "custom_widget",
            "w": 12,
            "x": 0
          }
        }
      ],
      "type": "cell",
      "w": 12,
      "x": 0
    } */
    },
    "categoryId": 1,
    "contentTypeCategory": 1,
    "pageRedirected": false,
    "publicAccessRulesEnabled": false,
    "archived": false,
    "publishImmediately": true,
    "published": true,
    "state": "PUBLISHED_OR_SCHEDULED",
    "currentState": "PUBLISHED",
    "subcategory": "landing_page",
    "useFeaturedImage": false,
    "widgetContainers": {},
    "widgets": {}
  });

  return pageConfig

};


