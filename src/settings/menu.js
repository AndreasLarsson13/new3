const menuData = [
    {
        slug: "hushall",
        child: [
            {
                slug: "braskaminer",
                child: [
                    {
                        slug: "taljstenskaminer",
                        subChildItems: ["tillbehor-taljstenskaminer"], // Add subchildren here
                    },
                    {
                        slug: "kaminer",
                        subChildItems: ["tillbehor-kaminer"], // Add subchildren here
                    },
                    {
                        slug: "eldstader/murspis", // No subChildItems here
                    },
                    {
                        slug: "gjutjarnskaminer", // No subChildItems here
                    },
                ],
            },

            {
                slug: "varmepumpar",
                child: [
                    {
                        slug: "luftvarmepumpar",
                    },
                    {
                        slug: "franluftvarmepump",
                    },
                    {
                        slug: "bergvarmepumpar",
                    },
                    {
                        slug: "jordvarmepump",
                    },
                    {
                        slug: "AC",
                    },
                ],
            },

            {
                slug: "ventilation",
                child: [
                    {
                        slug: "ftx-aggregat",
                    },
                    {
                        slug: "mekaniskventilation",
                    },
                    {
                        slug: "friflode-sjalvdrag",
                    }
                ],
            },
            {
                slug: "golvvärme",
            },
            {
                slug: "vvs",
                child: [
                    {
                        slug: "kranar/blandare",
                    },
                    {
                        slug: "handfat/badkar",
                    },
                    {
                        slug: "spabad/badtunnor", // No subChildItems here
                    },
                    {
                        slug: "toastolar", // No subChildItems here
                    },
                ],
            },
            {
                slug: "sol/lagring/elbil",
                child: [
                    {
                        slug: "solsystem",
                    },
                    {
                        slug: "batterier",
                    },
                    ,
                    {
                        slug: "elbilsladdning",
                    }
                ],
            },
            {
                slug: "byggvaror",
                child: [
                    {
                        slug: "fonster",
                    },
                    {
                        slug: "takstegar",
                    }
                ],
            },
            {
                slug: "inredning",
                child: [
                    {
                        slug: "koksinredning",
                    },
                    {
                        slug: "badrumsinredning",
                    },
                    {
                        slug: "garderob/forvaring",
                    }
                    ,
                    {
                        slug: "hallinredning",
                    }
                    ,
                    {
                        slug: "vardagsrumsinrening",
                    }
                ],
            },

            {
                slug: "vitvaror",
                child: [
                    {
                        slug: "kylar",
                    },
                    {
                        slug: "frysar",
                    },
                    {
                        slug: "vinkylar",
                    }
                    ,
                    {
                        slug: "diskmaskiner",
                    }
                    ,
                    {
                        slug: "frysboxar",
                    }
                    ,
                    {
                        slug: "kombineradkyl/frys",
                    }
                    ,
                    {
                        slug: "flaktar",
                    }
                    ,
                    {
                        slug: "tvattmaskiner",
                    }
                    ,
                    {
                        slug: "torktumlare",
                    }
                    ,
                    {
                        slug: "microugn",
                    }
                    ,
                    {
                        slug: "hallar",
                    }
                    ,
                    {
                        slug: "ugnar",
                    }
                ],

            },


        ],
    },
    {
        slug: "fritid",
        child: [
            {
                slug: "bastu",
                child: [
                    {
                        slug: "elektiskt/bastupriser",
                    },
                    {
                        slug: "vedeldade/bastuspisar",
                    },
                    {
                        slug: "tillbehor",
                    }
                    ,
                    {
                        slug: "bastu-inredning",
                    }
                    ,
                    {
                        slug: "bastu-stugor",
                    }
                ],

            },
            {
                slug: "forfon/atv",
                child: [
                    {
                        slug: "atv/utv",
                    },
                    {
                        slug: "snoskoter",
                    },
                    {
                        slug: "elsparkcyklar",
                    }
                    ,
                    {
                        slug: "elcyklar",
                    }
                    ,
                    {
                        slug: "cyklar",
                    }
                    ,
                    {
                        slug: "mopeder",
                    }
                    ,
                    {
                        slug: "mopedbilar",
                    }
                ],

            },
            {
                slug: "batar/marin",
                child: [
                    {
                        slug: "plotter/ekolod",
                    },
                    {
                        slug: "radar",
                    },
                    {
                        slug: "roddbat",
                    }
                    ,
                    {
                        slug: "jetskis",
                    }
                    ,
                    {
                        slug: "bryggor",
                    }
                    ,
                    {
                        slug: "flytvastar",
                    }

                ],

            },
            {
                slug: "fiske",
                child: [
                    {
                        slug: "fiskespon",
                    },
                    {
                        slug: "fiskerulle",
                    },
                    {
                        slug: "fiskedrag",
                    }
                    ,
                    {
                        slug: "ekolod",
                    }
                    ,
                    {
                        slug: "trollingmotor",
                    }
                    ,
                    {
                        slug: "fiskeklader",
                    }

                ],

            },
        ],
    },
    {
        slug: "sport",
        child: [
            {
                slug: "golf",
                child: [
                    {
                        slug: "golfbollar",
                    },
                    {
                        slug: "golfklubbor",
                    },
                    {
                        slug: "utrustning",
                    }
                    ,
                    {
                        slug: "golfklader",
                    }
                ],

            },
            {
                slug: "sportklader",
                child: [
                    {
                        slug: "traningsklader",
                    },
                    {
                        slug: "golfklader",
                    }
                ],

            },
            {
                slug: "alpin",
                child: [
                    {
                        slug: "langdskidor",
                    },
                    {
                        slug: "skidor",
                    }

                ],

            },
            {
                slug: "fotboll",
                child: [
                    {
                        slug: "fotbollar",
                    },
                    {
                        slug: "fotbollsklader",
                    },
                    {
                        slug: "fotbollskor",
                    }

                ],

            },
            {
                slug: "hockey",
                child: [
                    {
                        slug: "hockeyutrustning",
                    },
                    {
                        slug: "skridskor",
                    },
                    {
                        slug: "klubbor",
                    }

                ],

            },
        ],
    },
];

