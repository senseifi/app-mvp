import { Metaport } from "@skalenetwork/metaport";

export default function buildMetaport(staging = true) : Metaport {
    if (staging) {
        return new Metaport({
            openOnLoad: false, // Open Metaport on load (optional, default = false)
            skaleNetwork: 'staging3', // SKALE network that will be used - mainnet or staging (optional, defualt = mainnet)  
            mainnetEndpoint: "https://endpoints.omniatech.io/v1/eth/goerli/public",
            chains: [
                'mainnet', // List of SKALE Chains that will be available in the Metaport UI (default = [])
                'staging-legal-crazy-castor',
                'staging-utter-unripe-menkar',
                'staging-faint-slimy-achird'
            ],
            chainsMetadata: { // Chain name aliases that will be displayed in the UI (optional, defualt = {})
                'staging-legal-crazy-castor': {
                    alias: 'Europa SKALE Chain', // optional
                    minSfuelWei: '27000000000000', // optional
                    faucetUrl: 'https://sfuel.dirtroad.dev', // optional,
                    
                },
                'staging-utter-unripe-menkar': {
                    alias: 'Calypso SKALE Chain',
                    minSfuelWei: '27000000000000', // optional
                    faucetUrl: 'https://sfuel.dirtroad.dev' // optional
                },
                'staging-faint-slimy-achird': {
                    alias: 'Nebula SKALE Chain',
                    minSfuelWei: '27000000000000', // optional
                    faucetUrl: 'https://sfuel.dirtroad.dev' // optional
                },
            },
            tokens: {
                'mainnet': {
                    'eth': {
                        'chains': [
                            'staging-legal-crazy-castor'
                        ]
                    },
                    'erc20': {
                        '_SKL_0x493D4442013717189C9963a2e275Ad33bfAFcE11': {
                            'name': 'SKL',
                            'address': '0x493D4442013717189C9963a2e275Ad33bfAFcE11',
                            'symbol': 'SKL'
                        }
                    }
                },
                'staging-utter-unripe-menkar': {
                    'erc721': {
                        '_TANK_0x4aaa1bb85d9339811b65566fa1aae11a8a9db28d': {
                            name: 'TANK',
                            address: '0xd29a08E708319bA387b5Ab6446483D55E2Ba5b6c',
                            symbol: 'TANK', // token symbol
                            iconUrl: '/favicon-32x32-png'
                        }
                    }
                },
                'staging-legal-crazy-castor': {
                    'erc20': { 
                        '_ETH_0xa270484784f043e159f74C03B691F80B6F6e3c24': { // wrapper token
                            name: 'ETH', // wrapper token display name
                            address: '0xa270484784f043e159f74C03B691F80B6F6e3c24', // wrapper token address
                            symbol: 'ETH',
                            iconUrl: "https://ruby.exchange/images/tokens/eth-square.jpg",
                            wraps: { // token that needs to be wrapped
                                iconUrl: "https://ruby.exchange/images/tokens/eth-square.jpg",
                                address: '0xD2Aaa00700000000000000000000000000000000', // unwrapped token address
                                symbol: 'ETHC', // unwrapped token symbol
                            }
                        },
                        "_SKL_0x6a679eF80aF3fE01A646F858Ca1e26D58b5430B6": {
                            name: "SKL",
                            symbol: "SKL",
                            address: "0x6a679eF80aF3fE01A646F858Ca1e26D58b5430B6",
                            iconUrl: 'https://ruby.exchange/images/tokens/skl-square.jpg',
                            wraps: { // token that needs to be wrapped
                                address: '0xbA1E9BA7CDd4815Da6a51586bE56e8643d1bEAb6', // unwrapped token address
                                symbol: 'SKL', // unwrapped token symbol
                                iconUrl: 'https://ruby.exchange/images/tokens/skl-square.jpg',
                            }
                        },
                        "_USDC_0x4f250cCE5b8B39caA96D1144b9A32E1c6a9f97b0": {
                            name: "USDC",
                            symbol: "USDC",
                            address: "0x4f250cCE5b8B39caA96D1144b9A32E1c6a9f97b0",
                            iconUrl: 'https://ruby.exchange/images/tokens/usdc-square.jpg',
                            wraps: { // token that needs to be wrapped
                                address: '0x5d42495D417fcd9ECf42F3EA8a55FcEf44eD9B33', // unwrapped token address
                                symbol: 'USDC', // unwrapped token symbol
                                iconUrl: 'https://ruby.exchange/images/tokens/usdc-square.jpg',
                            }
                        }
                    }
                }
            },
            theme: { // custom widget theme (default = dark SKALE theme)
                primary: '#FFF', // primary accent color for action buttons
                background: '#154229', // background color
                mode: 'dark' // theme type - dark or light
            }
        });
    } else {
        console.log("MAinnet: ");
        return new Metaport({
            openOnLoad: false, // Open Metaport on load (optional, default = false)
            // skaleNetwork: 'mainnet', // SKALE network that will be used - mainnet or staging (optional, defualt = mainnet)  
            mainnetEndpoint: "https://eth.llamarpc.com",
            chains: [
                'mainnet', // List of SKALE Chains that will be available in the Metaport UI (default = [])
                'elated-tan-skat',
                'honorable-steel-rasalhague',
                'green-giddy-denebola'
            ],
            chainsMetadata: { // Chain name aliases that will be displayed in the UI (optional, defualt = {})
                'elated-tan-skat': {
                    alias: 'Europa SKALE Chain', // optional
                    minSfuelWei: '27000000000000', // optional
                    faucetUrl: 'https://sfuel.dirtroad.dev', // optional,
                    
                },
                'honorable-steel-rasalhague': {
                    alias: 'Calypso SKALE Chain',
                    minSfuelWei: '27000000000000', // optional
                    faucetUrl: 'https://sfuel.dirtroad.dev' // optional
                },
                'green-giddy-denebola': {
                    alias: 'Nebula SKALE Chain',
                    minSfuelWei: '27000000000000', // optional
                    faucetUrl: 'https://sfuel.dirtroad.dev' // optional
                },
            },
            tokens: {
                'mainnet': {
                    'eth': {
                        'chains': [
                            'elated-tan-skat'
                        ]
                    }
                    // 'erc20': {
                    //     '_SKL_0x493D4442013717189C9963a2e275Ad33bfAFcE11': {
                    //         'name': 'SKL',
                    //         'address': '0x493D4442013717189C9963a2e275Ad33bfAFcE11',
                    //         'symbol': 'SKL'
                    //     }
                    // }
                },
                // 'staging-utter-unripe-menkar': {
                //     'erc721': {
                //         '_TANK_0x4aaa1bb85d9339811b65566fa1aae11a8a9db28d': {
                //             name: 'TANK',
                //             address: '0xd29a08E708319bA387b5Ab6446483D55E2Ba5b6c',
                //             symbol: 'TANK', // token symbol
                //             iconUrl: '/favicon-32x32-png'
                //         }
                //     }
                // },
                'elated-tan-skat': {
                    'erc20': { 
                        '_ETH_0xa5274efA35EbeFF47C1510529D9a8812F95F5735': { // wrapper token
                            name: 'ETH', // wrapper token display name
                            address: '0xa5274efA35EbeFF47C1510529D9a8812F95F5735', // wrapper token address
                            symbol: 'ETH',
                            iconUrl: "https://ruby.exchange/images/tokens/eth-square.jpg",
                            wraps: { // token that needs to be wrapped
                                iconUrl: "https://ruby.exchange/images/tokens/eth-square.jpg",
                                address: '0xD2Aaa00700000000000000000000000000000000', // unwrapped token address
                                symbol: 'ETHC', // unwrapped token symbol
                            }
                        },
                        "_SKL_0xD162bB5c75FE99144295b03510bAb2DF99617440": {
                            name: "SKL",
                            symbol: "SKL",
                            address: "0xD162bB5c75FE99144295b03510bAb2DF99617440",
                            iconUrl: 'https://ruby.exchange/images/tokens/skl-square.jpg',
                            wraps: { // token that needs to be wrapped
                                address: '0xE0595a049d02b7674572b0d59cd4880Db60EDC50', // unwrapped token address
                                symbol: 'SKL', // unwrapped token symbol
                                iconUrl: 'https://ruby.exchange/images/tokens/skl-square.jpg',
                            }
                        },
                        "_USDC_0x1c566a47e1baC535Ca616373146e3BE024F88Aa4": {
                            name: "USDC",
                            symbol: "USDC",
                            address: "0x1c566a47e1baC535Ca616373146e3BE024F88Aa4",
                            iconUrl: 'https://ruby.exchange/images/tokens/usdc-square.jpg',
                            wraps: { // token that needs to be wrapped
                                address: '0x5F795bb52dAC3085f578f4877D450e2929D2F13d', // unwrapped token address
                                symbol: 'USDC', // unwrapped token symbol
                                iconUrl: 'https://ruby.exchange/images/tokens/usdc-square.jpg',
                            }
                        }
                    }
                }
            },
            theme: { // custom widget theme (default = dark SKALE theme)
                primary: '#000', // primary accent color for action buttons
                background: '#154229', // background color
                mode: 'light' // theme type - dark or light
            }
        });
    }
}