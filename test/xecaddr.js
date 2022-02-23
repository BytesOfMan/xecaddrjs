/***
 * @license
 * https://github.com/ealmansi/xecaddrjs
 * Copyright (c) 2018-2020 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

const assert = require('chai').assert
const xecaddr = require('..')

describe('xecaddr', function () {
  const LEGACY_MAINNET_P2PKH_ADDRESSES = [
    '1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR',
    '185K5yAfcrARrHjNVt4iAUHtkYqcogF4km',
    '1EUrmffDt4SQQkGVfmDTyFcp57PuByeadW',
    '1H6YWsFBxvDx6Ce9dyUFZvjG29npxQpBpR',
    '15z9kQvBaZmTGRTRbP3K1VBM3BQvRsj4U4',
    '1P238gziZdeS5Wj9nqLhQHSBK2Lz6zPSke',
    '13WamBttqMB9AHNovKBCeLFGC5sbN4iZkh',
    '17Sa1fdVXh2NVgcn5xoWzTLGNivg9gUDQ7',
    '1tQ2P2q5cVERY8AkGD4K8RGc6NmZQVTKN',
    '1FJSGaq7Wip2ADSJboxMXniPhnYM8ym5Ri',
    '1GxjvJnjF6t29gDnX4jF3u25u5JRqANYPV',
    '1N7gqB2GtgJG8ap3uwRoKyrcrrSTa4qfXu',
    '1JG6fXqEiu9H2fktGxqpFfGGLdy6ie7QgY',
    '14ipzRgYAbSZUnmeRNhhrPMQ8XQrzGg4wo',
    '185FScTRCtVXRoy5gSDbuLnnQaQWqCK4A1',
    '1NPRQpCNaeVvZLYw6Z3Y1XkKxLt9BrFTn5',
    '1Pa8bRApFwCZ8rkgCJh9mfUmj4XJMUYdom',
    '13HmTnwyKacGJCt2WseTReCeEAtG5ZAyci',
    '1Mdob5JY1yuwoj6y76Vf3AQpoqUH5Aft8z',
    '1D8zGeRj3Vkns6VwKxwNoW2mDsxF25w2Zy'
  ]

  const LEGACY_MAINNET_P2SH_ADDRESSES = [
    '3BqVJRg7Jf94yJSvj2zxaPFAEYh3MAyyw9',
    '38mL1Wf7AkUowTRocyjJb6epu58LSafEYf',
    '3FAshD9fRxknVuxvnrt4PsykDdgckmK7xD',
    '3HnZSQjdWpYLBNLam58qzZ6CAg5YXBddBW',
    '36gAfxQd8U5qMb9riUhuS7YHBhhdvjr8u1',
    '3Pi44EVA7XxpAgRauw1Hpuo7TYdhd7WMon',
    '34CbgjPLPFVXFT5F3Qqo4xcCLcAJwvkM85',
    '388awD7w5bLkarKDD4U7R5hCXFDPmHuWW7',
    '32aQwvXGdWocWhpbsMsejknCkcfVB4ivTM',
    '3FzTC8KZ4d8QFP8jiucwxR5KrJq4bcevn7',
    '3HekqrHAo1CQEqvDeAPqUXP23bb9Sf9WoA',
    '3NohkiWiSaceDkWV336PkcDZ1NjBBWBewT',
    '3Jx7b5KgGoTf7qTKQ4WQgHdCVAFpCKiqsB',
    '35QquyAyiVkwZxU5YUNJH1iLH3haZ5TEfC',
    '38mGN9wrknouWyfWoXtCKy9iZ6hEMRGsyp',
    '3P5SLMgp8YpJeWFNDei8SA7G6sArkNKQKL',
    '3QG9WxfFoqWwE2T7KQMkCHqhsap1waSfDu',
    '33ynPLSQsUvePNaTdyK3rGZaNhAyfeAmbT',
    '3NKpWcnyZtEKttoQECAFTnmkxMkzgbT4WX',
    '3Dq1CBvAbQ5AxGCNT4byE8PhNQExZcR6Q2'
  ]

  const LEGACY_TESTNET_P2PKH_ADDRESSES = [
    'mqfRfwGeZnFwfFE7KWJjyg6Yx212iGi6Fi',
    'mnbGP2FeRsbgdQCzDT35zPWDcYSKm4wrcg',
    'mtzp4ikCh5sfBrk7PLBqoAq8w6zc48PsGn',
    'mwcVovLAmwfCsK7mMYSdPqwat9PXqcMiFt',
    'mkW73U1APbCi3Xw3Jx1gqQPfuB1dHFDiEU',
    'n3XzRk5hNf5grdCmWQK5ECeWB1wgzzYzZd',
    'mi2Y4EyseNcPwPrRdt9aUFTb45UJHNgtbL',
    'mmxXJiiULiTdGo6PoXmtpNYbEiXP2v746S',
    'mgQMKS7otdvVCebnTqBS93dbU5yUZPsANB',
    'mupPZdv6KkFGwKuvKNvjMhviZn93yznq73',
    'mwUhDMsi48KGvnhQEdhcspEQm4u8o754bx',
    'n2de8E7FhhjWuhHfdWQB9u4wir3AXqspCt',
    'mxn3xavDXvaXonEVzXpC5aUbCdZoaTEB2g',
    'mjEnHUmWycspFuFG8wg5gJZizX1ZtEF1XN',
    'mnbCjfYQ1uvnCvShQ1ByjG17Ga1Dk3RTXN',
    'n2uNhsHMPfwBLT2Yp81uqSxepLUr6zCnCz',
    'n465tUFo4xdouyEHusfXbah6b481K5Nivk',
    'mhoikr2x8c3X5KMeEScqFZQy6AUy4GeR4M',
    'n29kt8PWq1MCaqaapfU2s5d9fq4yytS1xJ',
    'msewZhWhrXC3eCyZ3XukdRF65sYwtbmARy'
  ]

  const LEGACY_TESTNET_P2SH_ADDRESSES = [
    '2N3PhNAc8v7eRB65UQAcqCLERStuD93JXLD',
    '2MzKY5Fb8nCzA9F4MJ7MBD3e67RLWFE1ciP',
    '2N6j5kx5h3RG8hhbUTzVw1py1RytnZNYoXo',
    '2N9LmW9ff8H3gP9y8SCkicW5TP2HiFpeK4z',
    '2MxENjhLejvbBZNnQPcKn44XYQ3uoiBT3fF',
    '2NFGG7yRBizUANU48b4dASrnNftqsNwzSM1',
    '2MukokUKMzhzsTEhniYTfgubTYxNUi6PtTX',
    '2Mygnzx3xh3r6ndwktC5z32gTjbRZXkJpFr',
    '2Mt8d1fTJEyJxiVT9YVVXMhmTxxsexLdJiE',
    '2N7YfFsFag5dkTAmHQ3EpaN4b4f3EPkwQkk',
    '2N9CxubDCQThkSdYmKJ1i6UNHFwoKBxp2Hj',
    '2NEMupTSk437zRY92iAiGNZCpDiwLvwnZEL',
    '2NAWKepFhtFy1Kd5s5C8HJEcThWTyzKiNGA',
    '2Mvy3yi71KxGHmk6dDbzAtxhbVPukK6MD5u',
    '2MzKURtstNFKFimJ4UfW4wv8ymSuQCcZPN2',
    '2NEdeQ6cqk1KerHsutnL1476XKDP2agcCh5',
    '2NFpMahbHRJ2HRp5ezXycpEpy5w2BmnVM9W',
    '2MuXzT5NSUwRzbAD1K6vvUDYqb3P9RUvPgK',
    '2NDt2aMj1BLjg6gRwuKn85jm2AhyAV8e2VF',
    '2N5PDFvrCCraXA3pv8CDqr5NxakT8KJb3Gg'
  ]

  const BITPAY_MAINNET_P2PKH_ADDRESSES = [
    'CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj',
    'CPYCf1WjVu8xkRdoBdPdjyuvNg42oA7g3o',
    'CVwkLi1Hm7QwJtAvMWYPYmEqhEcK4KW3my',
    'CYZS5ubFqyCUzLYaKioB9SMHeH1Eno9teV',
    'CMT3KTGFTcjzAZMrH8NEazoNfJdLLwdA2P',
    'CeUvhjLnSgcxyedaUafcyo4Cw9ZPwGq9JJ',
    'CJyULEExiQ9g4RHEc4W8DqsHpD61DzD2KS',
    'CNuTahyZQjzuPpXCmi8SZxxHzr966Y3NWT',
    'CHMHbRNtxfTmKg2bS1Xyte3JEDbBZJdBDR',
    'CWmKqdBBPmnZ4MLjHZHH7JLRKukm2ZLsY3',
    'CYRdVM8o89rZ3p8DCp4AdQe7XCWqo98EJW',
    'CdaaQDNLmjGo2iiUbgkiuVUeUyesW7zuM3',
    'CZizEaBJbx7ovofJxiAjqAtHxmBWaYnQ8e',
    'CLBiZU2c3eR6Nvg5782dRtyRkedGxq5zep',
    'CPY91eoV5wU4KwsWNBYXUrQp2hcvm6nds4',
    'CdrJyrYSThUTTUTMnJNTb3NMaU6Z4RU7ZN',
    'Cf32ATWt8zB62zf6t425MB6oMBjiHc6XZf',
    'CJkf2qJ3CdaoCLnTCcyP19pfrJ6fyRmeF4',
    'Cd6hA7ebu2tUhs1Pnqpacg2rRxgh4RX3ij',
    'CUbsqgmnvYjKmEQN1iGJP1enr1Aet3jrNW'
  ]

  const BITPAY_MAINNET_P2SH_ADDRESSES = [
    'HGfbmE7C9yMjbUKxaif7YmmhGCi4FN8hzH',
    'HDbSUK6C24hUZdJqUfPTZVBMvj9MGEzYSY',
    'HKzzA1akHGyT85qxeYYDNGWHFHhddvQabB',
    'HNcfuDAiN8kzoYDccknzxwcjCL6ZLVoQNQ',
    'HBWH8kqhynJVym2taAN4QW4pDMiepA7r24',
    'HUYAX2vExrBUnrJcmcfSoJKeVCeiW7ZdQA',
    'H92i9XpREZiBscxGu6Vx3M8jNGBKqscBBB',
    'HCxhQ1Z1vuZRD2CF4k8GPUDjYuEQdZhDyJ',
    'H7QXQixMUq2H8shdj3Xoi9JjnGgW4UtQvF',
    'HLpZevkduwM4sZ1mabH6vobrsxr5XLQ9Xh',
    'HNUsJeiFeKR4s1oFVr3zSuuZ5FcAJ5fEvi',
    'HTdpDWwoHtqJqvPWtikYizk632kC3jeVq5',
    'HPnE3skm87gKk1LMFkAZeg9jWpGq5JcGD2',
    'HAExNmc4ZoycC8M7QA2TFQEsJhibS24Sff',
    'HDbNpxNwc72a99YYfDYMJMgFakiFCURWsc',
    'HTuYoA7tys2yGg8Q5LNHQYdo8XBsZkPfms',
    'HV6Fym6Lf9jbrCL9B61uAgNEuEq2mwoPKw',
    'H8otr8sVio9K1YTVVeyCpf67QMBzV5ieHM',
    'HT9vyRE4RCSzX4gS5spQSBJHz1n1ZBCcYM',
    'HJf7ezMFSiHqaS5QJkG8CWvEQ4FyTTnjMB'
  ]

  const BITPAY_TESTNET_P2PKH_ADDRESSES = [
    'mqfRfwGeZnFwfFE7KWJjyg6Yx212iGi6Fi',
    'mnbGP2FeRsbgdQCzDT35zPWDcYSKm4wrcg',
    'mtzp4ikCh5sfBrk7PLBqoAq8w6zc48PsGn',
    'mwcVovLAmwfCsK7mMYSdPqwat9PXqcMiFt',
    'mkW73U1APbCi3Xw3Jx1gqQPfuB1dHFDiEU',
    'n3XzRk5hNf5grdCmWQK5ECeWB1wgzzYzZd',
    'mi2Y4EyseNcPwPrRdt9aUFTb45UJHNgtbL',
    'mmxXJiiULiTdGo6PoXmtpNYbEiXP2v746S',
    'mgQMKS7otdvVCebnTqBS93dbU5yUZPsANB',
    'mupPZdv6KkFGwKuvKNvjMhviZn93yznq73',
    'mwUhDMsi48KGvnhQEdhcspEQm4u8o754bx',
    'n2de8E7FhhjWuhHfdWQB9u4wir3AXqspCt',
    'mxn3xavDXvaXonEVzXpC5aUbCdZoaTEB2g',
    'mjEnHUmWycspFuFG8wg5gJZizX1ZtEF1XN',
    'mnbCjfYQ1uvnCvShQ1ByjG17Ga1Dk3RTXN',
    'n2uNhsHMPfwBLT2Yp81uqSxepLUr6zCnCz',
    'n465tUFo4xdouyEHusfXbah6b481K5Nivk',
    'mhoikr2x8c3X5KMeEScqFZQy6AUy4GeR4M',
    'n29kt8PWq1MCaqaapfU2s5d9fq4yytS1xJ',
    'msewZhWhrXC3eCyZ3XukdRF65sYwtbmARy'
  ]

  const BITPAY_TESTNET_P2SH_ADDRESSES = [
    '2N3PhNAc8v7eRB65UQAcqCLERStuD93JXLD',
    '2MzKY5Fb8nCzA9F4MJ7MBD3e67RLWFE1ciP',
    '2N6j5kx5h3RG8hhbUTzVw1py1RytnZNYoXo',
    '2N9LmW9ff8H3gP9y8SCkicW5TP2HiFpeK4z',
    '2MxENjhLejvbBZNnQPcKn44XYQ3uoiBT3fF',
    '2NFGG7yRBizUANU48b4dASrnNftqsNwzSM1',
    '2MukokUKMzhzsTEhniYTfgubTYxNUi6PtTX',
    '2Mygnzx3xh3r6ndwktC5z32gTjbRZXkJpFr',
    '2Mt8d1fTJEyJxiVT9YVVXMhmTxxsexLdJiE',
    '2N7YfFsFag5dkTAmHQ3EpaN4b4f3EPkwQkk',
    '2N9CxubDCQThkSdYmKJ1i6UNHFwoKBxp2Hj',
    '2NEMupTSk437zRY92iAiGNZCpDiwLvwnZEL',
    '2NAWKepFhtFy1Kd5s5C8HJEcThWTyzKiNGA',
    '2Mvy3yi71KxGHmk6dDbzAtxhbVPukK6MD5u',
    '2MzKURtstNFKFimJ4UfW4wv8ymSuQCcZPN2',
    '2NEdeQ6cqk1KerHsutnL1476XKDP2agcCh5',
    '2NFpMahbHRJ2HRp5ezXycpEpy5w2BmnVM9W',
    '2MuXzT5NSUwRzbAD1K6vvUDYqb3P9RUvPgK',
    '2NDt2aMj1BLjg6gRwuKn85jm2AhyAV8e2VF',
    '2N5PDFvrCCraXA3pv8CDqr5NxakT8KJb3Gg'
  ]

  const CASHADDR_MAINNET_P2PKH_ADDRESSES = [
    'bitcoincash:qph5kuz78czq00e3t85ugpgd7xmer5kr7c5f6jdpwk',
    'bitcoincash:qpxenfpcf975gxdjmq9pk3xm6hjmfj6re56t60smsm',
    'bitcoincash:qzfau6vrq980qntgp5e7l6cpfsf7jw88c5u7y85qx6',
    'bitcoincash:qzcguejjfxld867ck4zudc9a6y8mf6ftgqqrxzfmlh',
    'bitcoincash:qqm2lpqdfjsg8kkhwk0a3e3gypyswkd69urny99j70',
    'bitcoincash:qrccfa4qm3xfcrta78v7du75jjaww0ylnss5nxsy9s',
    'bitcoincash:qqdcsl6c879esyxyacmz7g6vtzwjjwtznsv65x6znz',
    'bitcoincash:qpr2ddwe8qnnh8h20mmn4zgrharmy0vuy5y4gr8gl2',
    'bitcoincash:qqymsmh0nhfhs9k5whhnjwfxyaumvtxm8g2z0s4f9y',
    'bitcoincash:qzwdmm83qjx7372wxgszaukan73ffn8ct54v6hs3dl',
    'bitcoincash:qzh3f9me5z5sn2w8euap2gyrp6kr7gf6my5mhjey6s',
    'bitcoincash:qrneuckcx69clprn4nnr82tf8sycqrs3ac4tr8m86f',
    'bitcoincash:qz742xef07g9w8q52mx0q6m9hp05hnzm657wqd0ce2',
    'bitcoincash:qq5dzl0drx8v0layyyuh5aupvxfs80ydmsp5444280',
    'bitcoincash:qpxedxtug7kpwd6tgf5vx08gjamel7sldsc40mxew8',
    'bitcoincash:qr4fs2m8tjmw54r2aqmadggzuagttkujgyrjs5d769',
    'bitcoincash:qrmed4fxlhkgay9nxw7zn9muew5ktkyjnuuawvycze',
    'bitcoincash:qqv3cpvmu4h0vqa6aly0urec7kwtuhe49yz6e7922v',
    'bitcoincash:qr39scfteeu5l573lzerchh6wc4cqkxeturafzfkk9',
    'bitcoincash:qzzjgw37vwls805c9fw6g9vqyupadst6wgmane0s4l'
  ]

  const CASHADDR_MAINNET_P2SH_ADDRESSES = [
    'bitcoincash:pph5kuz78czq00e3t85ugpgd7xmer5kr7crv8a2z4t',
    'bitcoincash:ppxenfpcf975gxdjmq9pk3xm6hjmfj6re5dw8qhctx',
    'bitcoincash:pzfau6vrq980qntgp5e7l6cpfsf7jw88c5tmegnra8',
    'bitcoincash:pzcguejjfxld867ck4zudc9a6y8mf6ftgqhxmdwcy2',
    'bitcoincash:pqm2lpqdfjsg8kkhwk0a3e3gypyswkd69u5ke2z39j',
    'bitcoincash:prccfa4qm3xfcrta78v7du75jjaww0ylns83wfh87d',
    'bitcoincash:pqdcsl6c879esyxyacmz7g6vtzwjjwtznsmlffapgl',
    'bitcoincash:ppr2ddwe8qnnh8h20mmn4zgrharmy0vuy5ns4vqtyh',
    'bitcoincash:pqymsmh0nhfhs9k5whhnjwfxyaumvtxm8ga8jlj27e',
    'bitcoincash:pzwdmm83qjx7372wxgszaukan73ffn8ct5zf8chjkz',
    'bitcoincash:pzh3f9me5z5sn2w8euap2gyrp6kr7gf6myr72a78pd',
    'bitcoincash:prneuckcx69clprn4nnr82tf8sycqrs3aczw7guyp5',
    'bitcoincash:pz742xef07g9w8q52mx0q6m9hp05hnzm65ftazgmzh',
    'bitcoincash:pq5dzl0drx8v0layyyuh5aupvxfs80ydmsk3g6jfuj',
    'bitcoincash:ppxedxtug7kpwd6tgf5vx08gjamel7slds0sj5p646',
    'bitcoincash:pr4fs2m8tjmw54r2aqmadggzuagttkujgy5hdm2apc',
    'bitcoincash:prmed4fxlhkgay9nxw7zn9muew5ktkyjnutcnrrmey',
    'bitcoincash:pqv3cpvmu4h0vqa6aly0urec7kwtuhe49y4ly3zf33',
    'bitcoincash:pr39scfteeu5l573lzerchh6wc4cqkxetu5c5dw4dc',
    'bitcoincash:pzzjgw37vwls805c9fw6g9vqyupadst6wgvcwkgnwz'
  ]

  const CASHADDR_TESTNET_P2PKH_ADDRESSES = [
    'bchtest:qph5kuz78czq00e3t85ugpgd7xmer5kr7csm740kf2',
    'bchtest:qpxenfpcf975gxdjmq9pk3xm6hjmfj6re57e7gjvh8',
    'bchtest:qzfau6vrq980qntgp5e7l6cpfsf7jw88c5cvqqkhpx',
    'bchtest:qzcguejjfxld867ck4zudc9a6y8mf6ftgqy3z9tvct',
    'bchtest:qqm2lpqdfjsg8kkhwk0a3e3gypyswkd69u8pqz89en',
    'bchtest:qrccfa4qm3xfcrta78v7du75jjaww0ylns5xhpjnzv',
    'bchtest:qqdcsl6c879esyxyacmz7g6vtzwjjwtznsggspc457',
    'bchtest:qpr2ddwe8qnnh8h20mmn4zgrharmy0vuy5q8vy9lck',
    'bchtest:qqymsmh0nhfhs9k5whhnjwfxyaumvtxm8gwsthh7zc',
    'bchtest:qzwdmm83qjx7372wxgszaukan73ffn8ct5377sjx2r',
    'bchtest:qzh3f9me5z5sn2w8euap2gyrp6kr7gf6mysfn4mnav',
    'bchtest:qrneuckcx69clprn4nnr82tf8sycqrs3ac3e8qesa4',
    'bchtest:qz742xef07g9w8q52mx0q6m9hp05hnzm656uy2d07k',
    'bchtest:qq5dzl0drx8v0layyyuh5aupvxfs80ydms9x3jhaqn',
    'bchtest:qpxedxtug7kpwd6tgf5vx08gjamel7sldsu8tuywfm',
    'bchtest:qr4fs2m8tjmw54r2aqmadggzuagttkujgy8q5n0fae',
    'bchtest:qrmed4fxlhkgay9nxw7zn9muew5ktkyjnuc02tx099',
    'bchtest:qqv3cpvmu4h0vqa6aly0urec7kwtuhe49yxgae8ads',
    'bchtest:qr39scfteeu5l573lzerchh6wc4cqkxetu80d9tp3e',
    'bchtest:qzzjgw37vwls805c9fw6g9vqyupadst6wgl0h7d8jr'
  ]

  const CASHADDR_TESTNET_P2SH_ADDRESSES = [
    'bchtest:pph5kuz78czq00e3t85ugpgd7xmer5kr7c87r6g4jh',
    'bchtest:ppxenfpcf975gxdjmq9pk3xm6hjmfj6re5fur840v6',
    'bchtest:pzfau6vrq980qntgp5e7l6cpfsf7jw88c50fa0356m',
    'bchtest:pzcguejjfxld867ck4zudc9a6y8mf6ftgqn5l2v0rk',
    'bchtest:pqm2lpqdfjsg8kkhwk0a3e3gypyswkd69usyadqxzw',
    'bchtest:prccfa4qm3xfcrta78v7du75jjaww0ylnsrr2w4se3',
    'bchtest:pqdcsl6c879esyxyacmz7g6vtzwjjwtznslddwlk0r',
    'bchtest:ppr2ddwe8qnnh8h20mmn4zgrharmy0vuy5hz3tzurt',
    'bchtest:pqymsmh0nhfhs9k5whhnjwfxyaumvtxm8ge4kcsae9',
    'bchtest:pzwdmm83qjx7372wxgszaukan73ffn8ct5xmrl4937',
    'bchtest:pzh3f9me5z5sn2w8euap2gyrp6kr7gf6my8vw6usx3',
    'bchtest:prneuckcx69clprn4nnr82tf8sycqrs3acxu607nxg',
    'bchtest:pz742xef07g9w8q52mx0q6m9hp05hnzm65dee92v9t',
    'bchtest:pq5dzl0drx8v0layyyuh5aupvxfs80ydmsjrvas7mw',
    'bchtest:ppxedxtug7kpwd6tgf5vx08gjamel7sldstzknrdjx',
    'bchtest:pr4fs2m8tjmw54r2aqmadggzuagttkujgys9fug2xy',
    'bchtest:prmed4fxlhkgay9nxw7zn9muew5ktkyjnu02hypv7c',
    'bchtest:pqv3cpvmu4h0vqa6aly0urec7kwtuhe49y3dqkq7kd',
    'bchtest:pr39scfteeu5l573lzerchh6wc4cqkxetus2s2vz2y',
    'bchtest:pzzjgw37vwls805c9fw6g9vqyupadst6wgg2232yf7'
  ]

  const XECADDR_MAINNET_P2PKH_ADDRESSES = [
    'ecash:qph5kuz78czq00e3t85ugpgd7xmer5kr7cdywekmgp',
    'ecash:qpxenfpcf975gxdjmq9pk3xm6hjmfj6re5rxwytpkv',
    'ecash:qzfau6vrq980qntgp5e7l6cpfsf7jw88c59nsv06qd',
    'ecash:qzcguejjfxld867ck4zudc9a6y8mf6ftgqewjfjpeq',
    'ecash:qqm2lpqdfjsg8kkhwk0a3e3gypyswkd69u67sw7gcc',
    'ecash:qrccfa4qm3xfcrta78v7du75jjaww0ylnsfe8dt7r8',
    'ecash:qqdcsl6c879esyxyacmz7g6vtzwjjwtzns4hqdpc44',
    'ecash:qpr2ddwe8qnnh8h20mmn4zgrharmy0vuy5acugujea',
    'ecash:qqymsmh0nhfhs9k5whhnjwfxyaumvtxm8gn0mmwnrn',
    'ecash:qzwdmm83qjx7372wxgszaukan73ffn8ct5vpwutttg',
    'ecash:qzh3f9me5z5sn2w8euap2gyrp6kr7gf6mydkrez7u8',
    'ecash:qrneuckcx69clprn4nnr82tf8sycqrs3acvxhvqau7',
    'ecash:qz742xef07g9w8q52mx0q6m9hp05hnzm658r5x5zla',
    'ecash:qq5dzl0drx8v0layyyuh5aupvxfs80ydmscep7wspc',
    'ecash:qpxedxtug7kpwd6tgf5vx08gjamel7sldspcmsargs',
    'ecash:qr4fs2m8tjmw54r2aqmadggzuagttkujgy6lylkyuj',
    'ecash:qrmed4fxlhkgay9nxw7zn9muew5ktkyjnu9s68lzyw',
    'ecash:qqv3cpvmu4h0vqa6aly0urec7kwtuhe49ymhd47svm',
    'ecash:qr39scfteeu5l573lzerchh6wc4cqkxetu6safjvsj',
    'ecash:qzzjgw37vwls805c9fw6g9vqyupadst6wgzs8j52ng'
  ]

  const XECADDR_MAINNET_P2SH_ADDRESSES = [
    'ecash:pph5kuz78czq00e3t85ugpgd7xmer5kr7c6pnk3cnu',
    'ecash:ppxenfpcf975gxdjmq9pk3xm6hjmfj6re55rntvzd3',
    'ecash:pzfau6vrq980qntgp5e7l6cpfsf7jw88c5jkdrgems',
    'ecash:pzcguejjfxld867ck4zudc9a6y8mf6ftgqwt0x4zza',
    'ecash:pqm2lpqdfjsg8kkhwk0a3e3gypyswkd69udmdpetr9',
    'ecash:prccfa4qm3xfcrta78v7du75jjaww0ylns7u6zvac6',
    'ecash:pqdcsl6c879esyxyacmz7g6vtzwjjwtznszjazxmwg',
    'ecash:ppr2ddwe8qnnh8h20mmn4zgrharmy0vuy52ap8m3zq',
    'ecash:pqymsmh0nhfhs9k5whhnjwfxyaumvtxm8gy2x5fscw',
    'ecash:pzwdmm83qjx7372wxgszaukan73ffn8ct5mynnvgs4',
    'ecash:pzh3f9me5z5sn2w8euap2gyrp6kr7gf6my6n7k9a86',
    'ecash:prneuckcx69clprn4nnr82tf8sycqrs3acmr2r878r',
    'ecash:pz742xef07g9w8q52mx0q6m9hp05hnzm65sxffnpyq',
    'ecash:pq5dzl0drx8v0layyyuh5aupvxfs80ydms0uu3fn69',
    'ecash:ppxedxtug7kpwd6tgf5vx08gjamel7sldskaxl6qnd',
    'ecash:pr4fs2m8tjmw54r2aqmadggzuagttkujgyd6es3880',
    'ecash:prmed4fxlhkgay9nxw7zn9muew5ktkyjnuj48gcpln',
    'ecash:pqv3cpvmu4h0vqa6aly0urec7kwtuhe49yvjs6enhx',
    'ecash:pr39scfteeu5l573lzerchh6wc4cqkxetud4qx40t0',
    'ecash:pzzjgw37vwls805c9fw6g9vqyupadst6wg446anfg4'
  ]

  const XECADDR_TESTNET_P2PKH_ADDRESSES = [
    'ectest:qph5kuz78czq00e3t85ugpgd7xmer5kr7ct0se3kts',
    'ectest:qpxenfpcf975gxdjmq9pk3xm6hjmfj6re59dsyvv4a',
    'ectest:qzfau6vrq980qntgp5e7l6cpfsf7jw88c5rcwvghru',
    'ectest:qzcguejjfxld867ck4zudc9a6y8mf6ftgql9vf4v63',
    'ectest:qqm2lpqdfjsg8kkhwk0a3e3gypyswkd69uu4wwe9mf',
    'ectest:qrccfa4qm3xfcrta78v7du75jjaww0ylns0jedvnqk',
    'ectest:qqdcsl6c879esyxyacmz7g6vtzwjjwtznsnu7dx4ky',
    'ectest:qpr2ddwe8qnnh8h20mmn4zgrharmy0vuy5mnzgml6v',
    'ectest:qqymsmh0nhfhs9k5whhnjwfxyaumvtxm8g4y9mf7qz',
    'ectest:qzwdmm83qjx7372wxgszaukan73ffn8ct522suvxge',
    'ectest:qzh3f9me5z5sn2w8euap2gyrp6kr7gf6mytaae9nlk',
    'ectest:qrneuckcx69clprn4nnr82tf8sycqrs3ac2dfv8sl0',
    'ectest:qz742xef07g9w8q52mx0q6m9hp05hnzm65pg2xn0uv',
    'ectest:qq5dzl0drx8v0layyyuh5aupvxfs80ydms7jl7fazf',
    'ectest:qpxedxtug7kpwd6tgf5vx08gjamel7slds8n9s6wtp',
    'ectest:qr4fs2m8tjmw54r2aqmadggzuagttkujgyu56l3flr',
    'ectest:qrmed4fxlhkgay9nxw7zn9muew5ktkyjnurmy8c08l',
    'ectest:qqv3cpvmu4h0vqa6aly0urec7kwtuhe49yaun4ea02',
    'ectest:qr39scfteeu5l573lzerchh6wc4cqkxetuumrf4pnr',
    'ectest:qzzjgw37vwls805c9fw6g9vqyupadst6wgymejn8se'
  ]

  const XECADDR_TESTNET_P2SH_ADDRESSES = [
    'ectest:pph5kuz78czq00e3t85ugpgd7xmer5kr7cu2dkk4sd',
    'ectest:ppxenfpcf975gxdjmq9pk3xm6hjmfj6re5jgdtt0wq',
    'ectest:pzfau6vrq980qntgp5e7l6cpfsf7jw88c55anr05cp',
    'ectest:pzcguejjfxld867ck4zudc9a6y8mf6ftgqgq3xj0pv',
    'ectest:pqm2lpqdfjsg8kkhwk0a3e3gypyswkd69utsnp7xq5',
    'ectest:prccfa4qm3xfcrta78v7du75jjaww0ylnschyztsmt',
    'ectest:pqdcsl6c879esyxyacmz7g6vtzwjjwtznsyerzpkde',
    'ectest:ppr2ddwe8qnnh8h20mmn4zgrharmy0vuy5vkl8uup3',
    'ectest:pqymsmh0nhfhs9k5whhnjwfxyaumvtxm8gzpc5waml',
    'ectest:pzwdmm83qjx7372wxgszaukan73ffn8ct5a0dnt9ny',
    'ectest:pzh3f9me5z5sn2w8euap2gyrp6kr7gf6myucqkzsyt',
    'ectest:prneuckcx69clprn4nnr82tf8sycqrs3acag5rqnyj',
    'ectest:pz742xef07g9w8q52mx0q6m9hp05hnzm65kdhf5v83',
    'ectest:pq5dzl0drx8v0layyyuh5aupvxfs80ydmsfhz3w7e5',
    'ectest:ppxedxtug7kpwd6tgf5vx08gjamel7sldsskcladsu',
    'ectest:pr4fs2m8tjmw54r2aqmadggzuagttkujgyt38sk2y7',
    'ectest:prmed4fxlhkgay9nxw7zn9muew5ktkyjnu57eglvuz',
    'ectest:pqv3cpvmu4h0vqa6aly0urec7kwtuhe49y2ew6775h',
    'ectest:pr39scfteeu5l573lzerchh6wc4cqkxetut77xjzg7',
    'ectest:pzzjgw37vwls805c9fw6g9vqyupadst6wgn7ya5yty'
  ]

  const LEGACY_ADDRESSES = flatten([
    LEGACY_MAINNET_P2PKH_ADDRESSES,
    LEGACY_MAINNET_P2SH_ADDRESSES,
    LEGACY_TESTNET_P2PKH_ADDRESSES,
    LEGACY_TESTNET_P2SH_ADDRESSES
  ])

  const BITPAY_MAINNET_ADDRESSES = flatten([
    BITPAY_MAINNET_P2PKH_ADDRESSES,
    BITPAY_MAINNET_P2SH_ADDRESSES
  ])

  const BITPAY_ADDRESSES = flatten([
    BITPAY_MAINNET_ADDRESSES,
    BITPAY_TESTNET_P2PKH_ADDRESSES,
    BITPAY_TESTNET_P2SH_ADDRESSES
  ])

  const CASHADDR_ADDRESSES = flatten([
    CASHADDR_MAINNET_P2PKH_ADDRESSES,
    CASHADDR_MAINNET_P2SH_ADDRESSES,
    CASHADDR_TESTNET_P2PKH_ADDRESSES,
    CASHADDR_TESTNET_P2SH_ADDRESSES
  ])

  const CASHADDR_ADDRESSES_NO_PREFIX = CASHADDR_ADDRESSES.map(function (address) {
    const parts = address.split(':')
    return parts[1]
  })

  const XECADDR_ADDRESSES = flatten([
    XECADDR_MAINNET_P2PKH_ADDRESSES,
    XECADDR_MAINNET_P2SH_ADDRESSES,
    XECADDR_TESTNET_P2PKH_ADDRESSES,
    XECADDR_TESTNET_P2SH_ADDRESSES
  ])

  const XECADDR_ADDRESSES_NO_PREFIX = XECADDR_ADDRESSES.map(function (address) {
    const parts = address.split(':')
    return parts[1]
  })

  const MAINNET_ADDRESSES = flatten([
    LEGACY_MAINNET_P2PKH_ADDRESSES,
    LEGACY_MAINNET_P2SH_ADDRESSES,
    BITPAY_MAINNET_P2PKH_ADDRESSES,
    BITPAY_MAINNET_P2SH_ADDRESSES,
    CASHADDR_MAINNET_P2PKH_ADDRESSES,
    CASHADDR_MAINNET_P2SH_ADDRESSES,
    XECADDR_MAINNET_P2PKH_ADDRESSES,
    XECADDR_MAINNET_P2SH_ADDRESSES
  ])

  const TESTNET_ADDRESSES = flatten([
    LEGACY_TESTNET_P2PKH_ADDRESSES,
    LEGACY_TESTNET_P2SH_ADDRESSES,
    BITPAY_TESTNET_P2PKH_ADDRESSES,
    BITPAY_TESTNET_P2SH_ADDRESSES,
    CASHADDR_TESTNET_P2PKH_ADDRESSES,
    CASHADDR_TESTNET_P2SH_ADDRESSES,
    XECADDR_TESTNET_P2PKH_ADDRESSES,
    XECADDR_TESTNET_P2SH_ADDRESSES
  ])

  const P2PKH_ADDRESSES = flatten([
    LEGACY_MAINNET_P2PKH_ADDRESSES,
    LEGACY_TESTNET_P2PKH_ADDRESSES,
    BITPAY_MAINNET_P2PKH_ADDRESSES,
    BITPAY_TESTNET_P2PKH_ADDRESSES,
    CASHADDR_MAINNET_P2PKH_ADDRESSES,
    CASHADDR_TESTNET_P2PKH_ADDRESSES,
    XECADDR_MAINNET_P2PKH_ADDRESSES,
    XECADDR_TESTNET_P2PKH_ADDRESSES
  ])

  const P2SH_ADDRESSES = flatten([
    LEGACY_MAINNET_P2SH_ADDRESSES,
    LEGACY_TESTNET_P2SH_ADDRESSES,
    BITPAY_MAINNET_P2SH_ADDRESSES,
    BITPAY_TESTNET_P2SH_ADDRESSES,
    CASHADDR_MAINNET_P2SH_ADDRESSES,
    CASHADDR_TESTNET_P2SH_ADDRESSES,
    XECADDR_MAINNET_P2SH_ADDRESSES,
    XECADDR_TESTNET_P2SH_ADDRESSES
  ])

  const BITCOIN_CASH_ADDRESSES = flatten([
    MAINNET_ADDRESSES,
    TESTNET_ADDRESSES
  ])

  function flatten (arrays) {
    return [].concat.apply([], arrays)
  }

  describe('#isValidAddress()', function () {
    it('it should return false for invalid inputs', function () {
      const INVALID_INPUTS = [
        undefined, null,
        {}, [],
        1, '',
        'some invalid address', 'st1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX'
      ]
      INVALID_INPUTS.forEach(function (address) {
        assert.isFalse(xecaddr.isValidAddress(address))
      })
    })
    it('it should return true for any valid Bitcoin Cash address', function () {
      BITCOIN_CASH_ADDRESSES.forEach(function (address) {
        assert.isTrue(xecaddr.isValidAddress(address))
      })
    })
  })

  describe('#detectAddressFormat()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.detectAddressFormat()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.detectAddressFormat('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.detectAddressFormat('st1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('it should detect a legacy address format correctly', function () {
      LEGACY_ADDRESSES.forEach(function (address) {
        assert.strictEqual(xecaddr.detectAddressFormat(address), xecaddr.Format.Legacy)
      })
    })
    it('it should detect a bitpay address format correctly', function () {
      BITPAY_MAINNET_ADDRESSES.forEach(function (address) {
        assert.strictEqual(xecaddr.detectAddressFormat(address), xecaddr.Format.Bitpay)
      })
    })
    it('it should detect a cashaddr address format correctly', function () {
      CASHADDR_ADDRESSES.forEach(function (address) {
        assert.strictEqual(xecaddr.detectAddressFormat(address), xecaddr.Format.Cashaddr)
      })
    })
    it('it should detect an xecaddr address format correctly', function () {
      XECADDR_ADDRESSES.forEach(function (address) {
        assert.strictEqual(xecaddr.detectAddressFormat(address), xecaddr.Format.Xecaddr)
      })
    })
  })

  describe('#detectAddressNetwork()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.detectAddressNetwork()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.detectAddressNetwork('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.detectAddressNetwork('t1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('it should detect a mainnet address\' network correctly', function () {
      MAINNET_ADDRESSES.forEach(function (address) {
        assert.strictEqual(xecaddr.detectAddressNetwork(address), xecaddr.Network.Mainnet)
      })
    })
    it('it should detect a testnet address\' network correctly', function () {
      TESTNET_ADDRESSES.forEach(function (address) {
        assert.strictEqual(xecaddr.detectAddressNetwork(address), xecaddr.Network.Testnet)
      })
    })
  })

  describe('#detectAddressType()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.detectAddressType()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.detectAddressType('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.detectAddressType('somt1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should detect a P2PKH address\' type correctly', function () {
      P2PKH_ADDRESSES.forEach(function (address) {
        assert.strictEqual(xecaddr.detectAddressType(address), xecaddr.Type.P2PKH)
      })
    })
    it('should detect a P2SH address\' type correctly', function () {
      P2SH_ADDRESSES.forEach(function (address) {
        assert.strictEqual(xecaddr.detectAddressType(address), xecaddr.Type.P2SH)
      })
    })
  })

  describe('#toLegacyAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.toLegacyAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.toLegacyAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.toLegacyAddress('some t1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should translate legacy address format to itself correctly', function () {
      assert.deepEqual(
        LEGACY_ADDRESSES.map(xecaddr.toLegacyAddress),
        LEGACY_ADDRESSES
      )
    })
    it('should translate bitpay address format to legacy format correctly', function () {
      assert.deepEqual(
        BITPAY_ADDRESSES.map(xecaddr.toLegacyAddress),
        LEGACY_ADDRESSES
      )
    })
    it('should translate cashaddr address format to legacy format correctly', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES.map(xecaddr.toLegacyAddress),
        LEGACY_ADDRESSES
      )
    })
    it('should translate xecaddr address format to legacy format correctly', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES.map(xecaddr.toLegacyAddress),
        LEGACY_ADDRESSES
      )
    })
  })

  describe('#toBitpayAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.toBitpayAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.toBitpayAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.toBitpayAddress('some t1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should translate legacy address format to bitpay format correctly', function () {
      assert.deepEqual(
        LEGACY_ADDRESSES.map(xecaddr.toBitpayAddress),
        BITPAY_ADDRESSES
      )
    })
    it('should translate bitpay address format to itself correctly', function () {
      assert.deepEqual(
        BITPAY_ADDRESSES.map(xecaddr.toBitpayAddress),
        BITPAY_ADDRESSES
      )
    })
    it('should translate cashaddr address format to bitpay format correctly', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES.map(xecaddr.toBitpayAddress),
        BITPAY_ADDRESSES
      )
    })
  })

  describe('#toCashAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.toCashAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.toCashAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.toCashAddress('some int1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should translate legacy address format to cashaddr format correctly', function () {
      assert.deepEqual(
        LEGACY_ADDRESSES.map(xecaddr.toCashAddress),
        CASHADDR_ADDRESSES
      )
    })
    it('should translate bitpay address format to cashaddr format correctly', function () {
      assert.deepEqual(
        BITPAY_ADDRESSES.map(xecaddr.toCashAddress),
        CASHADDR_ADDRESSES
      )
    })
    it('should translate xecaddr address format to cashaddr correctly', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES.map(xecaddr.toCashAddress),
        CASHADDR_ADDRESSES
      )
    })
    it('should translate no-prefix xecaddr address to cashaddr', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.toCashAddress),
        CASHADDR_ADDRESSES
      )
    })
    it('should translate cashaddr address format to itself correctly', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES.map(xecaddr.toCashAddress),
        CASHADDR_ADDRESSES
      )
    })
    it('should translate no-prefix cashaddr address format to itself correctly', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.toCashAddress),
        CASHADDR_ADDRESSES
      )
    })
  })

  describe('#toXecAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.toXecAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.toXecAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.toXecAddress('some int1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should translate legacy address format to xecaddr format correctly', function () {
      assert.deepEqual(
        LEGACY_ADDRESSES.map(xecaddr.toXecAddress),
        XECADDR_ADDRESSES
      )
    })
    it('should translate bitpay address format to xecaddr format correctly', function () {
      assert.deepEqual(
        BITPAY_ADDRESSES.map(xecaddr.toXecAddress),
        XECADDR_ADDRESSES
      )
    })
    it('should translate cashaddr address format to xecaddr correctly', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES.map(xecaddr.toXecAddress),
        XECADDR_ADDRESSES
      )
    })
    it('should translate no-prefix cashaddr address format to xecaddr', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.toXecAddress),
        XECADDR_ADDRESSES
      )
    })
    it('should translate xecaddr address format to itself correctly', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES.map(xecaddr.toXecAddress),
        XECADDR_ADDRESSES
      )
    })
    it('should translate no-prefix xecaddr address format to itself correctly', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.toXecAddress),
        XECADDR_ADDRESSES
      )
    })
  })

  describe('#isLegacyAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.isLegacyAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isLegacyAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isLegacyAddress('some t1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should return true for a legacy address', function () {
      LEGACY_ADDRESSES.forEach(function (address) {
        assert.isTrue(xecaddr.isLegacyAddress(address))
      })
    })
    it('should return false for a bitpay address', function () {
      BITPAY_MAINNET_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isLegacyAddress(address))
      })
    })
    it('should return false for a cashaddr address', function () {
      CASHADDR_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isLegacyAddress(address))
      })
    })
    it('should return false for an xecaddr address', function () {
      XECADDR_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isLegacyAddress(address))
      })
    })
  })

  describe('#isBitpayAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.isBitpayAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isBitpayAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isBitpayAddress('some t1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should return false for a legacy address', function () {
      LEGACY_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isBitpayAddress(address))
      })
    })
    it('should return true for a bitpay address', function () {
      BITPAY_MAINNET_ADDRESSES.forEach(function (address) {
        assert.isTrue(xecaddr.isBitpayAddress(address))
      })
    })
    it('should return false for a cashaddr address', function () {
      CASHADDR_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isBitpayAddress(address))
      })
    })
    it('should return false for an xecaddr address', function () {
      XECADDR_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isBitpayAddress(address))
      })
    })
  })

  describe('#isCashAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.isCashAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isCashAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isCashAddress('some int1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should return false for a legacy address', function () {
      LEGACY_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isCashAddress(address))
      })
    })
    it('should return false for a bitpay address', function () {
      BITPAY_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isCashAddress(address))
      })
    })
    it('should return false for an xecaddr address', function () {
      XECADDR_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isCashAddress(address))
      })
    })
    it('should return true for a cashaddr address', function () {
      CASHADDR_ADDRESSES.forEach(function (address) {
        assert.isTrue(xecaddr.isCashAddress(address))
      })
    })
  })

  describe('#isXecAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.isXecAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isXecAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isXecAddress('some int1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should return false for a legacy address', function () {
      LEGACY_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isXecAddress(address))
      })
    })
    it('should return false for a bitpay address', function () {
      BITPAY_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isXecAddress(address))
      })
    })
    it('should return false for a cashaddr address', function () {
      CASHADDR_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isXecAddress(address))
      })
    })
    it('should return true for an xecaddr address', function () {
      XECADDR_ADDRESSES.forEach(function (address) {
        assert.isTrue(xecaddr.isXecAddress(address))
      })
    })
  })

  describe('#isMainnetAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.isMainnetAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isMainnetAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isMainnetAddress('somet1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should return true for a mainnet address', function () {
      MAINNET_ADDRESSES.forEach(function (address) {
        assert.isTrue(xecaddr.isMainnetAddress(address))
      })
    })
    it('should return false for a testnet address', function () {
      TESTNET_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isMainnetAddress(address))
      })
    })
  })

  describe('#isTestnetAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.isTestnetAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isTestnetAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isTestnetAddress('somet1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should return false for a mainnet address', function () {
      MAINNET_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isTestnetAddress(address))
      })
    })
    it('should return true for a testnet address', function () {
      TESTNET_ADDRESSES.forEach(function (address) {
        assert.isTrue(xecaddr.isTestnetAddress(address))
      })
    })
  })

  describe('#isP2PKHAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.isP2PKHAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isP2PKHAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isP2PKHAddress('some it1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should return true for a P2PKH address', function () {
      P2PKH_ADDRESSES.forEach(function (address) {
        assert.isTrue(xecaddr.isP2PKHAddress(address))
      })
    })
    it('should return false for a P2SH address', function () {
      P2SH_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isP2PKHAddress(address))
      })
    })
  })

  describe('#isP2SHAddress()', function () {
    it('should fail when called with an invalid address', function () {
      assert.throws(function () {
        xecaddr.isP2SHAddress()
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isP2SHAddress('some invalid address')
      }, xecaddr.InvalidAddressError)
      assert.throws(function () {
        xecaddr.isP2SHAddress('some int1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX')
      }, xecaddr.InvalidAddressError)
    })
    it('should return false for a P2PKH address', function () {
      P2PKH_ADDRESSES.forEach(function (address) {
        assert.isFalse(xecaddr.isP2SHAddress(address))
      })
    })
    it('should return true for a P2SH address', function () {
      P2SH_ADDRESSES.forEach(function (address) {
        assert.isTrue(xecaddr.isP2SHAddress(address))
      })
    })
  })

  describe('cashaddr prefix detection', function () {
    it('should return the same result for detectAddressFormat', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.detectAddressFormat),
        CASHADDR_ADDRESSES.map(xecaddr.detectAddressFormat)
      )
    })
    it('should return the same result for detectAddressNetwork', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.detectAddressNetwork),
        CASHADDR_ADDRESSES.map(xecaddr.detectAddressNetwork)
      )
    })
    it('should return the same result for detectAddressType', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.detectAddressType),
        CASHADDR_ADDRESSES.map(xecaddr.detectAddressType)
      )
    })
    it('should return the same result for toLegacyAddress', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.toLegacyAddress),
        CASHADDR_ADDRESSES.map(xecaddr.toLegacyAddress)
      )
    })
    it('should return the same result for toBitpayAddress', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.toBitpayAddress),
        CASHADDR_ADDRESSES.map(xecaddr.toBitpayAddress)
      )
    })
    it('should return the same result for isLegacyAddress', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isLegacyAddress),
        CASHADDR_ADDRESSES.map(xecaddr.isLegacyAddress)
      )
    })
    it('should return the same result for isBitpayAddress', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isBitpayAddress),
        CASHADDR_ADDRESSES.map(xecaddr.isBitpayAddress)
      )
    })
    it('should return the same result for isCashAddress', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isCashAddress),
        CASHADDR_ADDRESSES.map(xecaddr.isCashAddress)
      )
    })
    it('should return the same result for isMainnetAddress', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isMainnetAddress),
        CASHADDR_ADDRESSES.map(xecaddr.isMainnetAddress)
      )
    })
    it('should return the same result for isTestnetAddress', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isTestnetAddress),
        CASHADDR_ADDRESSES.map(xecaddr.isTestnetAddress)
      )
    })
    it('should return the same result for isP2PKHAddress', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isP2PKHAddress),
        CASHADDR_ADDRESSES.map(xecaddr.isP2PKHAddress)
      )
    })
    it('should return the same result for isP2SHAddress', function () {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isP2SHAddress),
        CASHADDR_ADDRESSES.map(xecaddr.isP2SHAddress)
      )
    })
  })

  describe('xecaddr prefix detection', function () {
    it('should return the same result for detectAddressFormat', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.detectAddressFormat),
        XECADDR_ADDRESSES.map(xecaddr.detectAddressFormat)
      )
    })
    it('should return the same result for detectAddressNetwork', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.detectAddressNetwork),
        XECADDR_ADDRESSES.map(xecaddr.detectAddressNetwork)
      )
    })
    it('should return the same result for detectAddressType', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.detectAddressType),
        XECADDR_ADDRESSES.map(xecaddr.detectAddressType)
      )
    })
    it('should return the same result for toLegacyAddress', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.toLegacyAddress),
        XECADDR_ADDRESSES.map(xecaddr.toLegacyAddress)
      )
    })
    it('should return the same result for toBitpayAddress', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.toBitpayAddress),
        XECADDR_ADDRESSES.map(xecaddr.toBitpayAddress)
      )
    })
    it('should return the same result for isLegacyAddress', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isLegacyAddress),
        XECADDR_ADDRESSES.map(xecaddr.isLegacyAddress)
      )
    })
    it('should return the same result for isBitpayAddress', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isBitpayAddress),
        XECADDR_ADDRESSES.map(xecaddr.isBitpayAddress)
      )
    })
    it('should return the same result for isCashAddress', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isCashAddress),
        XECADDR_ADDRESSES.map(xecaddr.isCashAddress)
      )
    })
    it('should return the same result for isMainnetAddress', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isMainnetAddress),
        XECADDR_ADDRESSES.map(xecaddr.isMainnetAddress)
      )
    })
    it('should return the same result for isTestnetAddress', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isTestnetAddress),
        XECADDR_ADDRESSES.map(xecaddr.isTestnetAddress)
      )
    })
    it('should return the same result for isP2PKHAddress', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isP2PKHAddress),
        XECADDR_ADDRESSES.map(xecaddr.isP2PKHAddress)
      )
    })
    it('should return the same result for isP2SHAddress', function () {
      assert.deepEqual(
        XECADDR_ADDRESSES_NO_PREFIX.map(xecaddr.isP2SHAddress),
        XECADDR_ADDRESSES.map(xecaddr.isP2SHAddress)
      )
    })
  })
})