let menu = [];

menuData.forEach((element, index) => {
    let columnGroups = [];
    let currentGroup = [];
    let itemCount = 0;

    element.child.forEach((child, childIndex) => {
        const columnItem = {
            id: childIndex + 1,
            path: `/search?q=${child.slug}`,
            label: child.slug,
            columnItemItems: child.child
                ? child.child.map((subChild, subChildIndex) => ({
                    id: subChildIndex + 1,
                    path: `/search?q=${subChild.slug}`,
                    label: subChild.slug,
                    subMenu: subChild.subChildItems
                        ? subChild.subChildItems.map((subSubChild, subSubChildIndex) => ({
                            id: subSubChildIndex + 1,
                            path: `/search?q=${subSubChild}`,
                            label: subSubChild,
                        }))
                        : [],
                }))
                : [],
        };

        currentGroup.push(columnItem);

        // Count the total number of columnItemItems
        itemCount += columnItem.columnItemItems.length;

        // If itemCount exceeds 12, create a new column
        if (itemCount >= 7) {
            columnGroups.push({
                id: columnGroups.length + 1,
                columnItems: [...currentGroup],
            });
            currentGroup = [];
            itemCount = 0; // Reset item count for the next group
        }
    });

    // Add the remaining items if they are less than 12
    if (currentGroup.length > 2) {
        columnGroups.push({
            id: columnGroups.length + 1,
            columnItems: [...currentGroup],
        });
    }

    // Create the final menu structure
    const menuItem = {
        id: index + 1, // Unique ID for each menu item
        path: `/search?q=${element.slug}`, // Generate path from slug
        label: element.slug, // Use slug as label
        columns: columnGroups, // Push the groups into columns
    };

    menu.push(menuItem);
});

// Export the menu data
export default menu;
